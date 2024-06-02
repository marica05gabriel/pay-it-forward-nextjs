import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.RESOURCE_SERVER_URL_BOOK;
const BOOK_BY_ISBN_URL = `${baseUrl}/by-isbn`;

export async function GET(req: NextRequest) {
  const isbn13 = req.nextUrl.searchParams.get('isbn13');
  console.log(isbn13);

  const response = await fetch(`${BOOK_BY_ISBN_URL}?isbn13=${isbn13}`);
  const data = await response.json();

  if (data.code === 'BOOK_DETAILS_NOT_FOUND') {
    return NextResponse.json({
      book: {
        authors: '',
        imageUrl: '/book-not-found.png',
        isbn13: '',
        title: '',
      },
    });
  }

  //   {
  //     code: 'BOOK_DETAILS_NOT_FOUND',
  //     message: 'Book not found for ISBN13 provided!',
  //     fields: { isbn13: '1231233123123' }
  //   }
  console.log(data);
  return NextResponse.json({ book: data });
}
