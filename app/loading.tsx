export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Skeleton */}
      <header className="relative bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 pt-10 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto text-center">
          {/* Title skeleton */}
          <div className="h-10 sm:h-14 w-72 sm:w-96 mx-auto skeleton-shimmer rounded-xl mb-4" />
          {/* Subtitle skeleton */}
          <div className="h-5 w-56 sm:w-80 mx-auto skeleton-shimmer rounded-lg mb-10" />
          {/* Search bar skeleton */}
          <div className="h-14 sm:h-16 max-w-2xl mx-auto skeleton-shimmer rounded-2xl" />
        </div>
      </header>

      {/* Category Nav Skeleton */}
      <div className="bg-[#232f3e] px-4 py-2 flex items-center gap-2 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-7 rounded-md bg-white/10"
            style={{ width: `${60 + Math.random() * 40}px`, flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Product Grid Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden skeleton-pulse"
            >
              {/* Image placeholder */}
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 skeleton-shimmer" />
              {/* Content placeholder */}
              <div className="p-3 sm:p-5 space-y-3">
                {/* Title lines */}
                <div className="h-4 w-full skeleton-shimmer rounded" />
                <div className="h-4 w-3/4 skeleton-shimmer rounded" />
                {/* Rating */}
                <div className="h-3 w-24 skeleton-shimmer rounded" />
                {/* Spacer */}
                <div className="pt-4">
                  {/* Button */}
                  <div className="h-11 sm:h-12 w-full skeleton-shimmer rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
