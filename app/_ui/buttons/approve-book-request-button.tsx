'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loading } from '../Loading';
import { ROUTES, RoutesEnum } from '@/app/_utils/routes-util';
import { useRouter } from 'next/navigation';
import { metamaskWallet, useConnect } from '@thirdweb-dev/react';
import { useThirdWebContext } from '@/app/_utils/context-providers';
import { sepolia } from 'thirdweb/chains';
import _ from 'lodash';

interface Props {
  label: string;
  disabled?: boolean;
  onSubmit: any;
}
export const AcceptBookRequestButton = ({
  label,
  onSubmit,
  disabled,
}: Props) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const [successfullyAccepted, setSuccessfullyRequested] = useState(false);
  const router = useRouter();

  const connect = useConnect();
  const metamaskConfig = metamaskWallet();
  const thirdWebContext = useThirdWebContext();

  const handleSubmit = async () => {
    if (disabled) {
      return;
    }
    setLoading(true);
    try {
      const chainId =
        thirdWebContext && thirdWebContext.chain
          ? thirdWebContext.chain.id
          : sepolia.id;
      const wallet = await connect(metamaskConfig, { chainId });
      const connectedAddress = await wallet.getAddress();
      if (!_.isEmpty(connectedAddress)) {
        console.error('No address');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const response = await onSubmit();
    console.log('TRANSFER REQUEST RESPONSE');
    console.log(response);
    if (response.status === 'SUCCESS' && response.code === 'TRANSFER_PENDING') {
      setSuccessfullyRequested(true);
      setLoading(false);
      router.push(`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferor`);

      // keep button disabled
      return;
    } else {
      setError(response.message);
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
            'group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-600 to-blue-600 p-0.5 text-sm font-medium text-gray-500 hover:text-white  group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800',
            (pending || disabled || loading || successfullyAccepted) &&
              'cursor-not-allowed rounded-md bg-gray-300 opacity-50'
          )}
        >
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            {!successfullyAccepted && !error && label}
            {successfullyAccepted && !error ? 'Successfully accepted' : ''}
            {error ? error : ''}
          </span>
        </button>
      )}
    </form>
  );
};
