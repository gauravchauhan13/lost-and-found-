import { UserPlus, FileText, BrainCircuit, PackageCheck } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: UserPlus,
    title: "Open the App",
    desc: "No account needed. Jump right in and start reporting or browsing lost items instantly.",
  },
  {
    num: 2,
    icon: FileText,
    title: "Report Your Item",
    desc: "Fill out a short form with your item's details, location, date, and upload a photo.",
  },
  {
    num: 3,
    icon: BrainCircuit,
    title: "Get Smart Matches",
    desc: "Our system automatically finds potential matches between lost and found items.",
  },
  {
    num: 4,
    icon: PackageCheck,
    title: "Claim & Recover",
    desc: "Browse found items, verify ownership, and collect your belongings from campus security.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-[var(--color-background)]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center animate-fade-up">
          <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-[var(--color-ash)] mb-2">
            Simple Process
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[2.5rem] font-extrabold leading-[1.2] grad-text-warm">
            How FindIt Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative">
          {steps.map((step, i) => {
            const IconComponent = step.icon;
            return (
              <div
                key={i}
                className={`text-center p-8 animate-fade-up delay-${i + 1}`}
              >
                {/* Step Circle with Icon */}
                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-ash)] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(110,104,102,0.25)]">
                  <IconComponent size={24} className="text-white" strokeWidth={2} />
                </div>

                {/* Step Number */}
                <span className="text-[0.7rem] font-bold tracking-[0.1em] text-[var(--color-foreground-dim)] uppercase mb-2 block">
                  Step {step.num}
                </span>

                {/* Title */}
                <h3 className="font-bold text-[var(--color-foreground)] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[0.85rem] text-[var(--color-foreground-muted)]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
