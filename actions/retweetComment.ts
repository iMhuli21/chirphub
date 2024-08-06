'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function RetweetComment(commentId: string) {
  try {
    const { userId } = auth();

    if (!userId) return { error: 'User not logged in.' };

    if (!commentId) return { error: 'No comment id provided.' };

    //find out if there actually is a comment with that id
    const commentExists = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        retweets: true,
      },
    });

    if (!commentExists) return { error: 'Comment does not exist.' };

    //check if the user has already retweet the comment
    const userAlreadyRetweetComment = commentExists.retweets.find(
      (retweet) => retweet.userId === userId
    );

    //if the user has already retweet the comment we unlike it
    if (userAlreadyRetweetComment) {
      const removeRetweet = await db.retweetComment.delete({
        where: {
          id: userAlreadyRetweetComment.id,
        },
      });

      if (!removeRetweet)
        return {
          error: 'Something went wrong trying to remove retweet from comment.',
        };

      return { success: 'Remove retweet from comment.' };
    } else {
      const retweet = await db.retweetComment.create({
        data: {
          author: {
            connect: {
              userId,
            },
          },
          comment: {
            connect: {
              id: commentId,
            },
          },
        },
      });

      if (!retweet)
        return { error: 'Something went wrong trying to retweet comment.' };

      return {
        success: 'Retweet comment',
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
