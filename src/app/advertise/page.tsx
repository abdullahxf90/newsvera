import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Advertise with Newsvera", description: "Reach a highly engaged audience of tech professionals, investors, and business leaders." };

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Advertise
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Advertise with Newsvera</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Reach 2 million monthly readers — technology professionals, investors, founders, and business leaders who make decisions and influence their organizations.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { stat: "2M+", label: "Monthly Readers" },
          { stat: "50K+", label: "Newsletter Subscribers" },
          { stat: "68%", label: "Decision Makers" },
          { stat: "4.2min", label: "Avg. Session Duration" },
        ].map((s) => (
          <div key={s.label} className="bg-primary-900 text-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent-400">{s.stat}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ad Formats Available</h2>
        <div className="space-y-3">
          {[
            { format: "Display Advertising", desc: "Leaderboard (728×90), Medium Rectangle (300×250), and Half Page (300×600) placements across all pages." },
            { format: "Newsletter Sponsorship", desc: "Dedicated placement in the Newsvera Daily newsletter reaching 50,000+ engaged subscribers." },
            { format: "Category Sponsorship", desc: "Exclusive sponsorship of a content category (e.g., 'Cybersecurity coverage brought to you by...')." },
          ].map((f) => (
            <div key={f.format} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.format}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-900 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Get a Media Kit</h2>
        <p className="text-gray-300 text-sm mb-4">Contact our advertising team for our full media kit with audience demographics, ad specifications, and pricing.</p>
        <a href={`mailto:${siteConfig.email.ads}`} className="inline-block bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
          Contact Advertising Team →
        </a>
      </section>
    </div>
  );
}
