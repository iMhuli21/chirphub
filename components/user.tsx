'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdVerified } from 'react-icons/md';
import { User as UserType } from '@prisma/client';

interface Props {
  user: UserType;
}

export default function User({ user }: Props) {
  const route = useRouter();
  return (
    <div
      className='border p-2 w-full max-w-xs rounded flex items-center gap-4 hover:cursor-pointer hover:bg-secondary transition-colors duration-200 ease-in-out'
      onClick={() => route.push(`/profile/${user.username}`)}
    >
      <Image
        src={user.imageUrl}
        alt='user profile'
        width={40}
        height={40}
        className='object-cover rounded-full'
      />
      <div className='flex items-center gap-2'>
        <p className='text-lg tracking-tight font-medium'>{user.username}</p>
        <MdVerified className='size-5 text-sky-500' />
      </div>
    </div>
  );
}
