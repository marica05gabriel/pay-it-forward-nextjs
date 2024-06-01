import { BookType } from '@/utils/types';
import { BookCard } from '@/ui/BookCard';

interface Props {
  page: number;
  size: number;
}
export const BookListing = async ({ page, size }: Props) => {
  console.log('BookListing');
  const url =
    'http://localhost:3000/api/book?' +
    new URLSearchParams({
      page: String(page),
      size: String(size),
    }).toString();

  const options = { method: 'GET' };
  const response = await fetch(url, options);
  const data: { books: BookType[] } = await response.json();

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
      {data.books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
