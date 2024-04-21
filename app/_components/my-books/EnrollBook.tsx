import clsx from 'clsx';
import { TitlePanel } from '../panels/title-panel';
import { ROUTES, RoutesEnum } from '@/app/_utils/routes-util';

const isOverlapping = true;
export const EnrollBook = () => {
  const routeSegments = ROUTES[RoutesEnum.ENROLL_BOOK].split('/');
  routeSegments.shift();
  return (
    <>
      <div>On this page you can enroll books in the platform</div>
      <li>
        The enroll will be done by minting an PaperBookNFT which is an ERC1155
        token.
      </li>
      <li>A form will be present and the user should fill in the data.</li>
    </>
  );
};
