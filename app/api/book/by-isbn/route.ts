import { Book } from '@/app/_components/_services/types';
import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.RESOURCE_SERVER_URL_BOOK;
const BOOK_BY_ISBN_URL = `${baseUrl}/by-isbn`;

export async function GET(req: NextRequest) {
  const isbn13 = req.nextUrl.searchParams.get('isbn13');
  const response = await fetch(`${BOOK_BY_ISBN_URL}?isbn13=${isbn13}`);
  const data = await response.json();

  if (data.code === 'BOOK_DETAILS_NOT_FOUND') {
    const book: Book = {
      authors: '',
      imageUrl: '/book-not-found.png',
      isbn: '',
      title: '',
    };
    return NextResponse.json(book);
  }
  const book: Book = {
    isbn: data.isbn13,
    title: data.title,
    authors: data.authors,
    imageUrl: data.imageUrl,
  };
  return NextResponse.json(book);
}
