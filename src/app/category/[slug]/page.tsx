import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/data/articles";
import { siteConfig } from "@/../../config/site";
import ArticleCard from "@/components/articles/ArticleCard";
import Sidebar from "@/components/articles/Sidebar";
import AdSlot from "@/components/ads/AdSlot";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = siteConfig.categories.find((c) => c.slug === params.slug);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} News`,
    description: `Latest ${category.name} news, analysis, and insights from Newsvera.`,
    alternates: { canonical: `${siteConfig.url}/category/${params.slug}` },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = siteConfig.categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-primary-900 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <a href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</a> / {category.name}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          {category.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Latest {category.name} news, analysis, and insights — {articles.length} articles
        </p>
      </div>

      <AdSlot id={`cat-top-${params.slug}`} size="leaderboard" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {articles.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <p className="text-xl">No articles found in this category yet.</p>
            </div>
          ) : (
            <>
              {/* First article hero */}
              {articles[0] && (
                <div className="mb-6">
                  <ArticleCard article={articles[0]} variant="hero" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {articles.slice(1, 7).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {articles.length > 7 && (
                <>
                  <AdSlot id={`cat-mid-${params.slug}`} size="leaderboard" className="my-8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    {articles.slice(7).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
