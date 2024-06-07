'use client';
import clsx from 'clsx';

interface Props {
  label: string;
  onSubmit: () => any;
}
export const TryAgainButton = ({ label, onSubmit }: Props) => {
  const handleSubmit = async () => {
    onSubmit();
  };

  return (
    <form action={handleSubmit} className='flex justify-center'>
      <button
        title='Try again'
        type='submit'
        className={clsx(
          'group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white  group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
        )}
      >
        <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          {label}
        </span>
      </button>
    </form>
  );
};
