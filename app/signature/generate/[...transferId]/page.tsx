import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../_utils/auth-utils';
import { BookTransfer, BookType } from '../../../_utils/types';
import { redirect } from 'next/navigation';
import _ from 'lodash';
import { GenerateSignature } from '@/app/_components/signature/GenerateSignature';

const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;

export default async function GenerateSignaturePage({
  params,
}: {
  params: { transferId: string };
}) {
  const currentRoute = RoutesEnum.GENERATE_SIGNATURE;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? '';
  if (!session || _.isEmpty(username)) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }

  const transferId = params.transferId[0];

  const response = await fetch(
    `${TRANSFERS_URL}/byId/${transferId}/${username}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.status !== 200) {
    console.error('GET TRANSFER BY ID ERROR');
    console.error(response);
    throw Error('GET TRANSFER BY ID ERROR');
  }
  const transfer: BookTransfer = await response.json();
  console.log('TRANSFER FOUND');
  console.log(transfer);
  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        <GenerateSignature transfer={transfer} />
      </MainContainer>
    </>
  );
}
