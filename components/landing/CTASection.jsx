import Link from "next/link";
import { PlusCircle, LayoutGrid } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-[var(--color-charcoal)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-gradient-to-br from-[rgba(110,104,102,0.12)] to-[rgba(190,184,182,0.06)] border border-[rgba(190,184,182,0.15)] rounded-3xl p-16 text-center relative overflow-hidden animate-fade-up">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,184,182,0.06),transparent_70%)] pointer-events-none" />

          <div className="relative z-[1]">
            <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-[var(--color-ash)] mb-4">
              Start Today
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[2rem] font-extrabold leading-[1.2] grad-text-warm mb-4">
              Lost something on campus?
            </h2>
            <p className="text-[var(--color-foreground-muted)] mb-8 max-w-[500px] mx-auto">
              Join hundreds of UPES students already using FindIt to recover
              their lost belongings.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-3xl text-[1.05rem] font-semibold bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] text-white shadow-[0_4px_20px_rgba(110,104,102,0.3)] hover:shadow-[0_6px_28px_rgba(190,184,182,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <PlusCircle size={18} />
                Report Lost Item
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-3xl text-[1.05rem] font-semibold bg-[rgba(255,255,255,0.04)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[var(--color-border-hover)] transition-all duration-300"
              >
                <LayoutGrid size={18} />
                Browse Found Items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
