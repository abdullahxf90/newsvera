import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";
import {
  getFeaturedArticles,
  getLatestArticles,
  getEditorsPicks,
  getArticlesByCategory,
} from "@/lib/data/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticleCardSkeleton from "@/components/articles/ArticleCardSkeleton";
import Sidebar from "@/components/articles/Sidebar";
import AdSlot from "@/components/ads/AdSlot";

export default function HomePage() {
  const featured = getFeaturedArticles();
  const latest = getLatestArticles(12);
  const editorsPicks = getEditorsPicks();
  const techArticles = getArticlesByCategory("technology").slice(0, 4);
  const aiArticles = getArticlesByCategory("ai-innovation").slice(0, 4);
  const worldArticles = getArticlesByCategory("world").slice(0, 4);
  const politicsArticles = getArticlesByCategory("politics").slice(0, 4);
  const cyberArticles = getArticlesByCategory("cybersecurity").slice(0, 3);
  const hero = featured[0];
  const secondary = featured.slice(1, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {hero ? (
              <ArticleCard article={hero} variant="hero" />
            ) : (
              <ArticleCardSkeleton variant="hero" />
            )}
          </div>
          <div className="flex flex-col gap-4">
            {secondary.length > 0
              ? secondary.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="featured" />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <ArticleCardSkeleton key={i} variant="featured" />
                ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <AdSlot id="homepage-top" size="leaderboard" />
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-accent-500 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Latest News
                </h2>
                <Link href="/archive" className="text-sm text-primary-900 dark:text-accent-400 hover:underline font-medium">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {latest.slice(0, 6).length > 0
                  ? latest.slice(0, 6).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))
                  : Array.from({ length: 6 }).map((_, i) => (
                      <ArticleCardSkeleton key={i} />
                    ))}
              </div>
            </section>

            <AdSlot id="homepage-mid" size="leaderboard" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {latest.slice(6, 12).length > 0
                ? latest.slice(6, 12).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                  ))}
            </div>

            {/* Top in Technology */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-primary-900 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Top in Technology
                </h2>
                <Link href="/category/technology" className="text-sm text-primary-900 dark:text-accent-400 hover:underline font-medium">
                  More →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {techArticles.length > 0
                  ? techArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))
                  : Array.from({ length: 4 }).map((_, i) => (
                      <ArticleCardSkeleton key={i} />
                    ))}
              </div>
            </section>

            <AdSlot id="homepage-bottom" size="leaderboard" />

            {/* AI & Innovation */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-purple-600 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  AI &amp; Innovation
                </h2>
                <Link href="/category/ai-innovation" className="text-sm text-primary-900 dark:text-accent-400 hover:underline font-medium">
                  More →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {aiArticles.length > 0
                  ? aiArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))
                  : Array.from({ length: 4 }).map((_, i) => (
                      <ArticleCardSkeleton key={i} />
                    ))}
              </div>
            </section>

            {/* World */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-green-600 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  World
                </h2>
                <Link href="/category/world" className="text-sm text-primary-900 dark:text-accent-400 hover:underline font-medium">
                  More →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {worldArticles.length > 0
                  ? worldArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))
                  : Array.from({ length: 4 }).map((_, i) => (
                      <ArticleCardSkeleton key={i} />
                    ))}
              </div>
            </section>

            {/* Politics */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-blue-700 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Politics
                </h2>
                <Link href="/category/politics" className="text-sm text-primary-900 dark:text-accent-400 hover:underline font-medium">
                  More →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {politicsArticles.length > 0
                  ? politicsArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))
                  : Array.from({ length: 4 }).map((_, i) => (
                      <ArticleCardSkeleton key={i} />
                    ))}
              </div>
            </section>
          </div>

          <div>
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Editor's Picks */}
      <section className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-accent-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            Editor&apos;s Picks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {editorsPicks.length > 0
              ? editorsPicks.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`} className="group">
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-3 image-zoom bg-gray-700" />
                    <p className="text-accent-400 text-xs font-bold uppercase tracking-wide mb-1">{article.category}</p>
                    <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-accent-400 transition-colors line-clamp-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {article.title}
                    </h3>
                  </Link>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video rounded-lg bg-gray-700 mb-3" />
                    <div className="h-3 bg-gray-700 rounded w-16 mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-full mb-1" />
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-red-600 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cybersecurity
          </h2>
          <Link href="/category/cybersecurity" className="text-sm text-primary-900 dark:text-accent-400 hover:underline font-medium">
            More →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cyberArticles.length > 0
            ? cyberArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Stay ahead of the curve.
          </h2>
          <p className="text-gray-300 mb-6">
            Join 50,000+ readers who trust Newsvera for technology and business intelligence.
          </p>
          <div className="flex justify-center">
            <NewsletterForm placeholder="Enter your email address" buttonText="Get Daily Briefing" />
          </div>
          <p className="text-gray-500 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdSlot id="footer-banner" size="leaderboard" />
      </div>
    </div>
  );
}
