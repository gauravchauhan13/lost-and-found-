"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, PlusCircle, LayoutGrid, Menu, X } from "lucide-react";

export default function Navbar({ activePage = "", showNav = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[68px] bg-[rgba(10,10,11,0.88)] backdrop-blur-xl border-b border-[var(--color-border)] z-[1000] flex items-center">
      <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <img
            src="/logo.png?v=2"
            alt="FindIt Logo"
            width={36}
            height={36}
            className="object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
          />
          <div>
            <div className="font-[family-name:var(--font-display)] text-[1.4rem] font-extrabold grad-text leading-tight">
              FindIt
            </div>
            <div className="text-[0.65rem] font-semibold text-[var(--color-ash)] tracking-[0.12em] uppercase leading-none mt-0.5">
              UPES DEHRADUN
            </div>
          </div>
        </Link>

        {/* Center Tagline - Show on landing page */}
        {!showNav && (
          <div className="hidden md:flex items-center">
            <p className="text-[0.85rem] text-[var(--color-foreground-muted)] font-medium tracking-wide">
              Never Lose Anything On Campus Again
            </p>
          </div>
        )}

        {/* Desktop Nav Links - Only show if showNav is true */}
        {showNav && (
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/browse"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[0.88rem] font-medium transition-all duration-250 ${
                activePage === "browse"
                  ? "text-[var(--color-foreground)] bg-[rgba(190,184,182,0.1)]"
                  : "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              <LayoutGrid size={16} />
              Browse Items
            </Link>
            <Link
              href="/report"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[0.88rem] font-medium transition-all duration-250 ${
                activePage === "report"
                  ? "text-[var(--color-foreground)] bg-[rgba(190,184,182,0.1)]"
                  : "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              <PlusCircle size={16} />
              Report Lost
            </Link>
          </div>
        )}

        {/* Desktop CTA - Only show if showNav is true */}
        {showNav && (
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.9rem] font-semibold bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white shadow-[0_4px_20px_rgba(110,104,102,0.3)] hover:shadow-[0_6px_28px_rgba(190,184,182,0.4)] hover:-translate-y-0.5 transition-all duration-250"
            >
              <PlusCircle size={16} />
              Report Item
            </Link>
          </div>
        )}

        {/* Landing Page Quick Links */}
        {!showNav && (
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/browse"
              className="text-[0.85rem] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] font-medium transition-colors"
            >
              Browse
            </Link>
            <div className="w-px h-4 bg-[var(--color-border)]" />
            <Link
              href="/report"
              className="text-[0.85rem] font-semibold text-[var(--color-foreground)] hover:text-[var(--color-ash)] transition-colors"
            >
              Report Lost
            </Link>
          </div>
        )}

        {/* Hamburger */}
        <button
          className="flex md:hidden p-2 cursor-pointer rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)] transition-all hover:bg-[rgba(255,255,255,0.08)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="hamburger-btn"
        >
          {mobileOpen ? (
            <X size={20} className="text-[var(--color-foreground)]" />
          ) : (
            <Menu size={20} className="text-[var(--color-foreground)]" />
          )}
        </button>
      </div>

        {/* Mobile Nav - Only show if showNav is true */}
        {showNav && mobileOpen && (
          <div className="absolute top-[68px] left-0 right-0 bg-[rgba(10,10,11,0.97)] border-b border-[var(--color-border)] p-4 flex flex-col gap-1 md:hidden animate-fade-in z-[999]">
            <Link
              href="/browse"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9rem] font-medium text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <LayoutGrid size={18} />
              Browse Items
            </Link>
            <Link
              href="/report"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9rem] font-medium text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <PlusCircle size={18} />
              Report Lost
            </Link>
            <div className="h-px bg-[var(--color-border)] my-2" />
            <Link
              href="/report"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[0.9rem] font-semibold bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <PlusCircle size={16} />
              Report Item
            </Link>
          </div>
        )}
    </nav>
  );
}
