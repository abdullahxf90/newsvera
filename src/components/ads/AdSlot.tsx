"use client";

import { useState } from "react";
import { siteConfig } from "@/../../config/site";

interface AdSlotProps {
  id: string;
  size: "leaderboard" | "medium-rectangle" | "half-page" | "mobile-banner" | "inline" | "footer";
  className?: string;
}

const sizes: Record<AdSlotProps["size"], { w: number; h: number; label: string }> = {
  leaderboard:       { w: 728, h: 90,  label: "728×90" },
  "medium-rectangle":{ w: 300, h: 250, label: "300×250" },
  "half-page":       { w: 300, h: 600, label: "300×600" },
  "mobile-banner":   { w: 320, h: 50,  label: "320×50" },
  inline:            { w: 468, h: 60,  label: "468×60" },
  footer:            { w: 728, h: 90,  label: "728×90" },
};

export default function AdSlot({ id, size, className = "" }: AdSlotProps) {
  const [adBlocked] = useState(false);
  const { w, h, label } = sizes[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 select-none">
        Advertisement
      </p>
      <div
        className="bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded flex flex-col items-center justify-center text-gray-400 dark:text-gray-500"
        style={{
          maxWidth: "100%",
          width: Math.min(w, 728),
          minHeight: h,
        }}
        data-ad-slot={id}
        data-ad-client={siteConfig.adsense.clientId}
        data-ad-format="auto"
        aria-label="Advertisement"
      >
        {adBlocked ? (
          <p className="text-xs text-center px-4">
            It looks like you&apos;re using an ad blocker. Please consider supporting Newsvera by allowing ads.
          </p>
        ) : (
          <span className="text-xs">Ad Space · {label}</span>
        )}
      </div>
    </div>
  );
}
