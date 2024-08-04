'use client';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

interface Props {
  handleEmojiPick: (emoji: string) => void;
}

export default function EmojiPickerComp({ handleEmojiPick }: Props) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const handlePick = (emoji: EmojiClickData, event: MouseEvent) => {
    handleEmojiPick(emoji.emoji);
  };

  return (
    <div className='p-2 relative'>
      <MdOutlineEmojiEmotions
        className='size-6 text-sky-500 hover:cursor-pointer relative block'
        onClick={() => setOpenEmojiPicker((prev) => !prev)}
      />

      <div className='absolute top-10 z-50'>
        <EmojiPicker
          open={openEmojiPicker}
          width={300}
          height={400}
          onEmojiClick={handlePick}
        />
      </div>
    </div>
  );
}
