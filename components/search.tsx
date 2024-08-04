import React from 'react';
import { Input } from './ui/input';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <div className='hidden lg:block lg:col-span-2 xl:col-span-3 row-span-12 pt-4'>
      <div className='flex items-center gap-2 border rounded-lg w-full overflow-hidden ml-2'>
        <SearchIcon className='ml-2 size-5 opacity-50' />
        <Input
          placeholder='Search'
          className='border-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0'
        />
      </div>
    </div>
  );
}
