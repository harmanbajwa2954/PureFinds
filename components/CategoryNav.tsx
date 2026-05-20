import Link from 'next/link';

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
  return (
    <div className="bg-[#232f3e] text-white overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center px-4 py-2 text-sm shadow-md">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`}
          className={`px-3 py-1 mx-1 rounded-[3px] border border-transparent hover:border-white transition-colors duration-150 ${
            currentCategory === cat ? 'font-bold' : ''
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
