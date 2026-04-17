import type { Metadata } from "next";
import Link from "next/link";
import { getLatestArticles } from "@/lib/data/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Search", description: "Search Newsvera articles, topics, and authors." };

interface Props {
  searchParams: { q?: string; category?: string };
}

export const revalidate = 60;

export default async function SearchPage({ searchParams }: Props) {
  const allArticles = await getLatestArticles(1000);
  const query = searchParams.q?.trim().toLowerCase() || "";
  const categoryFilter = searchParams.category || "";

  const results = query
    ? allArticles.filter((a) => {
        const matchesQuery =
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query)) ||
          a.category.toLowerCase().includes(query);
        const matchesCategory = !categoryFilter || a.categorySlug === categoryFilter;
        return matchesQuery && matchesCategory;
      })
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Search Newsvera
      </h1>

      <form method="get" action="/search" className="mb-8">
        <div className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={searchParams.q || ""}
            placeholder="Search articles, topics, authors..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
            autoFocus
          />
          <button type="submit" className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium">
            Search
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Link
            href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${!categoryFilter ? "bg-primary-900 text-white border-primary-900" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-900"}`}
          >
            All Categories
          </Link>
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/search?q=${encodeURIComponent(searchParams.q || "")}&category=${cat.slug}`}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${categoryFilter === cat.slug ? "bg-primary-900 text-white border-primary-900" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-900"}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </form>

      {query ? (
        <>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;<strong>{searchParams.q}</strong>&rdquo;
            {categoryFilter && <> in <strong>{siteConfig.categories.find((c) => c.slug === categoryFilter)?.name}</strong></>}
          </p>
          {results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-300 dark:text-gray-600 mb-4">🔍</p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">No results found for &ldquo;{searchParams.q}&rdquo;</p>
              <p className="text-sm text-gray-500">Try different keywords or browse our <Link href="/" className="text-primary-900 dark:text-accent-400 hover:underline">latest articles</Link>.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <p className="text-lg">Enter a search term to find articles.</p>
        </div>
      )}
    </div>
  );
}
