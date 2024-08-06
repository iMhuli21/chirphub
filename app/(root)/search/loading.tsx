import { Loader2 } from 'lucide-react';

export default function loading() {
  return (
    <div className='flex items-center justify-center'>
      <Loader2 className='size-5 animate-spin' />
    </div>
  );
}
