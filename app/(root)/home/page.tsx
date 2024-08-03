import { SignOutButton } from '@clerk/nextjs';

export default function Feed() {
  return (
    <div>
      <SignOutButton redirectUrl='/' />
    </div>
  );
}
