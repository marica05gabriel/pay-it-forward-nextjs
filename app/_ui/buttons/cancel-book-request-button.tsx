'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loading } from '../Loading';

interface Props {
  label: string;
  disabled?: boolean;
  onSubmit: any;
}
export const CancelBookRequestButton = ({
  label,
  onSubmit,
  disabled,
}: Props) => {
  /*** disable if loading
   * loading disabled
   * on click:
   * connect to wallet
   * get address
   *
   * */

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const [successfullyCanceled, setSuccessfullyRequested] = useState(false);

  const handleSubmit = async () => {
    if (disabled) {
      return;
    }
    setLoading(true);
    const response = await onSubmit();

    if (response.status === 'ok') {
      setSuccessfullyRequested(true);
      setLoading(false);

      // keep button disabled
      return;
    }
    setLoading(false);
  };

  return (
    <form action={handleSubmit} className='flex justify-center'>
      {loading || pending ? (
        <Loading />
      ) : (
        <button
          type='submit'
          disabled={pending || disabled || loading}
          className={clsx(
            'group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white  group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800',
            (pending || disabled || loading || successfullyCanceled) &&
              'cursor-not-allowed rounded-md bg-gray-300 opacity-50'
          )}
        >
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            {successfullyCanceled ? 'Successfully canceled' : label}
          </span>
        </button>
      )}
    </form>
  );
};
