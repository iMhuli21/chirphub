'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { getCurrentUser } from './getCurrentUser';

export async function checkUserInDb() {
  const { userId } = auth();

  if (!userId) return { error: 'Not Logged In.' };

  try {
    const userExists = await db.user.findUnique({
      where: {
        userId,
      },
    });

    if (!userExists) {
      const user = await getCurrentUser();

      if (!user) return { error: 'Something went wrong trying to get user.' };

      const createUserInDb = await db.user.create({
        data: {
          email: user.emailAddress,
          userId,
          username: user.username as string,
        },
      });

      if (!createUserInDb)
        return {
          error: 'Something went wrong trying to create user in the db.',
        };

      return { success: true };
    }

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
  }
}
