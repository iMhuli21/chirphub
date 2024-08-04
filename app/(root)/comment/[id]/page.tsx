import React from 'react';
import Reply from '@/components/reply';
import Comment from '@/components/comment';
import CreateReply from '@/components/create-reply';

interface Props {
  params: {
    id: string;
  };
}

export default function ViewComment({ params: { id } }: Props) {
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Comment</h1>
        </div>
        <Comment />
        <CreateReply />
        <div>
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
          <Reply />
        </div>
      </section>
    </>
  );
}
