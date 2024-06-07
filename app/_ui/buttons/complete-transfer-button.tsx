'use client';
import clsx from 'clsx';

interface Props {
  label: string;
  disabled: boolean;
  onComplete: () => void;
}
export const CompleteTransferButton = ({
  label,
  disabled,
  onComplete,
}: Props) => {
  return (
    <div className='flex justify-center'>
      <button
        title='Complete transfer'
        type='submit'
        className={clsx(
          'group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-600 to-blue-600 p-0.5 text-sm font-medium text-gray-500 hover:text-white  group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800',
          disabled && 'cursor-not-allowed rounded-md bg-gray-300 opacity-50'
        )}
        disabled={disabled}
        onClick={onComplete}
      >
        <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          {label}
        </span>
      </button>
    </div>
  );
};
