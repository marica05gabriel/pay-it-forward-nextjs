'use client';

import { LoadingComponent } from '@/app/_ui/LoadingComponent';
import { TryAgainButton } from '@/app/_ui/buttons/try-again-button';
import { ROUTES, ROUTE_ITEMS, RoutesEnum } from '@/app/_utils/routes-util';
import { BookTransfer } from '@/app/_utils/types';
import { useSigner } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  transfer: BookTransfer;
}
export const GenerateSignature = ({ transfer }: Props) => {
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState<string>();
  const [validateSingatureUrl, setValidateSignatureUrl] = useState<string>();
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const signer = useSigner();

  useEffect(() => {
    if (urlCopied) {
    }
  }, [urlCopied]);
  useEffect(() => {
    setLoading(true);
    if (!signer && !signature) {
      setLoading(false);
      return;
    }

    signMessage()
      .then((signedMessage) => {
        if (!signedMessage) {
          console.error('Signature empty!');
          return;
        }
        afterSign(signedMessage);
      })
      .catch((error) => {
        console.error('ERROR WHILE SIGNING!');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [signer]);

  const signMessage = async () => {
    if (!signer) {
      console.warn('No signer!');
      return;
    }
    const message = transfer.targetPublicId;
    const signedMessage = await signer.signMessage(message);
    console.log('Message:');
    console.log(message);
    console.log('Signed message');
    console.log(signedMessage);
    return signedMessage;
  };

  const afterSign = (signature: string) => {
    const url = `${BASE_URL}${ROUTES[RoutesEnum.VALIDATE_SIGNATURE]}/${transfer.id}?signature=${signature}`;
    setSignature(signature);
    setValidateSignatureUrl(url);
  };
  const handleTryAgain = async () => {
    const signature = await signMessage();
    if (!signature) {
      console.error('Signature empty!');
      return;
    }
    afterSign(signature);
  };

  if (loading) {
    return <LoadingComponent />;
  }
  if (!signer) {
    return <TryAgainButton label='Try again' onSubmit={handleTryAgain} />;
  }

  return (
    <div className='flex w-full flex-col items-center p-4'>
      {urlCopied && <UrlCopiedAlert onDismiss={() => setUrlCopied(false)} />}
      {validateSingatureUrl && (
        <>
          <CopyToClipboard
            text={validateSingatureUrl}
            onCopy={() => setUrlCopied(true)}
          >
            <button className='m-4 border-2 p-4'>
              Copy to clipboard with button
            </button>
          </CopyToClipboard>
          <div className='bg-white p-4'>
            <QRCode value={validateSingatureUrl} />
          </div>
        </>
      )}
      <p className='flex flex-col'>
        <span className='font-bold'>Signature:</span>
        <span className='break-all'>{signature}</span>
        <span className='font-bold'>Validate signature url:</span>{' '}
        <span className='break-all'>{validateSingatureUrl}</span>
      </p>
    </div>
  );
};

const UrlCopiedAlert = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <div
      id='alert-border-1'
      className='mb-4 flex items-center border-t-4 border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400'
      role='alert'
    >
      <svg
        className='h-4 w-4 flex-shrink-0'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
      </svg>
      <div className='ms-3 text-sm font-medium'>Link copied succesfully!</div>
      <button
        onClick={onDismiss}
        type='button'
        className='-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700'
        data-dismiss-target='#alert-border-1'
        aria-label='Close'
      >
        <span className='sr-only'>Dismiss</span>
        <svg
          className='h-3 w-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
          />
        </svg>
      </button>
    </div>
  );
};
