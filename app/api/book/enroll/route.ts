import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.RESOURCE_SERVER_URL_BOOK;
const ENROLL_URL = `${baseUrl}/enroll`;

export async function POST(req: NextRequest) {
  console.log('enroll');
  const body = await req.json();
  console.log(body);

  const requestBody = {
    userId: body.userId,
    userPublicId: body.userPublicId,
    bookPublicId: body.bookPublicId,
    isbn13: body.isbn,
    country: body.country,
    city: body.city,
  };
  const response = await fetch(ENROLL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();
  console.log(data);
  return NextResponse.json({});
}
