import { useCallback } from 'react';

interface Props {
  id: string;
  sender: string;
  message: string;
  avatar: string;
  isLastMessage: boolean;
}
export const OutgoingMessage = ({
  id,
  sender,
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
      title={`Sender: ${sender}`}
      ref={isLastMessage ? setRef : null}
      className='mb-4 flex cursor-pointer justify-end'
    >
      <div className='flex max-w-96 gap-3 rounded-lg bg-indigo-500 p-3 text-white'>
        <p>{message}</p>
      </div>
      <div className='ml-2 flex h-9 w-9 items-center justify-center rounded-full'>
        <img src={avatar} alt='My Avatar' className='h-8 w-8 rounded-full' />
      </div>
    </div>
  );
};
