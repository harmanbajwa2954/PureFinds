'use client';

import { Search, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center group">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          {isPending ? (
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search curated products..."
          className="block w-full pl-10 sm:pl-12 pr-[4.5rem] sm:pr-28 py-3 sm:py-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-0 focus:shadow-md transition-all text-gray-900 dark:text-white text-base sm:text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        <button 
          type="submit" 
          disabled={isPending}
          className="absolute inset-y-1.5 sm:inset-y-2 right-1.5 sm:right-2 px-3 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 min-w-[44px] sm:min-w-0"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
