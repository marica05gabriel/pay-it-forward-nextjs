'use client';

import { useEnrollBook } from '@/app/_services/useEnrollBook';
import { BookInfoForm } from './BookInfoForm';
import { SearchISBNForm } from './SearchISBNForm';
import { SelectLocationForm } from './SelectLocationForm';
import { useState } from 'react';
import clsx from 'clsx';
import { useSearchBook } from '@/app/_services/useSearchBook';
import { BookLocation } from '@/app/_services/types';
import { LoadingComponent } from '../LoadingComponent';
import { useAddress } from '@thirdweb-dev/react';

export const EnrollBookForm = () => {
  const [location, setLocation] = useState<BookLocation>();
  const {
    loading: searchLoading,
    error: searchError,
    responseData: book,
    submitForm: search,
  } = useSearchBook();

  const {
    loading: enrollLoading,
    error: enrollError,
    responseData: enrollResponse,
    submitForm: enroll,
  } = useEnrollBook();

  const address = useAddress();

  const handleOnSearch = (isbn: string) => {
    search(isbn);
  };
  const handleSubmit = () => {
    if (!(book && location)) {
      return;
    }
    enroll(book, location);
    console.log(enrollResponse);
  };

  return (
    <div className='flex flex-col  justify-center p-10'>
      <SearchISBNForm onSearch={handleOnSearch} disabled={searchLoading} />

      <div className='grid grid-cols-1 grid-rows-2 gap-y-2 divide-y '>
        {searchLoading ? <LoadingComponent /> : <BookInfoForm book={book} />}

        <SelectLocationForm setLocation={setLocation} />
      </div>

      <button
        type='submit'
        className={clsx(
          book &&
            location &&
            'w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          (!book || !location || enrollLoading) &&
            'cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 opacity-50'
        )}
        onClick={handleSubmit}
        disabled={!(book && location) || enrollLoading}
      >
        Submit
      </button>
    </div>
  );
};
