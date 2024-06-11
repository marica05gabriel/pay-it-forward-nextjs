import { NextRequest, NextResponse } from 'next/server';

const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;

export async function GET(req: NextRequest, params: { userId: string }) {
  const userId = params.userId;
  console.warn('USER ID HEREEEE');
  console.warn(userId);

  let response = await fetch(`${TRANSFERS_URL}/byUser/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('ROUTE API GET TRANSFER BY USER');
  console.log(response);
  if (response.status === 200) {
    const responseData = await response.json();
    console.log(responseData);
    return NextResponse.json(responseData, { status: 200 });
  } else {
    return NextResponse.json({}, { status: response.status });
  }
}
