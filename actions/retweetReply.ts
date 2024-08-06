'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function RetweetReply(replyId: string) {
  try {
    const { userId } = auth();

    if (!userId) return { error: 'User not logged in.' };

    if (!replyId) return { error: 'No reply id provided.' };

    //find out if there actually is a comment with that id
    const replyExists = await db.reply.findUnique({
      where: {
        id: replyId,
      },
      include: {
        retweets: true,
      },
    });

    if (!replyExists) return { error: 'Reply does not exist.' };

    //check if the user has already retweet the reply
    const userAlreadyRetweetReply = replyExists.retweets.find(
      (retweet) => retweet.userId === userId
    );

    //if the user has already retweet the reply we unlike it
    if (userAlreadyRetweetReply) {
      const removeRetweet = await db.retweetReply.delete({
        where: {
          id: userAlreadyRetweetReply.id,
        },
      });

      if (!removeRetweet)
        return {
          error: 'Something went wrong trying to remove retweet from reply.',
        };

      return { success: 'Remove retweet from reply.' };
    } else {
      const retweet = await db.retweetReply.create({
        data: {
          author: {
            connect: {
              userId,
            },
          },
          reply: {
            connect: {
              id: replyId,
            },
          },
        },
      });

      if (!retweet)
        return { error: 'Something went wrong trying to retweet reply.' };

      return {
        success: 'Retweet reply',
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
