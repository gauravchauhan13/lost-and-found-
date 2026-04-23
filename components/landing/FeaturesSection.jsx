import { Camera, MapPin, BrainCircuit, Bell, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Image Upload",
    desc: "Drag-and-drop photos of your lost or found item for faster identification. Supports JPG & PNG with instant preview.",
    color: "rgba(190, 184, 182, 0.12)",
  },
  {
    icon: MapPin,
    title: "Campus Location Tags",
    desc: "Tag items precisely using our campus map — by Block, Area, and Floor — for accurate location-based filtering.",
    color: "rgba(231, 228, 227, 0.08)",
  },
  {
    icon: BrainCircuit,
    title: "Smart Matching",
    desc: "Our AI-powered algorithm matches lost items with found ones using keyword, location, and time proximity scoring.",
    color: "rgba(245, 158, 11, 0.10)",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    desc: "Get notified the moment a matching item is found or when someone claims your reported item.",
    color: "rgba(16, 185, 129, 0.10)",
  },
  {
    icon: ShieldCheck,
    title: "Verified Access",
    desc: "Login secured with your @ddn.upes.ac.in university email. No outsiders, only trusted campus members.",
    color: "rgba(190, 184, 182, 0.12)",
  },
  {
    icon: Zap,
    title: "Fast Claiming",
    desc: "Claim found items with a simple form. Submit identifying details, await owner verification, and collect your item.",
    color: "rgba(239, 68, 68, 0.08)",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[var(--color-charcoal)] relative overflow-hidden">
      {/* Background Orb */}
      <div
        className="orb orb-primary"
        style={{
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-[1]">
        {/* Section Header */}
        <div className="text-center animate-fade-up">
          <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-[var(--color-ash)] mb-2">
            Why FindIt?
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[2.5rem] font-extrabold leading-[1.2] grad-text-warm">
            Smart Features for
            <br />
            Smart Students
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={i}
                className={`p-8 rounded-2xl bg-[var(--color-background-card)] border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(190,184,182,0.08)] animate-fade-up delay-${i + 1}`}
              >
                {/* Icon */}
                <div
                  className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-4"
                  style={{ background: feature.color }}
                >
                  <IconComponent size={24} className="text-[var(--color-cloud)]" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold mb-2 text-[var(--color-foreground)]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[0.88rem] text-[var(--color-foreground-muted)] leading-[1.65]">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
