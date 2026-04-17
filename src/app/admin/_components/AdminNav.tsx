"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";

const links = [
  { href: "/admin", label: "Articles", exact: true },
  { href: "/admin/ads", label: "Ads" },
  { href: "/admin/breaking-news", label: "Breaking News" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createAdminClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-6">
      <Link href="/admin" className="text-white font-bold text-lg flex-shrink-0" style={{ fontFamily: "'Playfair Display', serif" }}>
        News<span className="text-yellow-500">vera</span>
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        {links.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(href, exact)
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3 flex-shrink-0">
        <Link href="/" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">
          View Site ↗
        </Link>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
          Sign Out
        </button>
      </div>
    </header>
  );
}
