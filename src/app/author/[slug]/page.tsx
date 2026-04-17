import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { authors, getAuthorBySlug } from "@/lib/data/authors";
import { getArticlesByAuthor } from "@/lib/data/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import { siteConfig } from "@/../../config/site";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug);
  if (!author) return { title: "Not Found" };
  return {
    title: `${author.name} — ${author.title}`,
    description: author.shortBio,
    alternates: { canonical: `${siteConfig.url}/author/${params.slug}` },
  };
}

export const revalidate = 60;

export default async function AuthorPage({ params }: Props) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const authorArticles = await getArticlesByAuthor(author.id);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    image: author.avatar,
    url: `${siteConfig.url}/author/${author.slug}`,
    sameAs: [author.twitter, author.linkedin].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Author Header */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-2xl p-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Image
              src={author.avatar}
              alt={author.name}
              width={120}
              height={120}
              className="rounded-full object-cover ring-4 ring-accent-500 flex-shrink-0"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {author.name}
              </h1>
              <p className="text-accent-400 font-medium mb-1">{author.title}</p>
              <p className="text-gray-400 text-sm mb-3 italic">{author.credentials}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {author.expertise.map((e) => (
                  <span key={e} className="bg-primary-800 text-gray-300 text-xs px-2 py-0.5 rounded-full">{e}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">𝕏 Twitter</a>
                )}
                {author.linkedin && (
                  <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">LinkedIn</a>
                )}
                {author.email && (
                  <a href={`mailto:${author.email}`} className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Email</a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="prose dark:prose-invert max-w-none mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>About {author.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{author.bio}</p>
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 border-l-4 border-accent-500 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Articles by {author.name} ({authorArticles.length})
          </h2>
          {authorArticles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No articles published yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {authorArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
