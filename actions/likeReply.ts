'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function likeReply(replyId: string) {
  try {
    const { userId } = auth();

    if (!userId) return { error: 'User not logged in.' };

    if (!replyId) return { error: 'No comment id provided.' };

    //find out if there actually is a reply with that id
    const replyExists = await db.reply.findUnique({
      where: {
        id: replyId,
      },
      include: {
        likes: true,
      },
    });

    if (!replyExists) return { error: 'Reply does not exist.' };

    //check if the user has already liked the reply
    const userAlreadyLikeReply = replyExists.likes.find(
      (like) => like.userId === userId
    );

    //if the user has already liked the reply we unlike it
    if (userAlreadyLikeReply) {
      const unlikeReply = await db.likeReply.delete({
        where: {
          id: userAlreadyLikeReply.id,
        },
      });

      if (!unlikeReply)
        return { error: 'Something went wrong trying to unlike reply' };

      return { success: 'Unliked reply.' };
    } else {
      const reply = await db.likeReply.create({
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

      if (!reply)
        return { error: 'Something went wrong trying to like reply.' };

      return {
        success: 'Liked reply',
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
