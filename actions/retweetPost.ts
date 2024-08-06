'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function RetweetPost(postId: string) {
  try {
    const { userId } = auth();

    if (!userId) return { error: 'User not logged in.' };

    if (!postId) return { error: 'No post id provided.' };

    //find out if there actually is a post with that id
    const postExists = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        retweets: true,
      },
    });

    if (!postExists) return { error: 'Post does not exist.' };

    //check if the user has already retweet the post
    const userAlreadyRetweetPost = postExists.retweets.find(
      (retweet) => retweet.userId === userId
    );

    //if the user has already retweet the post we unlike it
    if (userAlreadyRetweetPost) {
      const removeRetweet = await db.retweetPost.delete({
        where: {
          id: userAlreadyRetweetPost.id,
        },
      });

      if (!removeRetweet)
        return {
          error: 'Something went wrong trying to remove retweet from post.',
        };

      return { success: 'Remove retweet from post.' };
    } else {
      const retweet = await db.retweetPost.create({
        data: {
          author: {
            connect: {
              userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });

      if (!retweet)
        return { error: 'Something went wrong trying to retweet post.' };

      return {
        success: 'Retweet Post',
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
