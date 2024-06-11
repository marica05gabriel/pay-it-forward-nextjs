'use client';

import { LoadingComponent } from '@/app/_ui/LoadingComponent';
import { TryAgainButton } from '@/app/_ui/buttons/try-again-button';
import { ROUTES, ROUTE_ITEMS, RoutesEnum } from '@/app/_utils/routes-util';
import { BaseResponse, BookTransfer, BookType } from '@/app/_utils/types';
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
import { redirect, useRouter } from 'next/navigation';
import { extractDataFromReceipt } from '../thirdweb/thirdweb-utils';
import { stringToBytes } from 'thirdweb/utils';
import { useThirdWebContext } from '@/app/_utils/context-providers';
import { sepolia } from 'thirdweb/chains';
import _ from 'lodash';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PAPER_BOOK;

interface Props {
  transfer: BookTransfer;
  book: BookType;
  signature: string;
  isValid: boolean;
  canComplete: boolean;
  message: string;
  onComplete: (
    transfer: BookTransfer,
    signature: string,
    txHash: string
  ) => any;
}
export const ValidateSignatureForm = ({
  isValid,
  canComplete,
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
  } = useContractWrite(contract, 'safeTransferFrom');
  const router = useRouter();

  const connect = useConnect();
  const metamaskConfig = metamaskWallet();
  const thirdWebContext = useThirdWebContext();

  const handleOnCompleteTransfer = async () => {
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

    const safeTransferFromResponse = await handleSafeTransferFrom();

    const response: BaseResponse = await onComplete(
      transfer,
      signature,
      safeTransferFromResponse.txHash
    );
    console.log('COMPLETE TRANSFER RESPONSE');
    console.log(response);
    if (
      response.status === 'SUCCESS' &&
      response.code === 'TRANSFER_COMPLETED'
    ) {
      setLoading(false);
      router.push(`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferor`);
    }
    setLoading(false);
  };

  const handleSafeTransferFrom = async () => {
    const dataObject = {
      signature: signature,
      message: transfer.targetPublicId,
    };
    const dataToSend = JSON.stringify(dataObject);
    const dataBytes = stringToBytes(dataToSend);
    console.log('dataToSend');
    console.log(dataToSend);
    console.log('dataBytes');
    console.log(dataBytes);
    const params = [
      transfer.fromPublicId,
      transfer.toPublicId,
      Number(`0x${transfer.targetPublicId}`),
      1,
      dataBytes,
    ];
    const response = await mutateAsync({ args: params });
    const data = extractDataFromReceipt(response.receipt);
    console.log('SAVE TRANSFER FROM');
    console.log(data);
    return data;
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
              disabled={!isValid || !canComplete}
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
