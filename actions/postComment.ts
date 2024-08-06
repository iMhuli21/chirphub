'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { getCurrentUser } from './getCurrentUser';

export async function postComment(
  content: string,
  imageUrls: string[],
  postId: string
) {
  try {
    const { userId } = auth();

    if (!userId)
      return {
        error: 'User not logged in.',
      };

    if (!postId) return { error: 'No post id provided.' };

    //check if the post actually exists
    const postExists = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postExists) return { error: 'Post does not exist' };

    //first check that there actually is data
    if (content.length === 0 && imageUrls.length === 0) {
      return {
        error: 'Cannot create comment due to no content.',
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
      const createComment = await db.comment.create({
        data: {
          message: content,
          images: imageUrls,
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
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createComment) {
        return {
          error: 'Something went wrong trying to create a comment',
        };
      }

      return {
        success: 'Created comment.',
      };
    }
    //user wants to just comment some text
    else if (content.length > 0) {
      const createComment = await db.comment.create({
        data: {
          message: content,
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
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createComment) {
        return {
          error: 'Something went wrong trying to create a comment',
        };
      }

      return {
        success: 'Created comment.',
      };
    }
    //user wants to just post some images
    else if (imageUrls.length > 0) {
      const createComment = await db.comment.create({
        data: {
          images: imageUrls,
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
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createComment) {
        return {
          error: 'Something went wrong trying to create a comment',
        };
      }

      return {
        success: 'Created comment.',
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
