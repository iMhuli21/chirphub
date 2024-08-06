import db from '@/lib/db';
import { cache } from 'react';
import { getCurrentUser } from '@/actions/getCurrentUser';
import ImageDialog from '@/components/ImageDialog';
import ProfileTabs from '@/components/profile-tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import Post from '@/components/post';
import Comment from '@/components/comment';
import Reply from '@/components/reply';

interface Props {
  params: {
    username: string;
  };
  searchParams: {
    tab: string | undefined;
  };
}

const getUserData = cache(async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      commentLikes: {
        include: {
          comment: {
            include: {
              likes: true,
              replies: true,
              retweets: true,
            },
          },
        },
      },
      commentRetweets: {
        include: {
          comment: {
            include: {
              likes: true,
              replies: true,
              retweets: true,
            },
          },
        },
      },
      comments: {
        include: {
          likes: true,
          replies: true,
          retweets: true,
        },
      },
      postLikes: {
        include: {
          post: {
            include: {
              comments: true,
              likes: true,
              retweets: true,
            },
          },
        },
      },
      postRetweets: {
        include: {
          post: {
            include: {
              comments: true,
              likes: true,
              retweets: true,
            },
          },
        },
      },
      posts: {
        include: {
          comments: true,
          likes: true,
          retweets: true,
        },
      },
      replies: {
        include: {
          likes: true,
          retweets: true,
        },
      },
      replyLikes: {
        include: {
          reply: {
            include: {
              likes: true,
              retweets: true,
            },
          },
        },
      },
      replyRetweets: {
        include: {
          reply: {
            include: {
              likes: true,
              retweets: true,
            },
          },
        },
      },
    },
  });

  return user;
});

export default async function Profile({
  params: { username },
  searchParams: { tab },
}: Props) {
  const user = await getUserData(username);

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='font-medium tracking-tight'>User not found</p>
      </div>
    );
  }
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex flex-col items-start'>
          <h1 className='text-lg font-medium tracking-tight'>@{username}</h1>
          <span className='text-sm'>{user.posts.length} Posts</span>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://utfs.io/f/0e29781c-e820-4d36-8c43-d3cb8009004f-n3ch5g.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='w-full relative h-[200px]'
        >
          <ImageDialog imageUrl={user.imageUrl} />
        </div>
        <div className='mt-4 w-full'>
          <div className='flex items-center justify-end pr-5'>
            <Button variant={'outline'} className='rounded-full'>
              Edit Profile
            </Button>
          </div>
          <div className='pl-3 flex flex-col items-start gap-2'>
            <h2 className='font-medium'>@{username}</h2>
            <div className='flex items-end gap-2 text-sm opacity-50'>
              <CalendarDays />
              <span>Joined {format(user.createdAt, 'MMMM, do yyyy')}</span>
            </div>
          </div>
        </div>
        <ProfileTabs />
        <div className='mt-5'>
          {/*POSTS */}
          {!tab && (
            <div>
              {user.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
          {tab === 'posts' && (
            <div>
              {user.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
          {/*Comments */}
          {tab === 'comments' && (
            <div>
              {user.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
          {/*Replies */}
          {tab === 'replies' && (
            <div>
              {user.replies.map((reply) => (
                <Reply key={reply.id} reply={reply} />
              ))}
            </div>
          )}
          {/*LIKES */}
          {tab === 'likes' && (
            <div>
              {user.commentLikes.map((comment) => (
                <Comment key={comment.id} comment={comment.comment} />
              ))}
              {user.postLikes.map((post) => (
                <Post key={post.id} post={post.post} />
              ))}
              {user.replyLikes.map((reply) => (
                <Reply key={reply.id} reply={reply.reply} />
              ))}
            </div>
          )}
          {/*Retweets */}
          {tab === 'retweets' && (
            <div>
              {user.commentRetweets.map((comment) => (
                <Comment key={comment.id} comment={comment.comment} />
              ))}
              {user.postRetweets.map((post) => (
                <Post key={post.id} post={post.post} />
              ))}
              {user.replyRetweets.map((reply) => (
                <Reply key={reply.id} reply={reply.reply} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
