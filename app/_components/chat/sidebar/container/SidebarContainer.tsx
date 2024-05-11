import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SidebarContainer = ({ children }: Props) => {
  return (
    <div className='w-1/4 border-r border-gray-300 bg-white'>{children}</div>
  );
};
