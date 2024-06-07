'use client';
import { ROUTES, RoutesEnum } from '@/app/_utils/routes-util';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  label: string;
  transferId: string;
}
const generateSignaturePage = ROUTES[RoutesEnum.GENERATE_SIGNATURE];
export const GenerateSignatureButton = ({ label, transferId }: Props) => {
  return (
    <div className='flex justify-center'>
      <Link
        href={`${generateSignaturePage}/${transferId}`}
        title='Go to generate signature page'
        type='submit'
        className={clsx(
          'group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-600 to-blue-600 p-0.5 text-sm font-medium text-gray-500 hover:text-white  group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
        )}
      >
        <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          {label}
        </span>
      </Link>
    </div>
  );
};
