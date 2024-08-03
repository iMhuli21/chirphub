import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='main-content flex flex-col items-center justify-center sm:flex-row'>
      <div className='w-full sm:w-3/6 p-4 flex items-center justify-center'>
        <FaXTwitter size={50} />
      </div>
      <div className='w-full sm:w-3/6 p-4 flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-col items-center justify-center gap-2 tracking-tight'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-center'>
            Happening now
          </h1>
          <span>Join today</span>
        </div>
        <div className='flex flex-col items-center justify-center gap-1 w-full'>
          <Button
            variant={'outline'}
            className='w-full max-w-sm rounded-lg'
            asChild
          >
            <Link href={'/sign-in'}>Sign In</Link>
          </Button>
          <span>or</span>
          <Button className='w-full max-w-sm rounded-lg' asChild>
            <Link href={'/sign-up'}>Create Account</Link>
          </Button>
        </div>
        <p className='w-full max-w-sm text-sm'>
          By signing up, you agree to the{' '}
          <span className='capitalize text-sky-700 font-medium'>
            Terms of Service
          </span>{' '}
          and{' '}
          <span className='capitalize text-sky-700 font-medium'>
            Privacy Policy
          </span>
          , including{' '}
          <span className='capitalize text-sky-700 font-medium'>
            Cookie Use.
          </span>
        </p>
      </div>
    </main>
  );
}
