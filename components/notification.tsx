import { Bell, Ellipsis } from 'lucide-react';

export default function Notification() {
  return (
    <div className='flex items-center gap-4 justify-between py-4 px-2 border-b hover:cursor-pointer'>
      <div className='flex items-center gap-2'>
        <Bell />
        <p className='text-sm tracking-tight'>@yaboyroshi just followed you</p>
      </div>
      <Ellipsis className='hover:opacity-50' />
    </div>
  );
}
