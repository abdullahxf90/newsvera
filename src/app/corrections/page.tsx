import Link from "next/link";
import type { Metadata } from "next";
import { corrections } from "@/lib/data/corrections";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Corrections & Clarifications", description: "A transparent record of corrections and clarifications to Newsvera articles." };

export default function CorrectionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Corrections
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Corrections &amp; Clarifications</h1>
      <div className="bg-accent-50 dark:bg-gray-800 border-l-4 border-accent-500 p-4 rounded-r-xl mb-8">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          Newsvera is committed to accuracy. When we make errors, we correct them promptly and openly. This page maintains a public record of all significant corrections and clarifications made to our published articles. If you believe you have found an error in our reporting, please <Link href="/contact" className="text-primary-900 dark:text-accent-400 hover:underline font-medium">contact us</Link>.
        </p>
      </div>

      {corrections.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No corrections on record.</p>
      ) : (
        <div className="space-y-6">
          {corrections.map((correction, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded uppercase mr-2">Correction</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(correction.date)}</span>
                </div>
              </div>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-1">
                <Link href={`/article/${correction.articleSlug}`} className="hover:text-primary-900 dark:hover:text-accent-400 transition-colors">
                  {correction.articleTitle}
                </Link>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{correction.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">Corrected by: {correction.correctedBy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
