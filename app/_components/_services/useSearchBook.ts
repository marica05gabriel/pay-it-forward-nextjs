import { useState } from 'react';
import { Book, NO_BOOK } from './types';

export const useSearchBook = () => {
  const [responseData, setResponseData] = useState<Book>(NO_BOOK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const submitForm = async (isbn: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/book/by-isbn?isbn13=${isbn}`, {
        method: 'GET',
      });
      const book = await response.json();
      setResponseData(book);
    } catch (error) {
      setError('ERROR');
      setResponseData(NO_BOOK);
    } finally {
      setLoading(false);
    }
  };
  return { error, responseData, loading, submitForm };
};
