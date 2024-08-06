import db from '@/lib/db';
import { cache } from 'react';
import Post from '@/components/post';
import Comment from '@/components/comment';
import CreateComment from '@/components/create-comment';

interface Props {
  params: {
    id: string;
  };
}

const getPost = cache(async (id: string) => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
      retweets: true,
      comments: {
        include: {
          likes: true,
          retweets: true,
          replies: true,
        },
      },
    },
  });

  return post;
});

export default async function ViewPost({ params: { id } }: Props) {
  const post = await getPost(id);

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='font-medium tracking-tight'>Post not found</p>
      </div>
    );
  }

  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Post</h1>
        </div>
        <Post post={post} />
        <CreateComment postId={post.id} />
        <div>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        {post.comments.length === 0 && (
          <p className='text-sm tracking-tight font-medium text-center mt-10'>
            No comments available, start posting and fill up the feed.
          </p>
        )}
      </section>
    </>
  );
}
