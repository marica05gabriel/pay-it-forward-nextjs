import { TEST_BOOK_LIST } from '@/app/_utils/testData';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const urlSearchParams = new URLSearchParams(request.nextUrl.search);
  const page = urlSearchParams.get('page');
  const size = urlSearchParams.get('size');
  console.log(page);
  console.log(size);
  if (page && Number(page) % 2 == 0) {
    return Response.json({ books: TEST_BOOK_LIST.slice(0, 10) });
  } else {
    return Response.json({ books: TEST_BOOK_LIST.slice(0, 3) });
  }
}
