import { TitlePanel } from '@/components/panels/title-panel';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const currentRoute = RoutesEnum.DASHBOARD;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const session = await getServerSession(authOptions);

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='text-gray-700'>
          <h1>Hello happy reader</h1>
          <div>
            Here will be placed some general information about the project and
            features the users can access.
          </div>
          <div>
            <p>Session: {session?.user?.name}</p>
          </div>
        </div>
      </main>
    </>
  );
}
