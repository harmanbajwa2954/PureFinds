'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const categories = [
  'All',
  'Electronics',
  'Home & Kitchen',
  'Clothing',
  'Books',
  'Toys & Games',
  'Health & Beauty',
  'Other'
];

export default function CategoryNav({ currentCategory = 'All' }: { currentCategory?: string }) {
  const [isPending, startTransition] = useTransition();
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const router = useRouter();

  const handleCategoryClick = (cat: string, e: React.MouseEvent) => {
    e.preventDefault();
    setPendingCategory(cat);
    const href = cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`;
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="relative bg-[#232f3e] text-white shadow-md">
      {/* Scroll fade indicators for mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#232f3e] to-transparent z-10 pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#232f3e] to-transparent z-10 pointer-events-none sm:hidden" />

      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap flex items-center px-4 py-2 text-sm gap-1">
        {categories.map((cat) => {
          const isActive = currentCategory === cat;
          const isLoading = isPending && pendingCategory === cat;

          return (
            <a
              key={cat}
              href={cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`}
              onClick={(e) => handleCategoryClick(cat, e)}
              className={`px-3 py-1.5 rounded-[3px] border transition-all duration-150 flex items-center gap-1.5 flex-shrink-0 min-h-[34px] active:bg-white/20 ${
                isActive
                  ? 'font-bold bg-white/15 border-white/40'
                  : 'border-transparent hover:border-white/50'
              }`}
            >
              {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              {cat}
            </a>
          );
        })}
      </div>
    </div>
  );
}
