'use server';

import db from '@/lib/db';

export async function searchAccount(query: string) {
  try {
    if (query.length === 0)
      return { error: 'Cannot complete search due to no search query' };

    const searchUser = await db.user.findMany({
      where: {
        username: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    if (!searchUser)
      return { error: 'Something went wrong trying to find user.' };

    return {
      users: searchUser,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
  }
}
