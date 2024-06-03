import { TitlePanel } from '@/app/_components/panels/title-panel';
import { MainContainer } from '@/app/_ui/MainContainer';
import { authOptions } from '@/app/_utils/auth-utils';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/app/_utils/routes-util';
import { EnrollBook } from '@/components/my-books/EnrollBook';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function EnrollBookPage() {
  const currentRoute = RoutesEnum.ENROLL_BOOK;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        <EnrollBook />
      </MainContainer>
    </>
  );
}
