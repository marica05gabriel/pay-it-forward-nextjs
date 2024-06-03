import { BookCard } from '@/app/_ui/BookCard';
import { PaginationComponent } from '@/app/_ui/pagination/PaginationComponent';
import { BookType } from '@/app/_utils/types';

interface Props {
  books: BookType[];
}
export const ListMyBooks = ({ books }: Props) => {
  return (
    <>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};
