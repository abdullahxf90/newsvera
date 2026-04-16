import { getTrendingArticles, getEditorsPicks } from "@/lib/data/articles";
import AdSlot from "@/components/ads/AdSlot";
import ArticleCard from "./ArticleCard";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function Sidebar() {
  const trending = getTrendingArticles();
  const editorsPicks = getEditorsPicks();

  return (
    <aside className="space-y-8">
      {/* Ad */}
      <AdSlot id="sidebar-top" size="medium-rectangle" />

      {/* Trending */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pb-2 border-b-2 border-accent-500" style={{ fontFamily: "'Playfair Display', serif" }}>
          🔥 Trending Now
        </h3>
        <div className="space-y-4">
          {trending.map((article, i) => (
            <div key={article.id} className="flex gap-3 items-start">
              <span className="text-3xl font-bold text-gray-200 dark:text-gray-700 leading-none flex-shrink-0 w-8">
                {i + 1}
              </span>
              <ArticleCard article={article} variant="compact" />
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-primary-900 text-white rounded-xl p-5">
        <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Daily Briefing
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          Get the top 5 tech &amp; business stories every morning.
        </p>
        <NewsletterForm variant="dark" placeholder="your@email.com" buttonText="Subscribe Free" />
      </div>

      {/* Editor's Picks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pb-2 border-b-2 border-primary-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Editor&apos;s Picks
        </h3>
        <div className="space-y-4">
          {editorsPicks.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>

      {/* Ad 2 */}
      <AdSlot id="sidebar-bottom" size="half-page" />

      {/* Follow Us */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Follow Newsvera
        </h3>
        <div className="space-y-2">
          {[
            { name: "Twitter / X", handle: "@newsvera", icon: "𝕏", color: "bg-black", href: "https://twitter.com/newsvera", followers: "24.5K" },
            { name: "Facebook", handle: "Newsvera", icon: "f", color: "bg-blue-600", href: "https://facebook.com/newsvera", followers: "18.2K" },
            { name: "LinkedIn", handle: "Newsvera", icon: "in", color: "bg-blue-700", href: "https://linkedin.com/company/newsvera", followers: "12.8K" },
          ].map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Follow on ${s.name}`}
            >
              <div className={`${s.color} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`}>
                {s.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</p>
                <p className="text-xs text-gray-500">{s.handle}</p>
              </div>
              <span className="text-xs text-gray-400">{s.followers}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
