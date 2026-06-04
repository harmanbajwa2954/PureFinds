'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  // Detect route changes by watching pathname + searchParams
  useEffect(() => {
    // When the route finishes loading, hide the bar
    setIsNavigating(false);
  }, [pathname, searchParams]);

  // Show the bar on click of any internal link
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !anchor.hasAttribute('target') &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        setIsNavigating(true);
      }
    };

    // Also capture form submissions (search)
    const handleSubmit = () => {
      setIsNavigating(true);
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, []);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-blue-100/30 dark:bg-blue-900/30 overflow-hidden">
      <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 nav-progress-bar rounded-full" />
    </div>
  );
}
