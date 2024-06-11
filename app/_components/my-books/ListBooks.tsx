import { BookCard } from '@/app/_ui/BookCard';
import { PaginationComponent } from '@/app/_ui/pagination/PaginationComponent';
import { BookType } from '@/app/_utils/types';
import { ReactNode } from 'react';

interface Props {
  books: BookType[];
  additionalContent?: (book: BookType) => ReactNode;
}
export const ListMyBooks = ({ books, additionalContent }: Props) => {
  return (
    <>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            additionalContent={!!additionalContent && additionalContent(book)}
          />
        ))}
      </div>
    </>
  );
};
