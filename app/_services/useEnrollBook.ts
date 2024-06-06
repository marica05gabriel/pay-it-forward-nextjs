'useClient';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Book, BookLocation } from './types';
import { useRouter } from 'next/navigation';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import {
  ERRORS,
  ErrorEnum,
  extractDataFromReceipt,
} from '../_components/thirdweb/thirdweb-utils';

const NEXT_API_ENROLL_BOOK = '/api/book/enroll';

export const useEnrollBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [responseData, setResponseData] = useState<string>();
  const { data: session } = useSession();
  const router = useRouter();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PAPER_BOOK
  );
  const {
    mutateAsync,
    isLoading,
    error: thirdWebError,
  } = useContractWrite(contract, 'mint');

  const submitForm = async (book: Book, location: BookLocation) => {
    if (!session || !session.user) {
      return;
    }
    if (!contract) {
      throw Error('Contract is missing: PAPER_BOOK!');
    }
    setLoading(true);
    let data = undefined;
    try {
      const response = await mutateAsync({ args: [book.isbn] });
      data = extractDataFromReceipt(response.receipt);
    } catch (error) {
      setError(ERRORS[ErrorEnum.MINT_ERROR]);
      setLoading(false);
      return;
    }
    console.log('Extracted data');
    console.log(data);

    const body = {
      userId: session.user.name,
      userPublicId: data.to,
      bookPublicId: data.bookPublicId,
      isbn: book.isbn,
      country: location.country,
      city: location.city,
    };
    try {
      const response = await fetch(NEXT_API_ENROLL_BOOK, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setResponseData(data);
      if (response.status === 200) {
        router.push('/');
      }
    } catch (error) {
      setError(ERRORS[ErrorEnum.ENROLL]);
    } finally {
      setLoading(false);
    }
  };

  return { error, responseData, loading, submitForm };
};
