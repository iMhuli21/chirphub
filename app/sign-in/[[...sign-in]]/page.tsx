import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className='main-content flex items-center justify-center'>
      <SignIn forceRedirectUrl={'/home'} />
    </main>
  );
}
