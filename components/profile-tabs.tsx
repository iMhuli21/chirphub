'use client';

import { profileTabs } from '@/lib/constants';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function ProfileTabs() {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <ul className='flex items-center gap-4 justify-between overflow-x-auto overflow-y-hidden mt-4 px-3 text-sm tracking-tight'>
      {profileTabs.map((tab) => (
        <li
          className={
            !searchParams.get('tab') && tab === 'posts'
              ? 'p-2 active-tab'
              : searchParams.get('tab') === tab
              ? 'capitalize hover:cursor-pointer p-2 active-tab'
              : 'capitalize hover:cursor-pointer p-2 hover-tab opacity-50'
          }
          key={tab}
          onClick={() => route.push(`${pathname}?tab=${tab}`)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
}
