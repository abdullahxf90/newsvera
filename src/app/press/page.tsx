import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Press & Media Kit", description: "Newsvera press kit, brand assets, and media contact information." };

export default function PressPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Press
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Press &amp; Media Kit</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Resources for journalists, podcasters, and media professionals covering Newsvera.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>About Newsvera</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Newsvera is an independent technology and business news publication founded in {siteConfig.foundingYear}. We publish daily coverage of artificial intelligence, startups, financial markets, cybersecurity, consumer technology, and business strategy. Our editorial team includes award-winning journalists with backgrounds at Reuters, Bloomberg, TechCrunch, CNET, and The Wall Street Journal. Newsvera serves a global readership of technology professionals, investors, and business leaders.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Key Facts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Founded", value: String(siteConfig.foundingYear) },
            { label: "Monthly Readers", value: "2M+" },
            { label: "Newsletter Subscribers", value: "50K+" },
            { label: "Journalists", value: "6" },
          ].map((f) => (
            <div key={f.label} className="bg-primary-900 text-white rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-accent-400 mb-1">{f.value}</p>
              <p className="text-gray-400 text-xs">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Brand Guidelines</h2>
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Publication Name:</strong> Newsvera (one word, capital N, lowercase v)</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Tagline:</strong> &ldquo;{siteConfig.tagline}&rdquo;</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Primary Color:</strong> Deep Navy (#0A2540)</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Accent Color:</strong> Gold (#C9A961)</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Coverage Focus:</strong> Technology, Business, AI & Innovation, Cybersecurity, Startups, Markets</p>
        </div>
      </section>

      <section className="bg-primary-900 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Media Contact</h2>
        <p className="text-gray-300 text-sm mb-3">For press inquiries, interview requests, and media partnerships:</p>
        <a href={`mailto:${siteConfig.email.press}`} className="text-accent-400 hover:text-accent-300 transition-colors">{siteConfig.email.press}</a>
        <p className="text-gray-500 text-xs mt-2">Response time: 1–2 business days</p>
      </section>
    </div>
  );
}
