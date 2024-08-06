'use server';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { getCurrentUser } from './getCurrentUser';

export async function postTweet(content: string, imageUrls: string[]) {
  try {
    const { userId } = auth();

    if (!userId)
      return {
        error: 'User not logged in.',
      };

    //first check that there actually is data
    if (content.length === 0 && imageUrls.length === 0) {
      return {
        error: 'Cannot create post due to no content.',
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
      const createPost = await db.post.create({
        data: {
          message: content,
          images: imageUrls,
          author: {
            connect: {
              userId,
            },
          },
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createPost) {
        return {
          error: 'Something went wrong trying to create a post',
        };
      }

      return {
        success: 'Created Post.',
      };
    }
    //user wants to just post some text
    else if (content.length > 0) {
      const createPost = await db.post.create({
        data: {
          message: content,
          author: {
            connect: {
              userId,
            },
          },
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createPost) {
        return {
          error: 'Something went wrong trying to create a post',
        };
      }

      return {
        success: 'Created Post.',
      };
    }
    //user wants to just post some images
    else if (imageUrls.length > 0) {
      const createPost = await db.post.create({
        data: {
          images: imageUrls,
          author: {
            connect: {
              userId,
            },
          },
          authorImage: user.imageUrl,
          authorUsername: user.username as string,
        },
      });

      if (!createPost) {
        return {
          error: 'Something went wrong trying to create a post',
        };
      }

      return {
        success: 'Created Post.',
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
