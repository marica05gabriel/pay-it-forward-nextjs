'use client';
import { BookInfoForm } from './BookInfoForm';
import { SearchISBNForm } from './SearchISBNForm';
import { SelectLocationForm } from './SelectLocationForm';
import { ChangeEvent, MouseEvent, useState } from 'react';

export type Book = {
  authors: string;
  imageUrl: string;
  isbn13: string;
  title: string;
};
const NO_BOOK: Book = {
  authors: '',
  imageUrl: '/no-book-cover-available.png',
  isbn13: '',
  title: '',
};
export const EnrollBookForm = () => {
  const [book, setBook] = useState<Book>(NO_BOOK);
  const [loading, setLoading] = useState(false);

  const handleOnSearch = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    isbn: string
  ) => {
    setLoading(true);
    const response = await fetch(`/api/book/by-isbn?isbn13=${isbn}`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    setBook(data.book);
    console.log(data);
    setLoading(false);
  };

  return (
    <div className='p-10'>
      <SearchISBNForm onSearch={handleOnSearch} disabled={loading} />

      <div className='grid grid-cols-1 grid-rows-2 gap-y-2 divide-y '>
        <BookInfoForm
          isbn13={book.isbn13}
          title={book.title}
          authors={book.authors}
          imageUrl={book.imageUrl}
        />
        <SelectLocationForm />
      </div>
    </div>
  );
};
