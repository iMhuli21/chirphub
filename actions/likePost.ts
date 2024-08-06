'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function likePost(postId: string) {
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
        likes: true,
      },
    });

    if (!postExists) return { error: 'Post does not exist.' };

    //check if the user has already liked the post
    const userAlreadyLikePost = postExists.likes.find(
      (like) => like.userId === userId
    );

    //if the user has already liked the post we unlike it
    if (userAlreadyLikePost) {
      const unlikePost = await db.likePost.delete({
        where: {
          id: userAlreadyLikePost.id,
        },
      });

      if (!unlikePost)
        return { error: 'Something went wrong trying to unlike post' };

      return { success: 'Unliked post.' };
    } else {
      const likePost = await db.likePost.create({
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

      if (!likePost)
        return { error: 'Something went wrong trying to like post.' };

      return {
        success: 'Liked Post',
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
