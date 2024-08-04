import { EmailAddress } from '@clerk/nextjs/server';
import { LuBell, LuHome, LuSearch, LuSettings, LuUser2 } from 'react-icons/lu';

export const routes = [
  {
    href: '/home',
    label: 'Home',
    icon: LuHome,
  },
  {
    href: '/search',
    label: 'Search',
    icon: LuSearch,
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: LuBell,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: LuUser2,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: LuSettings,
  },
];

export type User = {
  imageUrl: string;
  username: string | null;
  emailAddress: string;
};
