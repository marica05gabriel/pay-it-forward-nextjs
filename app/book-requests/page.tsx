import { TitlePanel } from '@/components/panels/title-panel';
import { TUKPage } from '@/ui/TUKPage';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';

export default async function BookRequestsPage() {
  const currentRoute = RoutesEnum.BOOK_REQUESTS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(currentRoute);

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <TUKPage>
        <div className='container'>BookRequestsPage</div>
      </TUKPage>
    </>
  );
}
