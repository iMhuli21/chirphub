'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dot } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { likePost } from '@/actions/likePost';
import { formatDistanceToNow } from 'date-fns';
import { FaRegComment, FaHeart, FaRegHeart, FaRetweet } from 'react-icons/fa6';
import { RetweetPost } from '@/actions/retweetPost';

interface Props {
  post: {
    likes: {
      id: string;
      userId: string;
      postId: string;
    }[];
    retweets: {
      id: string;
      userId: string;
      postId: string;
    }[];
  } & {
    id: string;
    message: string | null;
    images: string[];
    authorId: string;
    authorImage: string;
    authorUsername: string;
    createdAt: Date;
  };
}

export default function Post({ post }: Props) {
  const route = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const userLikesPost =
    user && post.likes.some((like) => like.userId === user.id);

  const userRetweetPost =
    user && post.retweets.some((retweet) => retweet.userId === user.id);

  const handleLikePost = async () => {
    try {
      setLoading(true);
      const res = await likePost(post.id);

      if (res?.error) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
          className: 'font-medium tracking-tight',
        });
      } else {
        toast({
          title: 'Success',
          description: res?.success,
          className: 'font-medium tracking-tight',
        });

        route.refresh();
      }
    } catch (e) {
      if (e instanceof Error) {
        return {
          error: e.message,
        };
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetweetPost = async () => {
    try {
      setLoading(true);
      const res = await RetweetPost(post.id);

      if (res?.error) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
          className: 'font-medium tracking-tight',
        });
      } else {
        toast({
          title: 'Success',
          description: res?.success,
          className: 'font-medium tracking-tight',
        });

        route.refresh();
      }
    } catch (e) {
      if (e instanceof Error) {
        return {
          error: e.message,
        };
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className='py-2 pl-3 pr-2 w-full flex items-start gap-4 border-b hover:cursor-pointer'
      onDoubleClick={() => route.push(`/post/${post.id}`)}
    >
      <Image
        src={post.authorImage}
        alt='post author image'
        width={40}
        height={40}
        className='rounded-full object-cover'
        priority
      />
      <div className='flex flex-col items-start gap-3'>
        <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3'>
          <h2
            className='font-medium tracking-tight text-sm hover:underline hover:cursor-pointer'
            onClick={() => route.push(`/profile/${post.authorUsername}`)}
          >
            {post.authorUsername}
          </h2>
          <div className='flex items-center gap-1'>
            <span className='text-xs text-gray-500'>
              @{post.authorUsername}
            </span>
            <div className='flex items-center gap-1 text-xs text-gray-500'>
              <Dot />
              <span>{formatDistanceToNow(post.createdAt)} ago</span>
            </div>
          </div>
        </div>
        <p className='text-sm'>{post.message}</p>
        {post.images.length > 0 && (
          <div className='flex items-center gap-4 flex-wrap'>
            {post.images.map((image) => (
              <Image
                key={image}
                src={image}
                alt='media post image'
                width={150}
                height={150}
                className='w-[250px] h-[150px] object-cover rounded hover:cursor-pointer'
                priority
              />
            ))}
          </div>
        )}
        <div className='flex items-center gap-10 pb-1 pt-2'>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={() => route.push(`/post/${post.id}`)}
          >
            <FaRegComment className='size-4' />
            <span>0</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={handleRetweetPost}
          >
            <FaRetweet
              className={userRetweetPost ? 'size-5 text-sky-500' : 'size-5'}
            />
            <span>{post.retweets.length}</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={handleLikePost}
          >
            {userLikesPost ? (
              <FaHeart className='size-4 text-destructive' />
            ) : (
              <FaRegHeart className='size-4' />
            )}
            <span>{post.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
