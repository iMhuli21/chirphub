'use client';

import { User as UserType } from '@prisma/client';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchAccount } from '@/actions/searchAccount';
import User from '@/components/user';

export default function SearchResults() {
  const route = useRouter();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<UserType[]>([]);
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
        const fetchData = async () => {
          const query = searchParams.get('query') as string;

          const res = await searchAccount(query);

          if (res?.error) {
            toast({
              title: 'Error',
              description: res.error,
              variant: 'destructive',
              className: 'font-medium tracking-tight',
            });
          }

          if (res?.users) {
            setData(res.users);
          }
        };

        fetchData();
      }
    }
  }, [searchParams, toast]);

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
        {data.length > 0 && (
          <div className='mt-5 pl-3 space-y-2'>
            {data.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </div>
        )}
        {data.length === 0 && searchParams.get('query') && (
          <p className='flex items-center justify-center tracking-tight font-medium mt-5'>
            User not found
          </p>
        )}
      </section>
    </>
  );
}
