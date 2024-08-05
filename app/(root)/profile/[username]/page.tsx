import { getCurrentUser } from '@/actions/getCurrentUser';
import ImageDialog from '@/components/ImageDialog';
import ProfileTabs from '@/components/profile-tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';

interface Props {
  params: {
    username: string;
  };
}

export default async function Profile({ params: { username } }: Props) {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex flex-col items-start'>
          <h1 className='text-lg font-medium tracking-tight'>@{username}</h1>
          <span className='text-sm'>2 Posts</span>
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
              <span>Joined August, 2024</span>
            </div>
            <div className='flex items-center gap-4 text-sm opacity-50'>
              <span>{0} Following</span>
              <span>{1} Followers</span>
            </div>
          </div>
        </div>
        <ProfileTabs />
      </section>
    </>
  );
}
