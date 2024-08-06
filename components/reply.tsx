'use client';
import {
  LikeReply,
  RetweetReply as RetweetReplyType,
  Reply as ReplyType,
} from '@prisma/client';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { likeReply } from '@/actions/likeReply';
import { RetweetReply } from '@/actions/retweetReply';
import { FaHeart, FaRegHeart, FaRetweet } from 'react-icons/fa6';

interface Props {
  reply: {
    likes: LikeReply[];
    retweets: RetweetReplyType[];
  } & ReplyType;
}

export default function Reply({ reply }: Props) {
  const route = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const userLikesReply =
    user && reply.likes.some((like) => like.userId === user.id);

  const userRetweetReply =
    user && reply.retweets.some((retweet) => retweet.userId === user.id);

  const handleLikeReply = async () => {
    try {
      const res = await likeReply(reply.id);

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

  const handleRetweetReply = async () => {
    try {
      const res = await RetweetReply(reply.id);

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
    <div className='py-2 pl-3 pr-2 w-full flex items-start gap-4 border-b hover:cursor-pointer'>
      <Image
        src={reply.authorImage}
        alt='placeholder'
        width={50}
        height={50}
        className='rounded-full object-center'
        priority
      />
      <div className='flex flex-col items-start gap-3'>
        <div className='flex items-center gap-3'>
          <h2 className='font-medium tracking-tight text-sm'>
            {reply.authorUsername}
          </h2>
          <div className='flex items-center gap-1'>
            <span className='text-xs text-gray-500'>
              @{reply.authorUsername}
            </span>
            <div className='flex items-center gap-1 text-xs text-gray-500'>
              <Dot />
              <span>{formatDistanceToNow(reply.createdAt)} ago</span>
            </div>
          </div>
        </div>
        <p className='text-sm'>{reply.message}</p>
        {reply.images.length > 0 && (
          <div className='flex items-center gap-4 flex-wrap'>
            {reply.images.map((image) => (
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
            onClick={handleRetweetReply}
          >
            <FaRetweet
              className={userRetweetReply ? 'size-5 text-sky-500' : 'size-5'}
            />
            <span>{reply.retweets.length}</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={handleLikeReply}
          >
            {userLikesReply ? (
              <FaHeart className='size-4 text-destructive' />
            ) : (
              <FaRegHeart className='size-4' />
            )}
            <span className='font-medium tracking-tight'>
              {reply.likes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
