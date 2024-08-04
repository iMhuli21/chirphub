'use client';

import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import Post from '@/components/post';

export default function SearchResults() {
  const route = useRouter();
  const [query, setQuery] = useState('');
  const [data, setData] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (query.length > 1) {
        route.push(`/search?query=${encodeURIComponent(query)}`);
      }
    }, 1000);

    return () => clearTimeout(debounceFn);
  }, [query, route]);

  useEffect(() => {
    if (searchParams) {
      if (searchParams.get('query')) {
        setData(true);
      }
    }
  }, [searchParams]);

  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Search</h1>
        </div>
        <div className='px-2'>
          <div className='flex items-center gap-2 border rounded-lg w-full overflow-hidden mt-4'>
            <SearchIcon className='ml-2 size-5 opacity-50' />
            <Input
              placeholder='Search'
              className='border-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {data && (
          <div className='mt-5'>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        )}
      </section>
    </>
  );
}
