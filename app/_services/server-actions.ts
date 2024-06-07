import { getServerSession } from 'next-auth/next';
import { authOptions } from '../_utils/auth-utils';
import { redirect } from 'next/navigation';
import { ROUTES, RoutesEnum } from '../_utils/routes-util';
import {
  BookTransfer,
  BookType,
  TransfeRequestEnum,
  TransferEnum,
  TransferRequest,
} from '../_utils/types';

const TRANSFER_REQUESTS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}/request`;
const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;
const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

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
      'Content-Type': 'application/json',
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

export const handleCancelBookRequest = async (
  bookId: number,
  bookIdToRequestId: Map<string, TransferRequest>
) => {
  'use server';
  const transferRequest = bookIdToRequestId.get(String(bookId));
  if (transferRequest === undefined) {
    throw Error('Transfer request undefined!');
  }
  const cancelResponse = await cancelBookRequest(transferRequest);
  console.log('CancelResponse');
  console.log(cancelResponse);
  return cancelResponse;
};

export const cancelBookRequest = async (transferRequest: TransferRequest) => {
  'use server';
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.name !== transferRequest.to) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  const consentType: TransfeRequestEnum = 'cancel';
  const transferRequestUUID = transferRequest.id;
  const cancelTransferRequestResponse = await fetch(
    `${TRANSFER_REQUESTS_URL}/${consentType}/${transferRequestUUID}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidateId: session.user.name,
        candidatePublicId: transferRequest.toPublicId,
      }),
    }
  );
  console.log('Cancel transfer request:');
  console.log(cancelTransferRequestResponse);

  const cancelResponseData = await cancelTransferRequestResponse.json();
  if (cancelTransferRequestResponse.status === 200) {
    return {
      status: cancelResponseData.status,
      code: cancelResponseData.code,
      message: cancelResponseData.message,
    };
  } else {
    console.error('CANCEL NOT SUCCESSFUL');
    console.error(cancelResponseData);
    throw Error('CANCEL NOT SUCCESSFUL');
  }
};

export const handleAcceptBookRequest = async (
  bookId: number,
  bookIdToRequestId: Map<string, TransferRequest>
) => {
  'use server';
  const transferRequest = bookIdToRequestId.get(String(bookId));
  if (transferRequest === undefined) {
    throw Error('Transfer request undefined!');
  }
  const acceptResponse = await acceptBookRequest(transferRequest);
  console.log('AcceptResponse');
  console.log(acceptResponse);
  return acceptResponse;
};

export const acceptBookRequest = async (transferRequest: TransferRequest) => {
  'use server';
  const session = await getServerSession(authOptions);
  console.log('TRANSFER REQUEST TO APPROVE');
  console.log(transferRequest);
  if (!session || !session.user || session.user.name !== transferRequest.from) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  const consentType: TransfeRequestEnum = 'accept';
  const transferRequestUUID = transferRequest.id;
  const acceptTransferRequestResponse = await fetch(
    `${TRANSFER_REQUESTS_URL}/${consentType}/${transferRequestUUID}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidateId: session.user.name,
        candidatePublicId: transferRequest.toPublicId,
      }),
    }
  );
  console.log('Accept transfer request:');
  console.log(acceptTransferRequestResponse);

  const acceptResponseData = await acceptTransferRequestResponse.json();
  if (acceptTransferRequestResponse.status === 201) {
    return {
      status: acceptResponseData.status,
      code: acceptResponseData.code,
      message: acceptResponseData.message,
    };
  } else {
    console.error('ACCEPT REQUEST NOT SUCCESSFUL');
    console.error(acceptResponseData);
    throw Error('ACCEPT REQUEST SUCCESSFUL');
  }
};

export const handleRefuseBookRequest = async (
  bookId: number,
  bookIdToRequestId: Map<string, TransferRequest>
) => {
  'use server';
  const transferRequest = bookIdToRequestId.get(String(bookId));
  if (transferRequest === undefined) {
    throw Error('Transfer request undefined!');
  }
  const refuseResponse = await refuseBookRequest(transferRequest);
  console.log('RefuseResponse');
  console.log(refuseResponse);
  return refuseResponse;
};

export const refuseBookRequest = async (transferRequest: TransferRequest) => {
  'use server';
  console.log('TRANSFER REQUEST TO REFUSE');
  console.log(transferRequest);
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.name !== transferRequest.from) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  const consentType: TransfeRequestEnum = 'refuse';
  const transferRequestUUID = transferRequest.id;
  const refuseTransferRequestResponse = await fetch(
    `${TRANSFER_REQUESTS_URL}/${consentType}/${transferRequestUUID}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidateId: session.user.name,
        candidatePublicId: transferRequest.toPublicId,
      }),
    }
  );
  console.log('Refuse transfer request:');
  console.log(refuseTransferRequestResponse);

  const refuseResponseData = await refuseTransferRequestResponse.json();
  if (refuseTransferRequestResponse.status === 200) {
    return {
      status: refuseResponseData.status,
      code: refuseResponseData.code,
      message: refuseResponseData.message,
    };
  } else {
    console.error('REFUSE REQUEST NOT SUCCESSFUL');
    console.error(refuseResponseData);
    throw Error('REFUSE REQUEST SUCCESSFUL');
  }
};

export const handleCancelTransfer = async (
  bookId: number,
  bookIdToTransferId: Map<string, BookTransfer>
) => {
  'use server';
  const transfer = bookIdToTransferId.get(String(bookId));
  if (transfer === undefined) {
    throw Error('Transfer request undefined!');
  }
  const cancelResponse = await cancelTransfer(transfer);
  console.log('CancelResponse');
  console.log(cancelResponse);
  return cancelResponse;
};

export const cancelTransfer = async (transfer: BookTransfer) => {
  'use server';
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user ||
    (session.user.name !== transfer.to && session.user.name !== transfer.from)
  ) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  const action: TransferEnum = 'cancel';
  const transferUUID = transfer.id;
  const cancelTransferResponse = await fetch(
    `${TRANSFERS_URL}/${transferUUID}/${action}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidateId: session.user.name,
        candidatePublicId: transfer.toPublicId,
      }),
    }
  );
  console.log('Cancel transfer response:');
  console.log(cancelTransferResponse);

  const cancelResponseData = await cancelTransferResponse.json();
  if (cancelTransferResponse.status === 200) {
    return {
      status: cancelResponseData.status,
      code: cancelResponseData.code,
      message: cancelResponseData.message,
    };
  } else {
    console.error('CANCEL NOT SUCCESSFUL');
    console.error(cancelResponseData);
    throw Error('CANCEL NOT SUCCESSFUL');
  }
};

export const handleOnCompleteTransfer = async (
  transfer: BookTransfer,
  signature: string,
  txHash: string
) => {
  'use server';
  // const transfer = bookIdToTransferId.get(String(bookId));
  if (transfer === undefined) {
    throw Error('Transfer undefined!');
  }
  const completeResponse = await completeTransfer(transfer, signature, txHash);
  console.log('CompleteResponse');
  console.log(completeResponse);
  return completeResponse;
};

export const completeTransfer = async (
  transfer: BookTransfer,
  signature: string,
  txHash: string
) => {
  'use server';
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.name !== transfer.from) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  const action: TransferEnum = 'complete';
  const transferUUID = transfer.id;
  const completeTransferResponse = await fetch(
    `${TRANSFERS_URL}/${transferUUID}/${action}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidateId: session.user.name,
        candidatePublicId: transfer.toPublicId,
        signature: signature,
        publicTransactionHash: txHash,
      }),
    }
  );
  console.log('Complete transfer response:');
  console.log(completeTransferResponse);

  const completeResponseData = await completeTransferResponse.json();
  if (completeTransferResponse.status === 200) {
    return {
      status: completeResponseData.status,
      code: completeResponseData.code,
      message: completeResponseData.message,
    };
  } else {
    console.error('COMPLETE NOT SUCCESSFUL');
    console.error(completeResponseData);
    throw Error('COMPLETE NOT SUCCESSFUL');
  }
};
