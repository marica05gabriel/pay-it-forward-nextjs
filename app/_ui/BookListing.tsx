import { BookType } from '@/utils/types';
import { BookCard } from '@/ui/BookCard';

interface Props {
  books: BookType[];
}
export const BookListing = ({ books }: Props) => {
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
