import { Button } from '@/components/ui/button';
import { SignOutButton as ClerkSignOutBtn } from '@clerk/nextjs';

export default function SignOutBtn() {
  return (
    <div className='flex items-center justify-end mt-5 w-full pr-3'>
      <ClerkSignOutBtn redirectUrl='/'>
        <Button
          variant={'outline'}
          className='hover:bg-destructive hover:text-destructive-foreground'
        >
          Sign Out
        </Button>
      </ClerkSignOutBtn>
    </div>
  );
}
