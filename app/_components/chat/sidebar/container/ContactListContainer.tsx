import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const ContactListContainer = ({ children }: Props) => {
  return (
    <div className='mb-9 h-screen overflow-y-auto p-3 pb-20'>{children}</div>
  );
};
