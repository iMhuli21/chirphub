import { routes } from '@/lib/constants';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';

export default function Sidebar() {
  return (
    <div className='col-span-12 sm:col-span-1 lg:col-span-2 pt-4 border-r row-span-1 sm:row-span-12'>
      {/*Large Screens */}
      <div className='hidden lg:flex flex-col items-start gap-4'>
        <FaXTwitter size={30} className='ml-2' />
        <ul className='flex flex-col items-start gap-2'>
          {routes.map((route) => (
            <li key={route.href} className='p-2 w-full '>
              <Link
                href={route.href}
                className='flex items-end gap-2 hover:opacity-50 transition-opacity duration-300 ease-in-out'
              >
                <route.icon size={25} />
                <span className='text-sm tracking-tight'>{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='hidden sm:flex lg:hidden flex-col items-start gap-4 w-full'>
        <FaXTwitter size={30} className='ml-2' />
        <ul className='flex flex-col items-start gap-2'>
          {routes.map((route) => (
            <li key={route.href} className='p-2 w-full '>
              <Link
                href={route.href}
                className='flex items-end gap-2 hover:opacity-50 transition-opacity duration-300 ease-in-out'
              >
                <route.icon size={25} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='block sm:hidden '>
        <Menu />
      </div>
    </div>
  );
}
