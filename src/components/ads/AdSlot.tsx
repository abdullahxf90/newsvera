import { createClient } from "@supabase/supabase-js";

interface AdSlotProps {
  id: string;
  size: "leaderboard" | "medium-rectangle" | "half-page" | "mobile-banner" | "inline" | "footer";
  className?: string;
}

const sizes: Record<AdSlotProps["size"], { w: number; h: number; label: string }> = {
  leaderboard:        { w: 728, h: 90,  label: "728×90" },
  "medium-rectangle": { w: 300, h: 250, label: "300×250" },
  "half-page":        { w: 300, h: 600, label: "300×600" },
  "mobile-banner":    { w: 320, h: 50,  label: "320×50" },
  inline:             { w: 468, h: 60,  label: "468×60" },
  footer:             { w: 728, h: 90,  label: "728×90" },
};

async function getAd(slotId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const client = createClient(url, key);
  const { data } = await client
    .from("ads")
    .select("*")
    .eq("slot_id", slotId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return data;
}

export default async function AdSlot({ id, size, className = "" }: AdSlotProps) {
  const ad = await getAd(id);
  const { w, h, label } = sizes[size];
  const maxW = Math.min(w, 728);

  if (ad?.type === "html" && ad.html_code) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 select-none">Advertisement</p>
        <div
          style={{ maxWidth: "100%", width: maxW, minHeight: h }}
          dangerouslySetInnerHTML={{ __html: ad.html_code }}
        />
      </div>
    );
  }

  if (ad?.type === "image" && ad.image_url) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 select-none">Advertisement</p>
        <a
          href={ad.link_url || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{ maxWidth: "100%", width: maxW, display: "block" }}
        >
          <img
            src={ad.image_url}
            alt={ad.alt_text || "Advertisement"}
            style={{ width: "100%", height: h, objectFit: "cover", borderRadius: 4 }}
          />
        </a>
      </div>
    );
  }

  // Placeholder when no ad is configured
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 select-none">Advertisement</p>
      <div
        className="bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center text-gray-400 dark:text-gray-500"
        style={{ maxWidth: "100%", width: maxW, minHeight: h }}
        aria-label="Advertisement"
      >
        <span className="text-xs">Ad Space · {label}</span>
      </div>
    </div>
  );
}
