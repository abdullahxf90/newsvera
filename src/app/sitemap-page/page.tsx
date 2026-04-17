import Link from "next/link";
import type { Metadata } from "next";
import { getLatestArticles } from "@/lib/data/articles";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Sitemap", description: "HTML sitemap of all Newsvera pages and articles." };

export const revalidate = 3600;

export default async function SitemapPage() {
  const articles = await getLatestArticles(5000);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Sitemap
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Sitemap</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-l-4 border-accent-500 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>Main Pages</h2>
          <ul className="space-y-1.5">
            {["/", "/about", "/contact", "/newsletter", "/archive", "/search", "/careers", "/press", "/tip-us", "/advertise"].map((p) => (
              <li key={p}><Link href={p} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-900 dark:hover:text-accent-400 transition-colors">{p === "/" ? "Homepage" : p.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Link></li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-l-4 border-accent-500 pl-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>Categories</h2>
          <ul className="space-y-1.5">
            {siteConfig.categories.map((c) => (
              <li key={c.slug}><Link href={`/category/${c.slug}`} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-900 dark:hover:text-accent-400 transition-colors">{c.name}</Link></li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-l-4 border-accent-500 pl-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>Legal Pages</h2>
          <ul className="space-y-1.5">
            {["/privacy-policy", "/terms-of-service", "/cookie-policy", "/editorial-policy", "/ethics-policy", "/corrections", "/ownership", "/disclaimer"].map((p) => (
              <li key={p}><Link href={p} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-900 dark:hover:text-accent-400 transition-colors">{p.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-l-4 border-primary-900 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>All Articles ({articles.length})</h2>
          <ul className="space-y-1.5">
            {articles.map((a) => (
              <li key={a.id}>
                <Link href={`/article/${a.slug}`} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-900 dark:hover:text-accent-400 transition-colors line-clamp-1">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
