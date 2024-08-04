'use client';

import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Search() {
  const route = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (query.length > 1) {
        route.push(`/search?query=${encodeURIComponent(query)}`);
      }
    }, 1000);

    return () => clearTimeout(debounceFn);
  }, [query, route]);

  return (
    <div
      className={
        pathname === '/search'
          ? 'hidden'
          : 'hidden lg:block lg:col-span-2 xl:col-span-3 row-span-12 pt-4'
      }
    >
      <div className='flex items-center gap-2 border rounded-lg w-full overflow-hidden ml-2'>
        <SearchIcon className='ml-2 size-5 opacity-50' />
        <Input
          placeholder='Search'
          className='border-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
