import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetContent,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { routes } from '@/lib/constants';
import { getCurrentUser } from '@/actions/getCurrentUser';

export default async function MobileNav() {
  const user = await getCurrentUser();

  if (!user) return null;
  return (
    <div className='block sm:hidden '>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>Mobile Nav</SheetTitle>
            <SheetDescription>Navigate to any page you want</SheetDescription>
          </SheetHeader>
          <div className='py-4'>
            <ul className='flex flex-col items-start gap-2'>
              {routes.map((route) => (
                <li key={route.href} className='p-2 w-full '>
                  <Link
                    href={
                      route.href === '/profile'
                        ? `/profile/${user.username}`
                        : route.href
                    }
                    className='flex items-end gap-2 hover:opacity-50 transition-opacity duration-300 ease-in-out'
                  >
                    <route.icon size={25} />
                    <span className='text-sm tracking-tight'>
                      {route.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
