"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  MapPin,
  Calendar,
  Tag,
  Filter,
  X,
  Clock,
  ChevronDown,
  LayoutGrid,
  List,
  Eye,
  ImageOff,
  Package,
  Check,
  AlertCircle,
} from "lucide-react";
import { formatLocation, timeAgo } from "@/lib/utils";

const DEMO_ITEMS = [
  {
    id: "demo_1",
    type: "lost",
    itemName: "Blue iPhone 15 Pro",
    category: "Electronics",
    description: "Space Blue iPhone 15 Pro with a clear case. Lock screen has a mountain wallpaper. Last seen in the library study area near the window seats.",
    location: { block: "Block B", area: "Library", floor: "2nd Floor" },
    date: "2026-04-20",
    time: "14:30",
    contactName: "Arjun Sharma",
    contactEmail: "arjun.sharma@ddn.upes.ac.in",
    image: "/items/iphone.png",
    createdAt: "2026-04-20T09:00:00.000Z",
    status: "active",
  },
  {
    id: "demo_2",
    type: "lost",
    itemName: "Black Leather Wallet",
    category: "Accessories",
    description: "Tommy Hilfiger black leather bifold wallet. Contains UPES ID card and a few credit cards. Possibly dropped near the canteen during lunch.",
    location: { block: "Block A", area: "Canteen", floor: "Ground Floor" },
    date: "2026-04-21",
    time: "12:00",
    contactName: "Priya Mehta",
    contactEmail: "priya.mehta@ddn.upes.ac.in",
    image: "/items/wallet.png",
    createdAt: "2026-04-21T06:30:00.000Z",
    status: "active",
  },
  {
    id: "demo_3",
    type: "lost",
    itemName: "Silver MacBook Charger",
    category: "Electronics",
    description: "67W USB-C MagSafe charger for MacBook Pro. Left plugged in at the computer lab desk near the window. White cable with silver connector.",
    location: { block: "Block A", area: "Computer Lab", floor: "1st Floor" },
    date: "2026-04-22",
    time: "16:45",
    contactName: "Rahul Verma",
    contactEmail: "rahul.verma@ddn.upes.ac.in",
    image: "/items/charger.png",
    createdAt: "2026-04-22T11:15:00.000Z",
    status: "active",
  },
  {
    id: "demo_4",
    type: "lost",
    itemName: "Red Sports Water Bottle",
    category: "Other",
    description: "Milton 750ml red stainless steel water bottle with my name sticker on it. Left it at the sports ground after evening cricket practice session.",
    location: { block: "Sports Complex", area: "Sports Ground", floor: "" },
    date: "2026-04-19",
    time: "17:30",
    contactName: "Ananya Gupta",
    contactEmail: "",
    image: "/items/waterbottle.png",
    createdAt: "2026-04-19T12:00:00.000Z",
    status: "active",
  },
  {
    id: "demo_5",
    type: "lost",
    itemName: "Hostel Room Key (Room 214)",
    category: "Keys",
    description: "Single brass key with a blue rubber key cap and a small UPES hostel tag attached. Lost somewhere between hostel and Block C during morning classes.",
    location: { block: "Hostel Area", area: "Hostel Block 2", floor: "" },
    date: "2026-04-23",
    time: "08:00",
    contactName: "Kavya Singh",
    contactEmail: "kavya.singh@ddn.upes.ac.in",
    image: "/items/keys.png",
    createdAt: "2026-04-23T02:30:00.000Z",
    status: "active",
  },
  {
    id: "demo_6",
    type: "lost",
    itemName: "Noise ColorFit Pro 4 Smartwatch",
    category: "Electronics",
    description: "Black Noise ColorFit Pro 4 smartwatch with a silicone strap. Last seen in the seminar hall during the morning guest lecture session.",
    location: { block: "Block D", area: "Seminar Hall", floor: "Ground Floor" },
    date: "2026-04-22",
    time: "10:15",
    contactName: "Vikram Rao",
    contactEmail: "",
    image: "/items/smartwatch.png",
    createdAt: "2026-04-22T04:45:00.000Z",
    status: "active",
  },
  {
    id: "demo_7",
    type: "lost",
    itemName: "Engineering Mathematics Textbook",
    category: "Books",
    description: "B.S. Grewal Engineering Mathematics textbook, 44th edition. Has my name written on the first page in blue ink. Possibly left in classroom C-204.",
    location: { block: "Block C", area: "Classroom C-204", floor: "2nd Floor" },
    date: "2026-04-21",
    time: "11:30",
    contactName: "Neha Patel",
    contactEmail: "neha.patel@ddn.upes.ac.in",
    image: "/items/textbook.png",
    createdAt: "2026-04-21T06:00:00.000Z",
    status: "active",
  },
  {
    id: "demo_8",
    type: "lost",
    itemName: "Prescription Glasses",
    category: "Accessories",
    description: "Black half-rim prescription glasses in a brown Ray-Ban case. Power: -2.5 in both eyes. Very important, please help if found!",
    location: { block: "Main Campus", area: "Garden", floor: "" },
    date: "2026-04-23",
    time: "13:00",
    contactName: "Aditya Kumar",
    contactEmail: "aditya.kumar@ddn.upes.ac.in",
    image: "/items/glasses.png",
    createdAt: "2026-04-23T07:30:00.000Z",
    status: "active",
  },
  {
    id: "demo_9",
    type: "lost",
    itemName: "Apple AirPods Pro (2nd Gen)",
    category: "Electronics",
    description: "White AirPods Pro 2nd generation with the MagSafe charging case. Has my initials 'RS' engraved on the case. Left at the cafeteria table near the billing counter.",
    location: { block: "Block A", area: "Canteen", floor: "Ground Floor" },
    date: "2026-04-22",
    time: "13:15",
    contactName: "Rohan Saxena",
    contactEmail: "rohan.saxena@ddn.upes.ac.in",
    image: "/items/earbuds.png",
    createdAt: "2026-04-22T07:45:00.000Z",
    status: "active",
  },
  {
    id: "demo_10",
    type: "lost",
    itemName: "Navy Blue Umbrella",
    category: "Other",
    description: "Navy blue compact folding umbrella, automatic open/close mechanism. Left near the entrance of Block B after the afternoon rain shower.",
    location: { block: "Block B", area: "Main Entrance", floor: "Ground Floor" },
    date: "2026-04-21",
    time: "15:40",
    contactName: "Simran Kaur",
    contactEmail: "",
    image: "/items/umbrella.png",
    createdAt: "2026-04-21T10:10:00.000Z",
    status: "active",
  },
  {
    id: "demo_11",
    type: "lost",
    itemName: "Casio Scientific Calculator",
    category: "Electronics",
    description: "Casio FX-991EX ClassWiz scientific calculator. Has a small scratch on the top-right corner. Left in the exam hall after the Maths mid-term exam.",
    location: { block: "Block C", area: "Exam Hall", floor: "1st Floor" },
    date: "2026-04-20",
    time: "12:30",
    contactName: "Deepak Nair",
    contactEmail: "deepak.nair@ddn.upes.ac.in",
    image: "/items/calculator.png",
    createdAt: "2026-04-20T07:00:00.000Z",
    status: "active",
  },
  {
    id: "demo_12",
    type: "lost",
    itemName: "Gray College Hoodie (M)",
    category: "Clothing",
    description: "Gray pullover hoodie, size Medium, no brand logo. Left draped over a chair in the auditorium during the cultural event rehearsal. Has a small coffee stain on the left sleeve.",
    location: { block: "Block D", area: "Auditorium", floor: "Ground Floor" },
    date: "2026-04-19",
    time: "18:00",
    contactName: "Ishaan Malhotra",
    contactEmail: "ishaan.malhotra@ddn.upes.ac.in",
    image: "/items/hoodie.png",
    createdAt: "2026-04-19T12:30:00.000Z",
    status: "active",
  },
];

const CATEGORIES = [
  "All",
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

export default function BrowsePage() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);
  const [claimRequests, setClaimRequests] = useState([]);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    description: "",
  });
  const [reasonDropdownOpen, setReasonDropdownOpen] = useState(false);

  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("findit_items") || "[]");
    // Only seed if no user-submitted items exist
    const hasUserItems = stored.some((item) => !item.id.startsWith("demo_"));
    if (stored.length === 0 || !hasUserItems) {
      // Merge demo items with any user items
      const userItems = stored.filter((item) => !item.id.startsWith("demo_"));
      stored = [...DEMO_ITEMS, ...userItems];
      localStorage.setItem("findit_items", JSON.stringify(stored));
    }
    setItems(stored);
    
    // Load claim requests from localStorage
    const claims = JSON.parse(localStorage.getItem("findit_claim_requests") || "[]");
    setClaimRequests(claims);
  }, []);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = () => setSortOpen(false);
    if (sortOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [sortOpen]);

  // Get claim request for current item
  const getCurrentClaimRequest = () => {
    return claimRequests.find((claim) => claim.itemId === selectedItem?.id);
  };

  // Handle opening claim form
  const handleOpenClaimForm = () => {
    setShowClaimForm(true);
  };

  // Handle claim form submission
  const handleSubmitClaim = (e) => {
    e.preventDefault();
    
    if (!claimFormData.name || !claimFormData.email || !claimFormData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const newClaim = {
      id: `claim_${Date.now()}`,
      itemId: selectedItem.id,
      claimerName: claimFormData.name,
      claimerEmail: claimFormData.email,
      claimerPhone: claimFormData.phone,
      reason: claimFormData.reason,
      description: claimFormData.description,
      status: "pending", // pending, verified, rejected
      createdAt: new Date().toISOString(),
    };

    const updatedClaims = [...claimRequests, newClaim];
    setClaimRequests(updatedClaims);
    localStorage.setItem("findit_claim_requests", JSON.stringify(updatedClaims));

    // Reset form
    setClaimFormData({
      name: "",
      email: "",
      phone: "",
      reason: "",
      description: "",
    });
    setShowClaimForm(false);
  };

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.itemName.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.location?.block?.toLowerCase().includes(q) ||
          item.location?.area?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name") return a.itemName.localeCompare(b.itemName);
      return 0;
    });

    return result;
  }, [items, searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <Navbar activePage="browse" />
      <main className="min-h-screen bg-[var(--color-background)] pt-[68px]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold grad-text-warm mb-2">
              Browse Lost Items
            </h1>
            <p className="text-[var(--color-foreground-muted)]">
              {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}{" "}
              reported on campus
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-up relative z-10">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-foreground-dim)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, location..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                >
                  <X size={14} className="text-[var(--color-foreground-dim)]" />
                </button>
              )}
            </div>

            <div className="relative z-20">
              <button
                onClick={(e) => { e.stopPropagation(); setSortOpen(!sortOpen); }}
                className="flex items-center gap-2 px-4 py-3 pr-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm transition-colors cursor-pointer hover:border-[var(--color-border-hover)]"
              >
                {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : "Name A-Z"}
                <ChevronDown
                  size={14}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-foreground-dim)] transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div
                  className="absolute top-full mt-2 right-0 w-[180px] rounded-xl border border-[rgba(110,104,102,0.25)] z-[100] py-1.5 overflow-hidden"
                  style={{
                    backgroundColor: '#141415',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(110,104,102,0.15)',
                    isolation: 'isolate',
                  }}
                >
                  {[
                    { value: "newest", label: "Newest First" },
                    { value: "oldest", label: "Oldest First" },
                    { value: "name", label: "Name A-Z" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={(e) => { e.stopPropagation(); setSortBy(option.value); setSortOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                      style={{
                        backgroundColor: sortBy === option.value ? 'rgba(190,184,182,0.15)' : '#141415',
                        color: sortBy === option.value ? 'var(--color-foreground)' : 'var(--color-foreground-muted)',
                        fontWeight: sortBy === option.value ? 500 : 400,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = sortBy === option.value ? 'rgba(190,184,182,0.15)' : '#1e1e20'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = sortBy === option.value ? 'rgba(190,184,182,0.15)' : '#141415'; }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex rounded-xl border border-[var(--color-border)] overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[rgba(190,184,182,0.12)] text-[var(--color-foreground)]"
                    : "text-[var(--color-foreground-dim)] hover:bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${
                  viewMode === "list"
                    ? "bg-[rgba(190,184,182,0.12)] text-[var(--color-foreground)]"
                    : "text-[var(--color-foreground-dim)] hover:bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 animate-fade-up">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.8rem] font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? "bg-[rgba(190,184,182,0.15)] border-[var(--color-ash)] text-[var(--color-foreground)]"
                    : "border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                {cat === "All" ? <Filter size={12} /> : <Tag size={12} />}
                {cat}
              </button>
            ))}
          </div>

          {/* Items */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 animate-fade-up">
              <Package size={48} className="text-[var(--color-foreground-dim)] mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-lg font-semibold text-[var(--color-foreground-muted)] mb-2">No items found</h3>
              <p className="text-sm text-[var(--color-foreground-dim)]">Try a different search or filter</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group rounded-2xl bg-[var(--color-background-card)] border border-[var(--color-border)] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(190,184,182,0.08)] animate-fade-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Image */}
                  <div className="h-44 bg-[rgba(255,255,255,0.02)] flex items-center justify-center relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.itemName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[var(--color-foreground-dim)]">
                        <ImageOff size={28} strokeWidth={1} />
                        <span className="text-xs">No photo</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold bg-[rgba(10,10,11,0.85)] backdrop-blur-md text-[var(--color-foreground-muted)] border border-[var(--color-border)]">
                      {item.category}
                    </span>
                    {(() => {
                      const claim = claimRequests.find((c) => c.itemId === item.id && c.status === "verified");
                      return claim ? (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold bg-[rgba(34,197,94,0.15)] backdrop-blur-md text-[#22c55e] border border-[rgba(34,197,94,0.3)] flex items-center gap-1">
                          <Check size={12} />
                          CLAIMED
                        </span>
                      ) : null;
                    })()}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--color-foreground)] mb-1.5 truncate">
                      {item.itemName}
                    </h3>
                    <p className="text-[0.8rem] text-[var(--color-foreground-muted)] line-clamp-2 mb-3 leading-relaxed">
                      {item.description || "No description provided."}
                    </p>
                    <div className="flex items-center gap-3 text-[0.75rem] text-[var(--color-foreground-dim)]">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {item.location?.block}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center gap-5 p-5 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)] cursor-pointer transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.03)] animate-fade-up"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border)] flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                    {item.image ? (
                      <img src={item.image} alt={item.itemName} className="w-full h-full object-cover" />
                    ) : (
                      <ImageOff size={20} className="text-[var(--color-foreground-dim)]" strokeWidth={1} />
                    )}
                    {(() => {
                      const claim = claimRequests.find((c) => c.itemId === item.id && c.status === "verified");
                      return claim ? (
                        <div className="absolute inset-0 bg-[rgba(34,197,94,0.2)] flex items-center justify-center">
                          <Check size={16} className="text-[#22c55e]" strokeWidth={3} />
                        </div>
                      ) : null;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-foreground)] truncate">{item.itemName}</h3>
                    <p className="text-[0.8rem] text-[var(--color-foreground-muted)] truncate mt-0.5">{item.description || "No description"}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[0.78rem] text-[var(--color-foreground-dim)] flex-shrink-0">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)]">
                      <Tag size={12} />{item.category}
                    </span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{item.location?.block}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{timeAgo(item.createdAt)}</span>
                  </div>
                  <Eye size={16} className="text-[var(--color-foreground-dim)] flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center px-4 py-6 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm animate-fade-in overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#141415] border border-[var(--color-border)] rounded-2xl overflow-hidden animate-fade-up shadow-[0_25px_60px_rgba(0,0,0,0.5)] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.image ? (
              <img src={selectedItem.image} alt={selectedItem.itemName} className="w-full h-64 object-cover" />
            ) : (
              <div className="w-full h-40 bg-[rgba(255,255,255,0.02)] flex items-center justify-center">
                <ImageOff size={40} className="text-[var(--color-foreground-dim)]" strokeWidth={1} />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-foreground)]">{selectedItem.itemName}</h2>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold bg-[rgba(239,68,68,0.12)] text-[#EF4444] border border-[rgba(239,68,68,0.2)]">LOST</span>
                    {(() => {
                      const claim = getCurrentClaimRequest();
                      if (!claim) return null;
                      
                      const statusColors = {
                        pending: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", icon: "AlertCircle" },
                        verified: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
                        rejected: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
                      };
                      const colors = statusColors[claim.status];
                      
                      return (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold" style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.text + "4d", borderWidth: "1px" }}>
                          {claim.status === "verified" && <Check size={12} />}
                          {claim.status === "pending" && <AlertCircle size={12} />}
                          {claim.status.toUpperCase()}
                        </span>
                      );
                    })()}
                  </div>
                </div>
                <button onClick={() => { setSelectedItem(null); setShowClaimForm(false); }} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <X size={18} className="text-[var(--color-foreground-dim)]" />
                </button>
              </div>

              {selectedItem.description && (
                <p className="text-[0.9rem] text-[var(--color-foreground-muted)] mb-6 leading-relaxed">{selectedItem.description}</p>
              )}

              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <Tag size={14} className="text-[var(--color-foreground-dim)]" />
                  <span className="text-[var(--color-foreground-dim)] w-20">Category</span>
                  <span className="text-[var(--color-foreground)]">{selectedItem.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-[var(--color-foreground-dim)]" />
                  <span className="text-[var(--color-foreground-dim)] w-20">Location</span>
                  <span className="text-[var(--color-foreground)]">{formatLocation(selectedItem.location)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-[var(--color-foreground-dim)]" />
                  <span className="text-[var(--color-foreground-dim)] w-20">Date</span>
                  <span className="text-[var(--color-foreground)]">{selectedItem.date} {selectedItem.time && `at ${selectedItem.time}`}</span>
                </div>
                {selectedItem.contactName && (
                  <div className="flex items-center gap-3">
                    <Eye size={14} className="text-[var(--color-foreground-dim)]" />
                    <span className="text-[var(--color-foreground-dim)] w-20">Reported by</span>
                    <span className="text-[var(--color-foreground)]">{selectedItem.contactName}</span>
                  </div>
                )}
                {selectedItem.contactEmail && (
                  <div className="flex items-center gap-3">
                    <span className="w-[14px]" />
                    <span className="text-[var(--color-foreground-dim)] w-20">Email</span>
                    <a href={`mailto:${selectedItem.contactEmail}`} className="text-[var(--color-ash)] hover:text-[var(--color-cloud)] transition-colors">{selectedItem.contactEmail}</a>
                  </div>
                )}
              </div>

              <div className="mt-6">
                {(() => {
                  const currentClaim = getCurrentClaimRequest();
                  
                  if (!showClaimForm && !currentClaim) {
                    return (
                      <button
                        onClick={handleOpenClaimForm}
                        className="w-full py-3 px-4 rounded-xl font-medium transition-all text-sm mb-4 bg-[rgba(190,184,182,0.12)] text-[var(--color-foreground)] border border-[var(--color-ash)] hover:bg-[rgba(190,184,182,0.18)]"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Check size={16} />
                          Claim This Item
                        </span>
                      </button>
                    );
                  }

                  if (currentClaim) {
                    return (
                      <div className="mb-4 p-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)]">
                        <p className="text-sm font-semibold text-[var(--color-foreground)] mb-3">Claim Request Summary</p>
                        <div className="space-y-2 text-xs text-[var(--color-foreground-muted)]">
                          <p><strong className="text-[var(--color-foreground-dim)]">Name:</strong> {currentClaim.claimerName}</p>
                          <p><strong className="text-[var(--color-foreground-dim)]">Email:</strong> {currentClaim.claimerEmail}</p>
                          <p><strong className="text-[var(--color-foreground-dim)]">Phone:</strong> {currentClaim.claimerPhone}</p>
                          <p><strong className="text-[var(--color-foreground-dim)]">Status:</strong> <span className={`font-semibold ${currentClaim.status === "verified" ? "text-[#22c55e]" : currentClaim.status === "pending" ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{currentClaim.status.toUpperCase()}</span></p>
                          <p className="text-[0.65rem] text-[var(--color-foreground-dim)] mt-3">Submitted {timeAgo(currentClaim.createdAt)}</p>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })()}

                {showClaimForm && (
                  <form onSubmit={handleSubmitClaim} className="p-5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)] space-y-4">
                    <p className="text-sm font-semibold text-[var(--color-foreground)] mb-1">Your Details</p>
                    
                    <div>
                      <label className="text-xs text-[var(--color-foreground-dim)] mb-1.5 block font-medium">Full Name <span className="text-[#EF4444]">*</span></label>
                      <input
                        type="text"
                        required
                        value={claimFormData.name}
                        onChange={(e) => setClaimFormData({ ...claimFormData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] text-sm focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--color-foreground-dim)] mb-1.5 block font-medium">Email Address <span className="text-[#EF4444]">*</span></label>
                      <input
                        type="email"
                        required
                        value={claimFormData.email}
                        onChange={(e) => setClaimFormData({ ...claimFormData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] text-sm focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--color-foreground-dim)] mb-1.5 block font-medium">Phone Number <span className="text-[#EF4444]">*</span></label>
                      <input
                        type="tel"
                        required
                        value={claimFormData.phone}
                        onChange={(e) => setClaimFormData({ ...claimFormData, phone: e.target.value })}
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] text-sm focus:border-[var(--color-ash)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--color-foreground-dim)] mb-1.5 block font-medium">Reason for Claim</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setReasonDropdownOpen(!reasonDropdownOpen)}
                          className="w-full px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm focus:border-[var(--color-ash)] focus:outline-none transition-colors text-left flex items-center justify-between hover:bg-[rgba(255,255,255,0.06)]"
                        >
                          <span>{claimFormData.reason || "Select a reason..."}</span>
                          <ChevronDown size={16} className={`text-[var(--color-foreground-dim)] transition-transform ${reasonDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {reasonDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-[#1a1a1b] border border-[var(--color-border)] z-[100] overflow-hidden shadow-lg">
                            {[
                              { value: "", label: "Select a reason..." },
                              { value: "I lost this item", label: "I lost this item" },
                              { value: "This belongs to me", label: "This belongs to me" },
                              { value: "I can identify it", label: "I can identify it" },
                            ].map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setClaimFormData({ ...claimFormData, reason: option.value });
                                  setReasonDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm transition-colors"
                                style={{
                                  backgroundColor: claimFormData.reason === option.value ? "rgba(190,184,182,0.15)" : "#1a1a1b",
                                  color: claimFormData.reason === option.value ? "var(--color-foreground)" : "var(--color-foreground-muted)",
                                  borderBottom: option !== "I can identify it" ? "1px solid rgba(255,255,255,0.04)" : "none",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = claimFormData.reason === option.value ? "rgba(190,184,182,0.15)" : "rgba(255,255,255,0.08)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = claimFormData.reason === option.value ? "rgba(190,184,182,0.15)" : "#1a1a1b";
                                }}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[var(--color-foreground-dim)] mb-1.5 block font-medium">Additional Details</label>
                      <textarea
                        value={claimFormData.description}
                        onChange={(e) => setClaimFormData({ ...claimFormData, description: e.target.value })}
                        placeholder="Provide details that can help verify your claim..."
                        className="w-full px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] text-sm focus:border-[var(--color-ash)] focus:outline-none resize-none h-16 transition-colors"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)] hover:bg-[rgba(34,197,94,0.25)] font-medium text-sm transition-colors"
                      >
                        Submit Claim
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowClaimForm(false)}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[rgba(255,255,255,0.04)] text-[var(--color-foreground-muted)] border border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.08)] font-medium text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="flex items-center justify-between text-xs text-[var(--color-foreground-dim)] pt-4 border-t border-[var(--color-border)]">
                  <span>Reported {timeAgo(selectedItem.createdAt)}</span>
                  <span>ID: {selectedItem.id.slice(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
