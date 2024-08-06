'use client';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogContent,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { updateUsername } from '@/actions/updateUsername';

export default function EditProfile() {
  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditInfo = async () => {
    try {
      setLoading(true);
      const res = await updateUsername(username);

      if (res?.error) {
        toast({
          title: 'Error',
          description: res.error,
          className: 'font-medium tracking-tight',
        });
      }

      toast({
        title: 'Success',
        description: res?.success,
        className: 'font-medium tracking-tight',
      });

      window.location.href = `/profile/${username}`;
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className='flex items-center justify-end pr-5'>
            <Button variant={'outline'} className='rounded-full'>
              Edit Profile
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>You can update your username</DialogDescription>
          </DialogHeader>
          <div>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEditInfo} disabled={loading}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
