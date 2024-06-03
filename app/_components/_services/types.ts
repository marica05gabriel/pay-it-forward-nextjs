export type Book = {
  authors: string;
  imageUrl: string;
  isbn: string;
  title: string;
};
export type BookLocation = {
  country: string;
  city: string;
};

export const NO_BOOK: Book = {
  authors: '',
  imageUrl: '/no-book-cover-available.png',
  isbn: '',
  title: '',
};
