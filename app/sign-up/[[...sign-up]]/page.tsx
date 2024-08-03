import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className='main-content flex items-center justify-center'>
      <SignUp forceRedirectUrl={'/home'} />
    </main>
  );
}
