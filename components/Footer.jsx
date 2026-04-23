import Link from "next/link";
import { LayoutGrid, PlusCircle, Search } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] py-12 text-center">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <img
            src="/logo.png?v=2"
            alt="FindIt"
            width={30}
            height={30}
            className="object-contain rounded-md"
          />
          <span className="font-[family-name:var(--font-display)] font-extrabold text-lg grad-text">
            FindIt
          </span>
        </div>

        {/* Links */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <Link
            href="/browse"
            className="flex items-center gap-1.5 text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <LayoutGrid size={14} />
            Browse
          </Link>
          <Link
            href="/report"
            className="flex items-center gap-1.5 text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <PlusCircle size={14} />
            Report Lost
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[0.85rem] text-[var(--color-foreground-dim)]">
          © 2026 FindIt — UPES Dehradun Campus Lost &amp; Found System
        </p>
        <p className="text-[0.85rem] text-[var(--color-foreground-dim)] mt-1.5">
          Built for students, by students
        </p>
      </div>
    </footer>
  );
}
