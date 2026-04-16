import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div
        className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        404
      </div>
      <h1
        className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/search"
          className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Search Articles
        </Link>
        <Link
          href="/archive"
          className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Browse Archive
        </Link>
      </div>
    </div>
  );
}
