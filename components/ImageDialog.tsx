'use client';

import { useUser } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from './ui/dialog';
import Image from 'next/image';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { checkFileType } from '@/lib/helpers';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  imageUrl: string;
}

export default function ImageDialog({ imageUrl }: Props) {
  const { user } = useUser();
  const { toast } = useToast();
  const pathname = usePathname();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async () => {
    try {
      setLoading(true);
      if (file) {
        const validImage = checkFileType(file);

        if (validImage) {
          const params = {
            file,
          };
          user?.setProfileImage(params);

          toast({
            title: 'Success',
            description: 'Successfully updated Profile Image.',
          });

          window.location.href = pathname;
        } else {
          toast({
            title: 'Error',
            description:
              'Invalid file type only allowed types are jpg|jpeg|png.',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Error',
          description: 'No file selected.',
          variant: 'destructive',
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: 'Error',
          description: e.message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src={imageUrl}
            alt='user profile'
            width={100}
            height={100}
            className='border-2 object-center absolute rounded-full -bottom-10 left-7 hover:cursor-pointer'
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change your profile image</DialogTitle>
            <DialogDescription>
              The image on your left is what your current profile image is.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4 flex items-center gap-5 justify-between'>
            <Image
              src={imageUrl}
              alt='user profile'
              width={100}
              height={100}
              className='border-2 object-center rounded-full'
            />
            <div className='h-[80px] rounded-full border-2 flex items-center justify-center w-full hover:cursor-pointer'>
              <label
                htmlFor='profile-image'
                className='p-2 flex flex-col items-center justify-center gap-1 hover:cursor-pointer'
              >
                <Upload />
                <span className='text-sm opacity-50'>Upload image</span>
              </label>
              <input
                hidden
                id='profile-image'
                type='file'
                onChange={(e) => setFile(e.target?.files?.[0])}
              />
            </div>
          </div>
          {file && (
            <p className='text-sm font-medium tracking-tight'>
              File loaded, click save changes to change image.
            </p>
          )}
          <DialogFooter>
            <Button onClick={handleUploadImage} disabled={loading}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
