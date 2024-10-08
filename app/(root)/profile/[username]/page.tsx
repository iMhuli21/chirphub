import db from '@/lib/db';
import { cache } from 'react';
import { format } from 'date-fns';
import Post from '@/components/post';
import Reply from '@/components/reply';
import Comment from '@/components/comment';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageDialog from '@/components/ImageDialog';
import ProfileTabs from '@/components/profile-tabs';
import EditProfile from '@/components/edit-profile';
import { getCurrentUser } from '@/actions/getCurrentUser';

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
  const [queriedUser, loggedInUser] = await Promise.all([
    getUserData(username),
    getCurrentUser(),
  ]);

  if (!queriedUser || !loggedInUser) {
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
          <span className='text-sm'>{queriedUser.posts.length} Posts</span>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://utfs.io/f/0e29781c-e820-4d36-8c43-d3cb8009004f-n3ch5g.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='w-full relative h-[200px]'
        >
          <ImageDialog imageUrl={queriedUser.imageUrl} />
        </div>
        <div
          className={
            loggedInUser.username === queriedUser.username
              ? 'mt-4 w-full'
              : 'mt-8 w-full'
          }
        >
          {loggedInUser.username === queriedUser.username && <EditProfile />}
          <div className='pl-3 flex flex-col items-start gap-2'>
            <h2 className='font-medium'>@{username}</h2>
            <div className='flex items-end gap-2 text-sm opacity-50'>
              <CalendarDays />
              <span>
                Joined {format(queriedUser.createdAt, 'MMMM, do yyyy')}
              </span>
            </div>
          </div>
        </div>
        <ProfileTabs />
        <div className='mt-5'>
          {/*POSTS */}
          {!tab && (
            <div>
              {queriedUser.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
          {tab === 'posts' && (
            <div>
              {queriedUser.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
          {/*Comments */}
          {tab === 'comments' && (
            <div>
              {queriedUser.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
          {/*Replies */}
          {tab === 'replies' && (
            <div>
              {queriedUser.replies.map((reply) => (
                <Reply key={reply.id} reply={reply} />
              ))}
            </div>
          )}
          {/*LIKES */}
          {tab === 'likes' && (
            <div>
              {queriedUser.commentLikes.map((comment) => (
                <Comment key={comment.id} comment={comment.comment} />
              ))}
              {queriedUser.postLikes.map((post) => (
                <Post key={post.id} post={post.post} />
              ))}
              {queriedUser.replyLikes.map((reply) => (
                <Reply key={reply.id} reply={reply.reply} />
              ))}
            </div>
          )}
          {/*Retweets */}
          {tab === 'retweets' && (
            <div>
              {queriedUser.commentRetweets.map((comment) => (
                <Comment key={comment.id} comment={comment.comment} />
              ))}
              {queriedUser.postRetweets.map((post) => (
                <Post key={post.id} post={post.post} />
              ))}
              {queriedUser.replyRetweets.map((reply) => (
                <Reply key={reply.id} reply={reply.reply} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
