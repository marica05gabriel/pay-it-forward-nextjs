import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const ChatMessagesContainer = ({ children }: Props) => {
  return <div className='h-screen overflow-y-auto p-4 pb-36'>{children}</div>;
};
