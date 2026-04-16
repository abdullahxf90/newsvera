import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Ownership & Funding", description: "Transparent disclosure of Newsvera's ownership structure and funding sources." };

export default function OwnershipPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Ownership &amp; Funding
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Ownership &amp; Funding</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> November 1, 2024</p>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Ownership Structure</h2>
          <p>Newsvera is an independent digital news publication. The publication is privately owned by its founding editorial team, none of whom have financial interests in the technology companies we cover that would create a conflict of interest with our reporting mission.</p>
          <p className="mt-3">Newsvera does not accept investment from technology companies, venture capital firms, government entities, or political organizations. This independence is fundamental to our ability to report without conflicts of interest.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Revenue Sources</h2>
          <div className="space-y-4">
            {[
              { source: "Display Advertising", pct: "~65%", desc: "Programmatic advertising including Google AdSense and direct ad placements. Advertisers have no influence over editorial content. All advertising is clearly labeled." },
              { source: "Affiliate Partnerships", pct: "~20%", desc: "Newsvera earns commissions on purchases made through certain links in product reviews and buying guides. These relationships are disclosed in affected articles. Affiliate relationships do not influence our editorial evaluation of products." },
              { source: "Newsletter Subscriptions", pct: "~15%", desc: "Premium newsletter subscriptions provide direct reader support. Subscribers receive no special editorial access or influence over coverage decisions." },
            ].map((r) => (
              <div key={r.source} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{r.source}</h3>
                  <span className="text-accent-600 dark:text-accent-400 font-bold text-sm">{r.pct} of revenue</span>
                </div>
                <p className="text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Editorial Independence Guarantee</h2>
          <p>No revenue source — advertising, affiliate, or subscription — has any influence over Newsvera&apos;s editorial decisions. Our newsroom operates independently from our business operations, with a strict firewall between commercial and editorial departments.</p>
          <p className="mt-3">We have never accepted payment for coverage, never suppressed a story at an advertiser&apos;s request, and never allowed a sponsor to review editorial content before publication. If any of this changes, we will disclose it prominently.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Contact</h2>
          <p>Questions about ownership or funding: <a href={`mailto:${siteConfig.email.general}`} className="text-primary-900 dark:text-accent-400 hover:underline">{siteConfig.email.general}</a></p>
        </section>
      </div>
    </div>
  );
}
