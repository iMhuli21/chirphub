import { routes } from '@/lib/constants';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';

export default function Sidebar() {
  return (
    <div className='col-span-6 sm:col-span-1 pt-4 px-2 border-r'>
      {/*Large Screens */}
      <div className='flex flex-col items-start gap-4'>
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
    </div>
  );
}
