import React from 'react';
import Post from '@/components/post';
import Comment from '@/components/comment';
import CreateComment from '@/components/create-comment';

interface Props {
  params: {
    id: string;
  };
}

export default function ViewPost({ params: { id } }: Props) {
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Post</h1>
        </div>
        <Post />
        <CreateComment />
        <div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </section>
    </>
  );
}
