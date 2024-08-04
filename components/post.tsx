'use client';
import React from 'react';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa6';

export default function Post() {
  const route = useRouter();
  return (
    <div
      className='py-2 pl-3 pr-2 w-full flex items-start gap-4 border-b hover:cursor-pointer'
      onDoubleClick={() => route.push(`/post/${123}`)}
    >
      <Image
        src='/placeholder.jpg'
        alt='placeholder'
        width={50}
        height={50}
        className='rounded-full object-center'
        priority
      />
      <div className='flex flex-col items-start gap-3'>
        <div className='flex items-center gap-3'>
          <h2 className='font-medium tracking-tight text-sm'>
            SpecialUserName
          </h2>
          <div className='flex items-center gap-1'>
            <span className='text-xs text-gray-500'>@2nochalantHuli</span>
            <div className='flex items-center gap-1 text-xs text-gray-500'>
              <Dot />
              <span>1 hour ago</span>
            </div>
          </div>
        </div>
        <p className='text-sm'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          nesciunt ratione ipsum asperiores debitis maxime voluptatum eveniet
          molestias! Tenetur animi nihil debitis soluta quae temporibus ullam
          veritatis nulla, a ipsam.
        </p>
        <div className='flex items-center gap-10 pb-1 pt-2'>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={() => route.push(`/post/${123}`)}
          >
            <FaRegComment className='size-5' />
            <span>0</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={() => console.log('Retweet Post')}
          >
            <FaRetweet className='size-5' />
            <span>0</span>
          </div>
          <div
            className='flex items-center gap-2 text-sm hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out'
            onClick={() => console.log('Like Post')}
          >
            <FaRegHeart className='size-5' />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
