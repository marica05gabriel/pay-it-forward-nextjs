import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.RESOURCE_SERVER_URL_BOOK;
const LOCATION_URL = `${baseUrl}/location/country`;

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get('country');

  const response = await fetch(`${LOCATION_URL}?country=${country}`);
  if (response.status == 204) {
    return NextResponse.json([
      {
        id: -1,
        country: '',
        city: '',
      },
    ]);
  }
  const locations = await response.json();
  return NextResponse.json(locations);
}
