"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  MapPin,
  Calendar,
  FileText,
  CheckCircle2,
  ImageIcon,
  Tag,
  Clock,
  Send,
} from "lucide-react";
import { CAMPUS_LOCATIONS, getFloorsForBlock } from "@/lib/constants";

const CATEGORIES = [
  "Electronics",
  "Accessories",
  "Documents",
  "Clothing",
  "Books",
  "Keys",
  "Bags",
  "Sports Equipment",
  "Other",
];

const stepConfig = [
  { label: "Item Details", icon: FileText },
  { label: "Location", icon: MapPin },
  { label: "Date & Time", icon: Calendar },
  { label: "Photo", icon: ImageIcon },
  { label: "Review", icon: CheckCircle2 },
];

export default function ReportPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    description: "",
    block: "",
    area: "",
    floor: "",
    date: "",
    time: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    image: null,
    imagePreview: null,
  });

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      update("image", file);
      const reader = new FileReader();
      reader.onload = (ev) => update("imagePreview", ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    update("image", null);
    update("imagePreview", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return form.itemName.trim() && form.category;
      case 1: {
        // Check if the selected block has sub-areas
        const hasAreas = CAMPUS_LOCATIONS[form.block]?.length > 0;
        return hasAreas ? form.block && form.area : form.block;
      }
      case 2:
        return form.date;
      case 3:
        return true; // photo is optional
      case 4:
        return form.contactName.trim();
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);

    // Get existing items from localStorage
    const existing = JSON.parse(localStorage.getItem("findit_items") || "[]");

    const newItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      type: "lost",
      itemName: form.itemName,
      category: form.category,
      description: form.description,
      location: {
        block: form.block,
        area: form.area,
        floor: form.floor,
      },
      date: form.date,
      time: form.time || "Unknown",
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      image: form.imagePreview,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    existing.push(newItem);
    localStorage.setItem("findit_items", JSON.stringify(existing));

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <>
        <Navbar activePage="report" />
        <main className="min-h-screen bg-[var(--color-background)] pt-[68px] flex items-center justify-center px-6">
          <div className="text-center animate-fade-up max-w-md">
            <div className="w-20 h-20 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-[#10B981]" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-foreground)] mb-3">
              Report Submitted!
            </h1>
            <p className="text-[var(--color-foreground-muted)] mb-8">
              Your lost item report has been submitted successfully. Check the
              browse page to see if anyone has found it.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push("/browse")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white shadow-[0_4px_20px_rgba(110,104,102,0.3)] hover:shadow-[0_6px_28px_rgba(190,184,182,0.4)] transition-all"
              >
                Browse Items
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setForm({
                    itemName: "",
                    category: "",
                    description: "",
                    block: "",
                    area: "",
                    floor: "",
                    date: "",
                    time: "",
                    contactName: "",
                    contactEmail: "",
                    contactPhone: "",
                    image: null,
                    imagePreview: null,
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Report Another
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activePage="report" />
      <main className="min-h-screen bg-[var(--color-background)] pt-[68px]">
        <div className="max-w-[720px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10 animate-fade-up">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold grad-text-warm mb-2">
              Report Lost Item
            </h1>
            <p className="text-[var(--color-foreground-muted)]">
              Fill out the details below and we&apos;ll help you find it.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {stepConfig.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <button
                  key={i}
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[0.78rem] font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(190,184,182,0.12)] text-[var(--color-foreground)] border border-[var(--color-border-hover)]"
                      : isDone
                      ? "text-[var(--color-ash)] cursor-pointer hover:bg-[rgba(255,255,255,0.05)]"
                      : "text-[var(--color-foreground-dim)] cursor-default"
                  }`}
                  disabled={i > step}
                >
                  <StepIcon size={14} />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Form Card */}
          <div className="glass-card p-8 animate-fade-up">
            {/* Step 0: Item Details */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    <Tag size={14} className="inline mr-1.5" />
                    Item Name *
                  </label>
                  <input
                    type="text"
                    value={form.itemName}
                    onChange={(e) => update("itemName", e.target.value)}
                    placeholder="e.g., Blue iPhone 15 Pro"
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    Category *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => update("category", cat)}
                        className={`px-3 py-2.5 rounded-xl text-[0.8rem] font-medium border transition-all ${
                          form.category === cat
                            ? "bg-[rgba(190,184,182,0.15)] border-[var(--color-ash)] text-[var(--color-foreground)]"
                            : "border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.03)]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Describe the item — color, brand, distinguishing features..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Location */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    <MapPin size={14} className="inline mr-1.5" />
                    Block / Building *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(CAMPUS_LOCATIONS).map((block) => (
                      <button
                        key={block}
                        onClick={() => {
                          update("block", block);
                          update("area", "");
                        }}
                        className={`px-3 py-2.5 rounded-xl text-[0.8rem] font-medium border transition-all ${
                          form.block === block
                            ? "bg-[rgba(190,184,182,0.15)] border-[var(--color-ash)] text-[var(--color-foreground)]"
                            : "border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.03)]"
                        }`}
                      >
                        {block}
                      </button>
                    ))}
                  </div>
                </div>

                {form.block && CAMPUS_LOCATIONS[form.block]?.length > 0 && (
                  <div className="animate-fade-up">
                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                      Specific Area *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {CAMPUS_LOCATIONS[form.block]?.map((area) => (
                        <button
                          key={area}
                          onClick={() => update("area", area)}
                          className={`px-3 py-2.5 rounded-xl text-[0.8rem] font-medium border text-left transition-all ${
                            form.area === area
                              ? "bg-[rgba(190,184,182,0.15)] border-[var(--color-ash)] text-[var(--color-foreground)]"
                              : "border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.03)]"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {getFloorsForBlock(form.block).length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                      Floor (Optional)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {getFloorsForBlock(form.block).map((f) => (
                        <button
                          key={f}
                          onClick={() => update("floor", form.floor === f ? "" : f)}
                          className={`px-3 py-2.5 rounded-xl text-[0.8rem] font-medium border transition-all ${
                            form.floor === f
                              ? "bg-[rgba(190,184,182,0.15)] border-[var(--color-ash)] text-[var(--color-foreground)]"
                              : "border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.03)]"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    <Calendar size={14} className="inline mr-1.5" />
                    Date Lost *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    <Clock size={14} className="inline mr-1.5" />
                    Approximate Time (Optional)
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Photo */}
            {step === 3 && (
              <div className="space-y-6">
                <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                  <ImageIcon size={14} className="inline mr-1.5" />
                  Upload Photo (Optional)
                </label>

                {form.imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-[var(--color-border)]">
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="w-full max-h-[300px] object-contain bg-[rgba(0,0,0,0.3)]"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center text-white hover:bg-[rgba(239,68,68,0.8)] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-16 rounded-xl border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-3 text-[var(--color-foreground-dim)] hover:border-[var(--color-ash)] hover:text-[var(--color-foreground-muted)] transition-all"
                  >
                    <Upload size={32} strokeWidth={1.5} />
                    <span className="text-sm font-medium">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs">JPG, PNG up to 5MB</span>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}

            {/* Step 4: Review & Contact */}
            {step === 4 && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border)] p-5 space-y-3">
                  <h3 className="font-semibold text-[var(--color-foreground)] text-sm">
                    Report Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[var(--color-foreground-dim)]">Item</span>
                      <p className="text-[var(--color-foreground)]">{form.itemName}</p>
                    </div>
                    <div>
                      <span className="text-[var(--color-foreground-dim)]">Category</span>
                      <p className="text-[var(--color-foreground)]">{form.category}</p>
                    </div>
                    <div>
                      <span className="text-[var(--color-foreground-dim)]">Location</span>
                      <p className="text-[var(--color-foreground)]">
                        {form.block} — {form.area}
                        {form.floor ? `, ${form.floor}` : ""}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--color-foreground-dim)]">Date</span>
                      <p className="text-[var(--color-foreground)]">
                        {form.date} {form.time && `at ${form.time}`}
                      </p>
                    </div>
                  </div>
                  {form.description && (
                    <div className="text-sm">
                      <span className="text-[var(--color-foreground-dim)]">Description</span>
                      <p className="text-[var(--color-foreground)]">{form.description}</p>
                    </div>
                  )}
                  {form.imagePreview && (
                    <img
                      src={form.imagePreview}
                      alt="Item"
                      className="w-20 h-20 rounded-lg object-cover border border-[var(--color-border)]"
                    />
                  )}
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="you@ddn.upes.ac.in"
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  step === 0
                    ? "text-[var(--color-foreground-dim)] cursor-not-allowed opacity-40"
                    : "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)]"
                }`}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    canProceed()
                      ? "bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white shadow-[0_4px_16px_rgba(110,104,102,0.3)] hover:shadow-[0_6px_24px_rgba(190,184,182,0.4)]"
                      : "bg-[rgba(255,255,255,0.05)] text-[var(--color-foreground-dim)] cursor-not-allowed"
                  }`}
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || submitting}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    canProceed() && !submitting
                      ? "bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white shadow-[0_4px_16px_rgba(110,104,102,0.3)] hover:shadow-[0_6px_24px_rgba(190,184,182,0.4)]"
                      : "bg-[rgba(255,255,255,0.05)] text-[var(--color-foreground-dim)] cursor-not-allowed"
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Report
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
