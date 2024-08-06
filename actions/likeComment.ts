'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function likeComment(commentId: string) {
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
        likes: true,
      },
    });

    if (!commentExists) return { error: 'Comment does not exist.' };

    //check if the user has already liked the comment
    const userAlreadyLikeComment = commentExists.likes.find(
      (like) => like.userId === userId
    );

    //if the user has already liked the comment we unlike it
    if (userAlreadyLikeComment) {
      const unlikeComment = await db.likeComment.delete({
        where: {
          id: userAlreadyLikeComment.id,
        },
      });

      if (!unlikeComment)
        return { error: 'Something went wrong trying to unlike comment' };

      return { success: 'Unliked comment.' };
    } else {
      const like = await db.likeComment.create({
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

      if (!like)
        return { error: 'Something went wrong trying to like comment.' };

      return {
        success: 'Liked comment',
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
