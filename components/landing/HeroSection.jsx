"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Smartphone,
  Key,
  Watch,
  Backpack,
  Wallet,
  Headphones,
  Laptop,
  CreditCard,
  Glasses,
  Zap,
  Shield,
  MapPin,
} from "lucide-react";

// Scattered icons — organic, varied sizes and positions
const floatingObjects = [
  // Large prominent icons
  { icon: Smartphone, label: "Phone",    top: "12%",  left: "55%",  size: 72, iconSize: 32, delay: "0s",    anim: "float" },
  { icon: Key,        label: "Keys",     top: "58%",  left: "8%",   size: 72, iconSize: 30, delay: "1.2s",  anim: "float-alt" },
  // Medium icons
  { icon: Watch,      label: "Watch",    top: "5%",   left: "18%",  size: 60, iconSize: 26, delay: "0.5s",  anim: "float-alt" },
  { icon: Wallet,     label: "Wallet",   top: "30%",  left: "72%",  size: 60, iconSize: 26, delay: "1.8s",  anim: "float" },
  { icon: Laptop,     label: "Laptop",   top: "68%",  left: "62%",  size: 60, iconSize: 26, delay: "0.3s",  anim: "float" },
  { icon: Backpack,   label: "Bag",      top: "82%",  left: "22%",  size: 60, iconSize: 26, delay: "2.2s",  anim: "float-alt" },
  // Small accent icons
  { icon: Headphones, label: "Earbuds",  top: "35%",  left: "15%",  size: 50, iconSize: 20, delay: "0.9s",  anim: "float" },
  { icon: Glasses,    label: "Glasses",  top: "78%",  left: "52%",  size: 50, iconSize: 20, delay: "1.5s",  anim: "float-alt" },
  { icon: CreditCard, label: "ID Card",  top: "48%",  left: "82%",  size: 50, iconSize: 20, delay: "2s",    anim: "float" },
  { icon: Search,     label: "FindIt",   top: "22%",  left: "40%",  size: 50, iconSize: 20, delay: "0.7s",  anim: "float-alt" },
];

const features = [
  { icon: Zap, title: "Instant Matching", desc: "AI-powered smart match" },
  { icon: Shield, title: "Secure & Private", desc: "Campus-only access" },
  { icon: MapPin, title: "Campus Wide", desc: "All blocks covered" },
];

// Heading words with their styling
const headingLines = [
  { words: ["Never", "Lose"], gradient: false },
  { words: ["Another", "Item"], gradient: true },
  { words: ["On", "Campus", "Again"], gradient: false },
];

export default function HeroSection() {
  const [visibleWords, setVisibleWords] = useState(0);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const totalWords = headingLines.reduce((sum, line) => sum + line.words.length, 0);

  useEffect(() => {
    // Staggered word animation
    if (visibleWords < totalWords) {
      const timer = setTimeout(() => {
        setVisibleWords((v) => v + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      // After heading finishes, reveal features
      const timer = setTimeout(() => setFeaturesVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [visibleWords, totalWords]);

  let wordIndex = 0;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[var(--color-charcoal)] via-[var(--color-background)] to-[#111112] flex items-center relative overflow-hidden pt-[68px]">
      {/* Ambient Orbs */}
      <div
        className="orb orb-primary"
        style={{ width: 600, height: 600, top: -150, right: -100, opacity: 0.5 }}
      />
      <div
        className="orb orb-steel"
        style={{ width: 400, height: 400, bottom: -100, left: -80, opacity: 0.4 }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-[2] w-full">
        <div className="max-w-[600px]">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 pl-2.5 bg-[rgba(190,184,182,0.08)] border border-[rgba(190,184,182,0.2)] rounded-full text-[0.78rem] font-semibold text-[var(--color-ash)] mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 bg-[var(--color-ash)] rounded-full animate-pulse-glow" />
            UPES Dehradun Campus Platform
          </div>

          {/* Animated Title */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4rem)] font-black leading-[1.1] mb-6 text-[var(--color-foreground)]">
            {headingLines.map((line, lineIdx) => (
              <span key={lineIdx}>
                {line.words.map((word) => {
                  const currentIdx = wordIndex++;
                  const isVisible = currentIdx < visibleWords;
                  const gradientStyle = line.gradient
                    ? {
                        background: "linear-gradient(135deg, var(--color-steel), var(--color-ash), var(--color-cloud))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {};
                  return (
                    <span
                      key={currentIdx}
                      className="inline-block transition-all duration-500 ease-out"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? "translateY(0) scale(1)"
                          : "translateY(20px) scale(0.95)",
                        filter: isVisible ? "blur(0px)" : "blur(4px)",
                        ...gradientStyle,
                      }}
                    >
                      {word}
                      &nbsp;
                    </span>
                  );
                })}
                {lineIdx < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="text-[1.05rem] text-[var(--color-foreground-muted)] leading-[1.75] mb-10 max-w-[520px] animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            FindIt is UPES&apos;s intelligent lost &amp; found system. Report
            lost items, discover found ones, and get smart matches — all in one
            place.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-3xl text-[1.05rem] font-semibold bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white shadow-[0_4px_20px_rgba(110,104,102,0.35)] hover:shadow-[0_6px_28px_rgba(190,184,182,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Search size={18} />
              Report Lost Item
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-3xl text-[1.05rem] font-semibold border-[1.5px] border-[var(--color-ash)] text-[var(--color-ash)] bg-transparent hover:bg-[rgba(190,184,182,0.08)] hover:shadow-[0_0_30px_rgba(190,184,182,0.12)] transition-all duration-300"
            >
              Browse Items
            </Link>
          </div>

          {/* Feature Pills — replaces stat counters */}
          <div className="flex gap-5 flex-wrap">
            {features.map((feat, i) => {
              const FeatureIcon = feat.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 transition-all duration-700 ease-out"
                  style={{
                    opacity: featuresVisible ? 1 : 0,
                    transform: featuresVisible
                      ? "translateY(0)"
                      : "translateY(16px)",
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(190,184,182,0.08)] border border-[rgba(110,104,102,0.2)] flex items-center justify-center">
                    <FeatureIcon
                      size={18}
                      className="text-[var(--color-ash)]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.85rem] font-bold text-[var(--color-foreground)] leading-tight">
                      {feat.title}
                    </span>
                    <span className="text-[0.72rem] text-[var(--color-foreground-dim)] leading-tight">
                      {feat.desc}
                    </span>
                  </div>
                  {i < features.length - 1 && (
                    <div className="w-px h-8 bg-[var(--color-border)] ml-2 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Objects — scattered organically, no ring pattern */}
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] z-[1] hidden lg:block">
        {/* Soft ambient glow in the center */}
        <div className="absolute w-[320px] h-[320px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(190,184,182,0.06)_0%,transparent_70%)]" />

        {floatingObjects.map((obj, i) => {
          const IconComponent = obj.icon;
          return (
            <div
              key={i}
              className={`absolute animate-${obj.anim}`}
              style={{
                top: obj.top,
                left: obj.left,
                animationDelay: obj.delay,
              }}
            >
              <div
                className="rounded-2xl bg-[rgba(15,15,16,0.55)] border border-[rgba(110,104,102,0.18)] backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-[rgba(190,184,182,0.35)] hover:shadow-[0_8px_40px_rgba(190,184,182,0.12)] transition-all duration-300"
                style={{ width: obj.size, height: obj.size }}
              >
                <IconComponent
                  size={obj.iconSize}
                  className="text-[var(--color-dust)]"
                  strokeWidth={1.4}
                />
              </div>
              <span className="text-[0.58rem] font-bold tracking-[0.12em] uppercase text-[var(--color-foreground-dim)] mt-1.5 block text-center opacity-70">
                {obj.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
