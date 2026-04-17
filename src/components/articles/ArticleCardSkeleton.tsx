interface SkeletonProps {
  variant?: "default" | "horizontal" | "featured" | "compact" | "hero";
}

export default function ArticleCardSkeleton({ variant = "default" }: SkeletonProps) {
  if (variant === "hero") {
    return (
      <div className="relative rounded-xl overflow-hidden h-[420px] sm:h-[480px] bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  if (variant === "featured") {
    return (
      <div className="animate-pulse">
        <div className="aspect-video rounded-lg bg-gray-200 dark:bg-gray-700 mb-3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="flex gap-3 animate-pulse">
        <div className="flex-shrink-0 w-24 h-20 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="animate-pulse border-b border-gray-100 dark:border-gray-800 pb-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    );
  }

  // Default
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
      </div>
    </div>
  );
}
