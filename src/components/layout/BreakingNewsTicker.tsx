"use client";

import { useState } from "react";
import Link from "next/link";

const breakingItems = [
  { text: "BREAKING: OpenAI's GPT-5 Sets New Benchmarks Across Every Major AI Evaluation", href: "/article/openai-gpt5-new-benchmarks-ai-evaluation" },
  { text: "MARKETS: Nasdaq crosses 20,000 for the first time as tech earnings beat expectations", href: "/article/nasdaq-all-time-high-tech-earnings-beat" },
  { text: "CYBERSECURITY: FBI and Europol dismantle major ransomware gang, seize $95M in crypto", href: "/article/ransomware-gang-disrupted-fbi-europol-seize-infrastructure" },
  { text: "STARTUPS: Andreessen Horowitz closes $7.2B fund focused on AI infrastructure", href: "/article/andreessen-horowitz-72-billion-fund-ai-infrastructure" },
  { text: "TECH: Apple M4 Ultra sets new records in professional workstation benchmarks", href: "/article/apple-m4-ultra-chip-performance-records" },
];

export default function BreakingNewsTicker() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden relative" role="marquee" aria-label="Breaking news ticker">
      <div className="flex items-center max-w-full">
        {/* Label */}
        <div className="flex-shrink-0 bg-white text-red-600 font-bold text-xs px-3 py-0.5 mr-4 z-10 uppercase tracking-wider">
          Breaking
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1">
          <div className="ticker-content flex gap-16">
            {[...breakingItems, ...breakingItems].map((item, i) => (
              <Link key={i} href={item.href} className="text-sm whitespace-nowrap hover:text-yellow-200 transition-colors">
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 ml-4 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss breaking news ticker"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
