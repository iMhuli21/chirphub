import db from '@/lib/db';
import { cache } from 'react';
import Reply from '@/components/reply';
import Comment from '@/components/comment';
import CreateReply from '@/components/create-reply';

interface Props {
  params: {
    id: string;
  };
}

const getComment = cache(async (id: string) => {
  const comment = await db.comment.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
      retweets: true,
      replies: {
        include: {
          likes: true,
          retweets: true,
        },
      },
    },
  });
  return comment;
});

export default async function ViewComment({ params: { id } }: Props) {
  const comment = await getComment(id);

  if (!comment) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='font-medium tracking-tight'>Comment not found</p>
      </div>
    );
  }

  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Comment</h1>
        </div>
        <Comment comment={comment} />
        <CreateReply commentId={comment.id} />
        <div>
          {comment.replies.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </div>
        {comment.replies.length === 0 && (
          <p className='text-sm tracking-tight font-medium text-center mt-10'>
            No replies available, start posting and fill up the feed.
          </p>
        )}
      </section>
    </>
  );
}
