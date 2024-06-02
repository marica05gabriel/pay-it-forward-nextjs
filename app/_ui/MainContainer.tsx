import { ReactNode } from 'react';
import clsx from 'clsx';

const isOverlapping = true;

interface Props {
  children: ReactNode;
}
export const MainContainer = ({ children }: Props) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='container mx-auto px-6 text-black'>
        <div
          className={clsx(
            'relative z-10 -mt-8 mb-8 h-fit min-h-64 w-full rounded bg-white shadow',
            isOverlapping && '-mt-8',
            !isOverlapping && 'mt-4'
          )}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
