'use client';

import clsx from 'clsx';
import { ChangeEvent, MouseEvent, useState } from 'react';

interface Props {
  onSearch: (isbn: string) => void;
  disabled: boolean;
}
export const SearchISBNForm = ({ onSearch, disabled }: Props) => {
  const [isbn, setIsbn] = useState('');

  const handelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsbn(e.target.value);
  };

  const handleOnSearch = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    onSearch(isbn);
  };

  return (
    <>
      <div className='flex justify-center rounded border bg-gray-300 p-2'>
        <svg
          className='mr-2 w-5 fill-current text-gray-800'
          viewBox='0 0 24 24'
          width='30'
          height='30'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z'
          />
        </svg>
        <input
          onChange={(e) => handelOnChange(e)}
          type='text'
          placeholder='Enter ISBN here...'
          maxLength={13}
          className='bg-gray-300 text-gray-700 focus:outline-none'
          required
          value={isbn}
        />
      </div>
      <div className='mt-5 flex justify-center'>
        <button
          disabled={disabled || isbn.length < 13}
          onClick={handleOnSearch}
          className={clsx(
            'w-1/4 rounded-md border bg-gray-800 p-2 text-white',
            disabled ||
              (isbn.length < 13 &&
                'cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 opacity-50')
          )}
        >
          Search
        </button>
      </div>
    </>
  );
};
