import { ROUTES, RoutesEnum } from '@/app/_utils/routes-util';

const isOverlapping = true;
export const ListBooks = () => {
  const routeSegments = ROUTES[RoutesEnum.MY_BOOKS].split('/');
  routeSegments.shift();

  return (
    <>
      <div>The listing page of the books owned by the user.</div>
    </>
  );
};
