import { getServerSession } from 'next-auth/next';
import { authOptions } from '../_utils/auth-utils';
import { redirect } from 'next/navigation';
import { ROUTES, RoutesEnum } from '../_utils/routes-util';
import { BookType } from '../_utils/types';

const TRANSFER_REQUESTS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}/request`;
const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;
const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

// export const handleRequestBook = async (bookId: number, toId, toPublicId) => {
export const handleRequestBook = async (
  bookId: number,
  connectedWalletAddress: string
) => {
  'use server';

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  console.log(session.user.name);

  const response = await fetch(`${FIND_BOOKS_URL}/${bookId}`, {
    method: 'GET',
    headers: {
      'Coontent-Type': 'application/json',
    },
  });
  const book: BookType = await response.json();
  console.log('BOOK FOUND');
  console.log(book);

  const transferRequestResponse = await fetch(`${TRANSFER_REQUESTS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: book.currentOwner,
      fromPublicId: book.currentOwnerPublicId,
      to: session.user.name,
      toPublicId: connectedWalletAddress,
      target: book.id,
      targetPublicId: book.publicId,
    }),
  });
  console.log(transferRequestResponse);
  const transferRequest = await transferRequestResponse.json();
  console.log(transferRequest);

  return { status: 'ok' };
};
