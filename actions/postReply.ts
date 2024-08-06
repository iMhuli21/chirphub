'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { getCurrentUser } from './getCurrentUser';

export async function postReply(
  content: string,
  imageUrls: string[],
  commentId: string
) {
  try {
    const { userId } = auth();

    if (!userId)
      return {
        error: 'User not logged in.',
      };

    if (!commentId) return { error: 'No comment id provided.' };

    //check if the comment actually exists
    const commentExists = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!commentExists) return { error: 'Comment does not exist' };

    //first check that there actually is data
    if (content.length === 0 && imageUrls.length === 0) {
      return {
        error: 'Cannot create reply due to no content.',
      };
    }

    const user = await getCurrentUser();

    if (!user) {
      return {
        error: 'Something went wrong trying to get user information.',
      };
    }

    //check if the user wants to upload both the images and text
    if (content.length > 0 && imageUrls.length > 0) {
      const createReply = await db.reply.create({
        data: {
          message: content,
          images: imageUrls,
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
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createReply) {
        return {
          error: 'Something went wrong trying to create a reply',
        };
      }

      return {
        success: 'Created reply.',
      };
    }
    //user wants to just reply some text
    else if (content.length > 0) {
      const createRelpy = await db.reply.create({
        data: {
          message: content,
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
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createRelpy) {
        return {
          error: 'Something went wrong trying to create a reply',
        };
      }

      return {
        success: 'Created reply.',
      };
    }
    //user wants to just post some images
    else if (imageUrls.length > 0) {
      const createReply = await db.reply.create({
        data: {
          images: imageUrls,
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
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createReply) {
        return {
          error: 'Something went wrong trying to create a reply',
        };
      }

      return {
        success: 'Created reply.',
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
