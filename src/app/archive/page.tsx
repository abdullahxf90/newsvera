import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/data/articles";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Archive", description: "Browse all Newsvera articles organized by date." };

export default function ArchivePage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const byMonth: Record<string, typeof articles> = {};
  sorted.forEach((a) => {
    const d = new Date(a.publishedAt);
    const key = d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(a);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Archive
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Article Archive</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{articles.length} articles published since {new Date(sorted[sorted.length - 1]?.publishedAt).getFullYear()}</p>

      <div className="space-y-10">
        {Object.entries(byMonth).map(([month, monthArticles]) => (
          <section key={month}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-accent-500" style={{ fontFamily: "'Playfair Display', serif" }}>
              {month} <span className="text-gray-400 font-normal text-base">({monthArticles.length})</span>
            </h2>
            <div className="space-y-3">
              {monthArticles.map((a) => (
                <div key={a.id} className="flex items-start gap-4">
                  <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap pt-0.5 w-24 flex-shrink-0">
                    {formatDateShort(a.publishedAt)}
                  </span>
                  <div>
                    <Link
                      href={`/category/${a.categorySlug}`}
                      className="text-xs text-accent-600 dark:text-accent-400 font-bold uppercase tracking-wide hover:underline mr-2"
                    >
                      {a.category}
                    </Link>
                    <Link href={`/article/${a.slug}`} className="text-gray-900 dark:text-white hover:text-primary-900 dark:hover:text-accent-400 transition-colors font-medium text-sm">
                      {a.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
