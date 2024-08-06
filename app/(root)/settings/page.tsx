import { UserIcon } from 'lucide-react';
import { getCurrentUser } from '@/actions/getCurrentUser';
import SignOutBtn from '@/components/sign-out-btn';

export default async function Settings() {
  const user = await getCurrentUser();

  if (!user) return null;
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Settings</h1>
        </div>
        <div className='flex items-center gap-4 mt-5 pl-3'>
          <UserIcon />
          <div className='flex flex-col items-start'>
            <h2 className='text-lg font-semibold'>Account Information</h2>
            <span className='text-sm opacity-50'>
              See your account information like your email address.
            </span>
          </div>
        </div>
        <div className='pl-3 mt-5 flex flex-col items-start gap-4'>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='font-medium'>Username</h3>
            <span className='text-sm opacity-50'>@{user.username}</span>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='font-medium'>Email</h3>
            <span className='text-sm opacity-50'>{user.emailAddress}</span>
          </div>
          <SignOutBtn />
        </div>
      </section>
    </>
  );
}
