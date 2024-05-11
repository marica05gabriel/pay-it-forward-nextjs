import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const MainChatContainer = ({ children }: Props) => {
  return <div className='flex-1'>{children}</div>;
};
