'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { User } from '@/lib/constants';
import { Textarea } from './ui/textarea';
import { ImagePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import EmojiPickerComp from './emoji-picker';
import { getCurrentUser } from '@/actions/getCurrentUser';

export default function CreateComment() {
  const [post, setPost] = useState('');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const res = await getCurrentUser();

      if (res) {
        setUser(res);
      }
    };

    getUser();
  }, []);

  const handleEmojiPick = (emoji: string) => {
    setPost((prev) => `${prev}${emoji}`);
  };
  return (
    <div className='px-4 py-3 border-b space-y-2'>
      <div className='flex items-start gap-4'>
        <div className='flex items-center justify-center'>
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt='user image'
              width={40}
              height={40}
              className='object-center rounded-full'
              priority
            />
          ) : (
            <Image
              src={'/placeholder.jpg'}
              alt='user image'
              width={40}
              height={40}
              className='object-center rounded-full'
              priority
            />
          )}
        </div>
        <Textarea
          placeholder='What is happening?!'
          className='resize-none border-none max-h-[80px] focus-visible:ring-0 focus-visible:ring-offset-0'
          maxLength={350}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      <div className='flex items-center gap-2 justify-between'>
        <div className='flex items-center gap-2'>
          <ImagePlus className='text-sky-500 size-6' />
          <EmojiPickerComp handleEmojiPick={handleEmojiPick} />
        </div>
        <Button className='w-full max-w-[130px] rounded-full'>Comment</Button>
      </div>
    </div>
  );
}
