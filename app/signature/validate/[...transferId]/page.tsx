import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../_utils/auth-utils';
import { BaseResponse, BookTransfer, BookType } from '../../../_utils/types';
import { redirect } from 'next/navigation';
import _ from 'lodash';
import { GenerateSignature } from '@/app/_components/signature/GenerateSignature';
import { ValidateSignatureForm } from '@/app/_components/signature/ValidateSignatureForm';
import { handleOnCompleteTransfer } from '@/app/_services/server-actions';
import { signIn } from 'next-auth/react';

const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;
const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

export default async function ValidateSignaturePage({
  params,
  searchParams,
}: {
  params: { transferId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentRoute = RoutesEnum.VALIDATE_SIGNATURE;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const transferId = params.transferId[0];
  const signature = searchParams['signature'];

  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? '';
  if (
    !session ||
    _.isEmpty(username) ||
    _.isEmpty(signature) ||
    typeof signature !== 'string'
  ) {
    const callbackUrl = `http://localhost:3000/${ROUTES[currentRoute]}/${transferId}?signature=${signature}`;
    redirect(`${ROUTES[RoutesEnum.UNAUTHORIZED]}?callbackUrl=${callbackUrl}`);
  }

  const transferResponse = await fetch(
    `${TRANSFERS_URL}/byId/${transferId}/${username}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (transferResponse.status !== 200) {
    console.error('GET TRANSFER BY ID ERROR');
    console.error(transferResponse);
    throw Error('GET TRANSFER BY ID ERROR');
  }
  const transfer: BookTransfer = await transferResponse.json();
  console.log('TRANSFER FOUND');
  console.log(transfer);

  const response = await fetch(`${FIND_BOOKS_URL}/${transfer.target}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const book: BookType = await response.json();
  console.log('BOOK FOUND');
  console.log(book);

  // VALIDATE SIGNATURE
  console.log(signature);
  const validateSignatureResponse = await fetch(
    `${TRANSFERS_URL}/${transfer.id}/signature/validate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature: signature,
      }),
    }
  );
  console.log('Validate signature response:');
  console.log(validateSignatureResponse);

  const validateSignatureResponseData: BaseResponse =
    await validateSignatureResponse.json();
  const isValid =
    validateSignatureResponse.status === 200 &&
    validateSignatureResponseData.code === 'SIGNATURE_VALID'
      ? true
      : false;

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        <ValidateSignatureForm
          isValid={isValid}
          message={validateSignatureResponseData.message}
          transfer={transfer}
          book={book}
          signature={signature}
          onComplete={handleOnCompleteTransfer}
        />
      </MainContainer>
    </>
  );
}
