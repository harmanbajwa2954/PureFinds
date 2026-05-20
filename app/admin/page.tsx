'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { IVariant } from '@/models/Product';

export default function AdminPage() {
  const [url, setUrl] = useState('');
  const [asin, setAsin] = useState('');
  const [name, setName] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [variants, setVariants] = useState<IVariant[]>([
    { name: 'Default', asin: '', url: '', isDefault: true }
  ]);

  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  // Extract ASIN when URL changes
  useEffect(() => {
    if (url) {
      const regex = /(?:dp|o|asins|i)\/([A-Z0-9]{10})/i;
      const match = url.match(regex);
      if (match && match[1]) {
        const extractedAsin = match[1];
        setAsin(extractedAsin);

        // Auto-update the default variant if it's empty
        setVariants(prev => {
          const newVariants = [...prev];
          if (newVariants[0] && !newVariants[0].asin) {
            newVariants[0].asin = extractedAsin;
            newVariants[0].url = `https://www.amazon.com/dp/${extractedAsin}?tag=your_affiliate_tag-20`;
          }
          return newVariants;
        });
      }
    }
  }, [url]);

  const handleAddVariant = () => {
    setVariants([...variants, { name: '', asin: '', url: '', isDefault: false }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, field: keyof IVariant, value: any) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };

    // Ensure only one default variant
    if (field === 'isDefault' && value === true) {
      newVariants.forEach((v, i) => {
        if (i !== index) v.isDefault = false;
      });
    }

    setVariants(newVariants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asin || !name || !mainImage) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Saving product to database...' });

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          mainAsin: asin,
          mainImage,
          variants
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add product');
      }

      setStatus({ type: 'success', message: `Product "${data.product.name}" added successfully!` });

      // Reset form
      setUrl('');
      setAsin('');
      setName('');
      setMainImage('');
      setVariants([{ name: 'Default', asin: '', url: '', isDefault: true }]);

    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1">
            &larr; Back to Home
          </a>
          <button onClick={handleLogout} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            Logout
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Add Product</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 text-center">
            Since the Amazon PA-API is not connected yet, paste the URL to extract the ASIN, then fill in the rest of the product details manually.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Amazon URL (Auto-extracts ASIN)
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.amazon.com/dp/B08N5WRWNW"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="asin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Main ASIN *
                </label>
                <input
                  type="text"
                  id="asin"
                  value={asin}
                  onChange={(e) => setAsin(e.target.value)}
                  placeholder="B08N5WRWNW"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Apple MacBook Air M1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Main Image URL *
                </label>
                <input
                  type="url"
                  id="mainImage"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  placeholder="https://m.media-amazon.com/images/I/..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Variants</h3>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Variant
                </button>
              </div>

              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 relative">
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(index)}
                        className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Variant Name</label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                          placeholder="e.g., Space Gray, 256GB"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Variant ASIN</label>
                        <input
                          type="text"
                          value={variant.asin}
                          onChange={(e) => handleVariantChange(index, 'asin', e.target.value)}
                          placeholder="ASIN"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Affiliate URL</label>
                        <input
                          type="url"
                          value={variant.url}
                          onChange={(e) => handleVariantChange(index, 'url', e.target.value)}
                          placeholder="https://www.amazon.com/dp/..."
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-center mt-2">
                        <input
                          type="radio"
                          id={`default-${index}`}
                          name="defaultVariant"
                          checked={variant.isDefault}
                          onChange={() => handleVariantChange(index, 'isDefault', true)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                        />
                        <label htmlFor={`default-${index}`} className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                          Set as default variant
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
            >
              {status.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {status.type === 'loading' ? 'Processing...' : 'Save Product'}
            </button>
          </form>

          {status.type !== 'idle' && (
            <div
              className={`mt-6 p-4 rounded-xl text-sm ${status.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
