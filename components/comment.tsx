'use client';

import Image from 'next/image';
import { Dot } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa6';
import { likeComment } from '@/actions/likeComment';
import { RetweetComment } from '@/actions/retweetComment';
import {
  Comment as CommentType,
  LikeComment,
  Reply,
  RetweetComment as RetweetCommentType,
} from '@prisma/client';

interface Props {
  comment: {
    likes: LikeComment[];
    retweets: RetweetCommentType[];
    replies: Reply[];
  } & CommentType;
}

export default function Comment({ comment }: Props) {
  const route = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const userLikesComment =
    user && comment.likes.some((like) => like.userId === user.id);

  const userRetweetComment =
    user && comment.retweets.some((retweet) => retweet.userId === user.id);

  const handleLikeComment = async () => {
    try {
      const res = await likeComment(comment.id);

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
    }
  };

  const handleRetweetComment = async () => {
    try {
      const res = await RetweetComment(comment.id);

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
    }
  };
  return (
    <div
      className='py-2 pl-3 pr-2 w-full flex items-start gap-4 border-b hover:cursor-pointer'
      onDoubleClick={() => route.push(`/comment/${comment.id}`)}
    >
      <Image
        src={comment.authorImage}
        alt='user profile image'
        width={50}
        height={50}
        className='rounded-full object-center'
        priority
      />
      <div className='flex flex-col items-start gap-3'>
        <div className='flex items-center gap-3'>
          <h2
            className='font-medium tracking-tight text-sm hover:underline hover:cursor-pointer'
            onClick={() => route.push(`/profile/${comment.authorUsername}`)}
          >
            {comment.authorUsername}
          </h2>
          <div className='flex items-center gap-1'>
            <span className='text-xs text-gray-500'>
              @{comment.authorUsername}
            </span>
            <div className='flex items-center gap-1 text-xs text-gray-500'>
              <Dot />
              <span>{formatDistanceToNow(comment.createdAt)} ago</span>
            </div>
          </div>
        </div>
        <p className='text-sm'>{comment.message}</p>
        {comment.images.length > 0 && (
          <div className='flex items-center gap-4 flex-wrap'>
            {comment.images.map((image) => (
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
            onClick={() => route.push(`/comment/${comment.id}`)}
          >
            <FaRegComment className='size-5' />
            <span>{comment.replies.length}</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={handleRetweetComment}
          >
            <FaRetweet
              className={userRetweetComment ? 'size-5 text-sky-500' : 'size-5'}
            />
            <span>{comment.retweets.length}</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={handleLikeComment}
          >
            {userLikesComment ? (
              <FaHeart className='size-4 text-destructive' />
            ) : (
              <FaRegHeart className='size-4' />
            )}
            <span className='font-medium tracking-tight'>
              {comment.likes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
