import { TitlePanel } from '@/components/panels/title-panel';
import { TUKPage } from '@/ui/TUKPage';
import { RoutesEnum, getRouteSettings } from '../_utils/routes-util';

export default async function OngoingTransfersPage() {
  const currentRoute = RoutesEnum.BOOK_TRANSFERS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <TUKPage>
        <div>OngoingTransfersPage</div>
      </TUKPage>
    </>
  );
}
