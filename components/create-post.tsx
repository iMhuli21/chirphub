'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { User } from '@/lib/constants';
import { Textarea } from './ui/textarea';
import { ImagePlus } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { checkContent } from '@/lib/helpers';
import EmojiPickerComp from './emoji-picker';
import { useUploadThing } from '@/lib/uploadthing';
import { useState, useEffect, ChangeEvent } from 'react';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { postTweet } from '@/actions/postTweet';

export default function CreatePost() {
  const route = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState('');
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete(res) {
      setImageUrls(res.map((file) => file.url));
    },
    onUploadError(e) {
      toast({
        title: 'Error',
        description: e.message,
        variant: 'destructive',
        className: 'font-medium tracking-tight',
      });
    },
  });

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

  const handleImagesSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      startUpload(Array.from(event.target.files));
    }
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      //check if there atleast is an image or text
      const validPost = checkContent(post, imageUrls);

      if (validPost?.error) {
        return toast({
          title: 'Error',
          description: validPost.error,
          variant: 'destructive',
          className: 'font-medium tracking-tight',
        });
      }

      const res = await postTweet(post, imageUrls);

      if (res?.error) {
        return toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
          className: 'font-medium tracking-tight',
        });
      }

      toast({
        title: 'Success',
        description: res?.success,
        variant: 'default',
        className: 'font-medium tracking-tight',
      });

      setImageUrls([]);
      setPost('');
      route.refresh();
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: 'Error',
          description: e.message,
          variant: 'destructive',
          className: 'font-medium tracking-tight',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='px-4 py-3 border-b space-y-2'>
      <div className='flex items-start gap-2'>
        <div className='flex items-center justify-center'>
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt='user image'
              width={40}
              height={40}
              className='object-cover rounded-full'
              priority
            />
          ) : (
            <Image
              src={'/placeholder.jpg'}
              alt='user image'
              width={40}
              height={40}
              className='object-cover rounded-full'
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
      {imageUrls.length > 0 && (
        <div className='flex items-center flex-wrap gap-4'>
          {imageUrls.map((url) => (
            <Image
              key={url}
              src={url}
              alt='media post image'
              width={150}
              height={150}
              className='w-[150px] h-[100px] object-cover rounded hover:cursor-pointer'
              onClick={() =>
                setImageUrls((prev) => prev.filter((item) => item !== url))
              }
            />
          ))}
        </div>
      )}
      <div className='flex items-center gap-2 justify-between'>
        <div className='flex items-center gap-2'>
          <div>
            <label htmlFor='media-post-images'>
              <ImagePlus className='text-sky-500 size-6 hover:cursor-pointer' />
            </label>
            <input
              id='media-post-images'
              hidden
              type='file'
              onChange={handleImagesSelect}
              multiple
            />
          </div>
          <EmojiPickerComp handleEmojiPick={handleEmojiPick} />
        </div>
        <Button
          className='w-full max-w-[130px] rounded-full'
          disabled={isUploading || loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
