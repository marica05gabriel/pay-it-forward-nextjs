import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const ContactListContainer = ({ children }: Props) => {
  return (
    <div className='h-[calc(100vh-256px)] overflow-y-auto p-3 pb-3'>
      {children}
    </div>
  );
};
