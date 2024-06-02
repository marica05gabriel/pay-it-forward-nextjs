import clsx from 'clsx';
import { TitlePanel } from '../panels/title-panel';
import { ROUTES, RoutesEnum } from '@/app/_utils/routes-util';
import { EnrollBookForm } from '@/app/_ui/forms/EnrollBookForm';

const isOverlapping = true;
export const EnrollBook = () => {
  const routeSegments = ROUTES[RoutesEnum.ENROLL_BOOK].split('/');
  routeSegments.shift();
  return <EnrollBookForm />;
};
