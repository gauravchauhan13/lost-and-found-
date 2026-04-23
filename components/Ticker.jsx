"use client";

import { AlertCircle, Zap, Users, CheckCircle2 } from "lucide-react";

const tickerMessages = [
  { icon: Zap, text: "⚡ 156 items matched today", color: "text-amber-400" },
  { icon: Users, text: "👥 2,340+ active UPES users", color: "text-blue-400" },
  { icon: CheckCircle2, text: "✓ 94% success recovery rate", color: "text-green-400" },
  { icon: AlertCircle, text: "🔔 New found items posted every minute", color: "text-red-400" },
];

export default function Ticker() {
  return (
    <div className="bg-gradient-to-r from-[rgba(190,184,182,0.08)] via-[rgba(110,104,102,0.06)] to-[rgba(190,184,182,0.08)] border-y border-[var(--color-border)] overflow-hidden py-2">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="relative flex items-center">
          {/* Ticker Label */}
          <div className="flex items-center gap-2 whitespace-nowrap mr-8 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[var(--color-ash)]">
                LIVE
              </span>
            </div>
          </div>

          {/* Scrolling Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-12 animate-scroll-ticker whitespace-nowrap">
              {/* First set */}
              {tickerMessages.map((msg, idx) => (
                <div key={`first-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                  <msg.icon size={14} className={msg.color} />
                  <span className="text-[0.8rem] font-medium text-[var(--color-foreground-muted)]">
                    {msg.text}
                  </span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {tickerMessages.map((msg, idx) => (
                <div key={`second-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                  <msg.icon size={14} className={msg.color} />
                  <span className="text-[0.8rem] font-medium text-[var(--color-foreground-muted)]">
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-ticker {
          animation: scroll-ticker 30s linear infinite;
        }

        .animate-scroll-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
