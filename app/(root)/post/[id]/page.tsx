import db from '@/lib/db';
import Post from '@/components/post';
import Comment from '@/components/comment';
import CreateComment from '@/components/create-comment';

interface Props {
  params: {
    id: string;
  };
}

export default async function ViewPost({ params: { id } }: Props) {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
      retweets: true,
    },
  });

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
