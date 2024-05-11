import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const ChatMessagesContainer = ({ children }: Props) => {
  return (
    <div className='h-[calc(100vh-256px-128px)] overflow-y-auto p-4 pb-4'>
      {children}
    </div>
  );
};
