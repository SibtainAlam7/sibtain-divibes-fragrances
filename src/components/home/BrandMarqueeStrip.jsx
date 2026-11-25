import React from 'react';
import { Sparkles } from 'lucide-react';

const MARQUEE_ITEMS = [
  '50ML EAU DE PARFUM',
  '8–12 HOURS OUTDOOR LONGEVITY',
  'FREE DELIVERY ALL OVER PAKISTAN',
  '99% SIMILARITY TO ICONIC ORIGINALS',
  '18 SIGNATURE SCENTS FOR MEN & WOMEN',
  'PREMIUM FINE FRAGRANCE OILS',
  '7-DAY EASY EXCHANGE',
  'CASH ON DELIVERY & BANK TRANSFER',
];

export default function BrandMarqueeStrip() {
  return (
    <div
      aria-label="DiVibes Fragrances highlights"
      className="w-full overflow-hidden bg-[#B89A72] text-[#292522] border-y border-[#292522]/15 py-3.5 select-none"
    >
      <div className="animate-marquee-slow items-center">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${dup}-${item}`}
                className="inline-flex items-center gap-5 px-5 nav-text text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#292522] whitespace-nowrap"
              >
                <span>{item}</span>
                <Sparkles className="w-3 h-3 text-[#292522]/65 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
