'use server';

import db from '@/lib/db';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getCurrentUser } from './getCurrentUser';

export async function updateUsername(username: string) {
  try {
    const { userId } = auth();

    if (!userId)
      return {
        error: 'User not logged in.',
      };

    if (username.length === 0) {
      return {
        error: 'Content Invalid',
      };
    }

    const user = await getCurrentUser();

    if (!user)
      return { error: 'Something went wrong trying to get user information' };

    if (user.username?.toLowerCase() === username.toLowerCase()) {
      return {
        error: 'Cannot update username to already existing name',
      };
    }

    const params = { username: username.toLowerCase() };

    //updates on clerk side, and db
    const updateUsernameClerk = await clerkClient.users.updateUser(
      userId,
      params
    );

    if (!updateUsernameClerk) {
      return {
        error: 'Something went wrong trying to update username on clerk side',
      };
    } else {
      const updateUsernameDb = await db.user.update({
        where: {
          userId,
        },
        data: {
          username: username.toLowerCase(),
        },
      });

      if (!updateUsernameDb) {
        return {
          error: 'Something went wrong trying to update username on db side',
        };
      }

      return {
        success: 'Successfully updated username.',
      };
    }
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
  }
}
