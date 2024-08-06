import db from '@/lib/db';
import { cache } from 'react';
import Post from '@/components/post';
import CreatePost from '@/components/create-post';

const getPosts = cache(async () => {
  const posts = await db.post.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      likes: true,
      retweets: true,
      comments: true,
    },
  });
  return posts;
});

export default async function Feed() {
  const data = await getPosts();
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Home</h1>
        </div>
        <CreatePost />
        <div>
          {data.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        {data.length === 0 && (
          <p className='text-sm tracking-tight font-medium text-center mt-10'>
            No posts available, start posting and fill up the feed.
          </p>
        )}
      </section>
    </>
  );
}
