import { me } from '@/app/_utils/chat-contact-list-test-data';
import { ReactNode, useCallback } from 'react';

interface Props {
  id: string;
  message: string;
  avatar: string;
  isLastMessage: boolean;
}
export const IncomingMessage = ({
  id,
  message,
  avatar,
  isLastMessage,
}: Props) => {
  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);
  return (
    <div
      id={`message-${id}`}
      ref={isLastMessage ? setRef : null}
      className='mb-4 flex cursor-pointer'
    >
      <div className='mr-2 flex h-9 w-9 items-center justify-center rounded-full'>
        <img src={avatar} alt='User Avatar' className='h-8 w-8 rounded-full' />
      </div>
      <div className='flex max-w-96 gap-3 rounded-lg bg-white p-3'>
        <p className='text-gray-700'>{message}</p>
      </div>
    </div>
  );
};
