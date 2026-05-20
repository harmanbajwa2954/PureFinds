import { Suspense } from 'react';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';

// Since searchParams is an async promise in Next.js 15+
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: Props) {
  // Await searchParams in Next.js 15+
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const currentCategory = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : 'All';

  await connectToDatabase();

  // Create query object
  let query: any = {};
  if (q) {
    query.name = { $regex: q, $options: 'i' }; // Case-insensitive search
  }
  if (currentCategory !== 'All') {
    query.category = currentCategory;
  }

  // Fetch products, sort by newest
  const rawProducts = await Product.find(query).sort({ createdAt: -1 }).lean();

  // Serialize for client component to remove Mongoose objects/null prototypes
  const products = JSON.parse(JSON.stringify(rawProducts));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header / Hero Section */}
      <header className="relative bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors">

        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Discover Curated Finds
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Handpicked premium products for your everyday life.
          </p>

          <Suspense fallback={<div className="h-16 max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />}>
            <SearchBar />
          </Suspense>
        </div>
      </header>

      {/* Category Navigation Bar */}
      <CategoryNav currentCategory={currentCategory} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h2>
            <p className="text-gray-500 dark:text-gray-400">We couldn't find anything matching "{q}". Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
