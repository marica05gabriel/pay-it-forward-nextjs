import { TitlePanel } from '@/components/panels/title-panel';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';

export default function DashboardPage() {
  const currentRoute = RoutesEnum.DASHBOARD;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

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
        </div>
      </main>
    </>
  );
}
