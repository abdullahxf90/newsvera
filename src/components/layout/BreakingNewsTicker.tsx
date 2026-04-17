"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";

interface BreakingItem {
  id: string;
  text: string;
  link: string;
}

export default function BreakingNewsTicker() {
  const [items, setItems] = useState<BreakingItem[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from("breaking_news")
        .select("id, text, link")
        .eq("is_active", true)
        .order("sort_order")
        .order("created_at", { ascending: false });
      setItems(data || []);
    }
    fetchItems();
  }, []);

  if (dismissed || items.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden relative" role="marquee" aria-label="Breaking news ticker">
      <div className="flex items-center max-w-full">
        <div className="flex-shrink-0 bg-white text-red-600 font-bold text-xs px-3 py-0.5 mr-4 z-10 uppercase tracking-wider">
          Breaking
        </div>

        <div className="overflow-hidden flex-1">
          <div className="ticker-content flex gap-16">
            {[...items, ...items].map((item, i) => (
              item.link ? (
                <Link key={i} href={item.link} className="text-sm whitespace-nowrap hover:text-yellow-200 transition-colors">
                  {item.text}
                </Link>
              ) : (
                <span key={i} className="text-sm whitespace-nowrap">{item.text}</span>
              )
            ))}
          </div>
        </div>

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
