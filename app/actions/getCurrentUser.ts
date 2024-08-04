'use server';

import { User } from '@/lib/constants';
import { currentUser } from '@clerk/nextjs/server';

export async function getCurrentUser(): Promise<User | null> {
  const user = await currentUser();

  if (!user) return null;

  return {
    username: user.username,
    emailAddress: user.emailAddresses[0].emailAddress,
    imageUrl: user.imageUrl,
  };
}
