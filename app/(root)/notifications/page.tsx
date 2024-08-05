import Notification from '@/components/notification';
import React from 'react';

export default function Notifications() {
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>
            Notifications
          </h1>
        </div>
        <div>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </section>
    </>
  );
}
