'useClient';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Book, BookLocation } from './types';
import { useRouter } from 'next/navigation';

export const useEnrollBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [responseData, setResponseData] = useState<string>();
  const { data: session } = useSession();
  const router = useRouter();

  const submitForm = async (book: Book, location: BookLocation) => {
    if (!session || !session.user) {
      return;
    }

    setLoading(true);
    const body = {
      userId: session.user.name,
      isbn: book.isbn,
      country: location.country,
      city: location.city,
    };
    try {
      const response = await fetch(`/api/book/enroll`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      console.log('RESPONSE');
      console.log(response);
      const data = await response.json();
      console.log('DATA');

      console.log(data);
      setResponseData(data);
      if (response.status === 200) {
        router.push('/');
      }
    } catch (error) {
      setError('ERROR');
    } finally {
      setLoading(false);
    }
  };

  return { error, responseData, loading, submitForm };
};
