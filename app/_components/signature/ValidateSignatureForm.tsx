'use client';

import { LoadingComponent } from '@/app/_ui/LoadingComponent';
import { TryAgainButton } from '@/app/_ui/buttons/try-again-button';
import { ROUTES, ROUTE_ITEMS, RoutesEnum } from '@/app/_utils/routes-util';
import { BookTransfer, BookType } from '@/app/_utils/types';
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useContract,
  useContractWrite,
  useSigner,
} from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CompleteTransferButton } from '@/app/_ui/buttons/complete-transfer-button';
import { BookCard } from '@/app/_ui/BookCard';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  transfer: BookTransfer;
  book: BookType;
  signature: string;
  isValid: boolean;
  message: string;
  onComplete: (
    transfer: BookTransfer,
    signature: string,
    txHash: string
  ) => any;
}
export const ValidateSignatureForm = ({
  isValid,
  message,
  transfer,
  book,
  signature,
  onComplete,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PAPER_BOOK
  );
  const {
    mutateAsync,
    isLoading,
    error: thirdWebError,
  } = useContractWrite(contract, 'mint');
  const connect = useConnect();
  const metamaskConfig = metamaskWallet();
  const address = useAddress();

  const txHash = '';
  const handleOnCompleteTransfer = async () => {
    const response = await onComplete(transfer, signature, txHash);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className='flex w-full flex-col items-center p-4'>
      {isValid && <SignatureValidAlert message={message} />}
      {!isValid && <SignatureNotValidAlert message={message} />}
      <div className='w-80'>
        <BookCard
          book={book}
          additionalContent={
            <CompleteTransferButton
              label='Complete transfer'
              disabled={!isValid}
              onComplete={handleOnCompleteTransfer}
            />
          }
        />
      </div>
    </div>
  );
};

const SignatureValidAlert = ({ message }: { message: string }) => {
  return (
    <div
      className=' mb-4 flex min-w-80 items-center rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400'
      role='alert'
    >
      <svg
        className='me-3 inline h-4 w-4 flex-shrink-0'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
      </svg>
      <span className='sr-only'>Info</span>
      <div>
        <span className='font-medium'>{message}</span>
      </div>
    </div>
  );
};

const SignatureNotValidAlert = ({ message }: { message: string }) => {
  return (
    <div
      className='  mb-4 flex min-w-80 items-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400'
      role='alert'
    >
      <svg
        className='me-3 inline h-4 w-4 flex-shrink-0'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
      </svg>
      <span className='sr-only'>Danger</span>
      <div>
        <span className='font-medium'>{message}</span>
      </div>
    </div>
  );
};
