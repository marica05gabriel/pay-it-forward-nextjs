export type BookType = {
  id: number;
  title: string;
  authors: string[];
  image: string;
  description?: string;
  categories?: string[];
  isbn13?: string;
  isbn10?: string;
};
