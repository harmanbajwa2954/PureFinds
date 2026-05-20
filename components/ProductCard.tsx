'use client';

import { useState } from 'react';
import { IVariant } from '@/models/Product';
import { ExternalLink, Check, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    mainAsin: string;
    mainImage: string;
    variants: IVariant[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // Find the default variant or fallback to the first one
  const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];

  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(defaultVariant || null);

  // If there are no variants, we can't render properly (or we could fallback)
  if (!selectedVariant) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden">

      {/* Image Container */}
      <div className="relative aspect-square bg-[#f7f7f7] dark:bg-gray-300 flex items-center justify-center p-4">
        <img
          src={product.mainImage}
          alt={product.name}
          className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Title */}
        <h2 className="text-[15px] leading-5 font-medium text-[#007185] dark:text-[#52a9bc] hover:text-[#c45500] dark:hover:text-[#e47911] line-clamp-2 mb-1 cursor-pointer transition-colors">
          {product.name}
        </h2>
        
        {/* Dummy Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-[#FFA41C] text-sm">
            ★★★★<span className="text-gray-300 dark:text-gray-600">★</span>
          </div>
          <span className="text-xs text-[#007185] dark:text-[#52a9bc] hover:text-[#c45500] dark:hover:text-[#e47911] cursor-pointer">
            1,234
          </span>
        </div>


        {/* Variants Selection */}
        {product.variants.length > 1 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Select Variant
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.asin}
                  onClick={() => setSelectedVariant(variant)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 border-2 overflow-hidden ${selectedVariant.asin === variant.asin
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {selectedVariant.asin === variant.asin && <Check className="w-3.5 h-3.5" />}
                    {variant.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spacer to push button to bottom if content is short */}
        <div className="flex-grow" />

        {/* Action Button */}
        <a
          href={selectedVariant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-[#FFD814] hover:bg-[#F7CA00] dark:bg-[#FFD814] dark:hover:bg-[#F7CA00] border border-[#FCD200] hover:border-[#F2C200] text-gray-900 text-sm font-medium py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          View on Amazon
          <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
        </a>
      </div>
    </div>
  );
}
