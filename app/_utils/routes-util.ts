import { toCapitalCase } from './string-utils';

export enum RoutesEnum {
  DASHBOARD,
  FIND_BOOKS,
  MY_BOOKS,
  ENROLL_BOOK,
  BOOK_REQUESTS,
  BOOK_TRANSFERS,
  TEST_ZONE,
}
export const ROUTES = {
  [RoutesEnum.DASHBOARD]: '/',
  [RoutesEnum.FIND_BOOKS]: '/find-books',
  [RoutesEnum.MY_BOOKS]: '/books/me',
  [RoutesEnum.ENROLL_BOOK]: '/books/me/enroll',
  [RoutesEnum.BOOK_REQUESTS]: '/book-requests',
  [RoutesEnum.BOOK_TRANSFERS]: '/ongoing-transfers',
  [RoutesEnum.TEST_ZONE]: '/test-zone',
};

export const ROUTE_LABELS = {
  [RoutesEnum.DASHBOARD]: 'Dashboard',
  [RoutesEnum.FIND_BOOKS]: 'Find books',
  [RoutesEnum.MY_BOOKS]: 'My Books',
  [RoutesEnum.ENROLL_BOOK]: 'Enroll a book',
  [RoutesEnum.BOOK_REQUESTS]: 'Book requests',
  [RoutesEnum.BOOK_TRANSFERS]: 'Ongoing Transfers',
  [RoutesEnum.TEST_ZONE]: 'Test zone',
};

export const ROUTE_ITEMS = [
  {
    label: ROUTE_LABELS[RoutesEnum.DASHBOARD],
    route: ROUTES[RoutesEnum.DASHBOARD],
  },
  {
    label: ROUTE_LABELS[RoutesEnum.FIND_BOOKS],
    route: ROUTES[RoutesEnum.FIND_BOOKS],
  },
  {
    label: ROUTE_LABELS[RoutesEnum.MY_BOOKS],
    route: ROUTES[RoutesEnum.MY_BOOKS],
  },
  {
    label: ROUTE_LABELS[RoutesEnum.ENROLL_BOOK],
    route: ROUTES[RoutesEnum.ENROLL_BOOK],
  },
  {
    label: ROUTE_LABELS[RoutesEnum.BOOK_REQUESTS],
    route: ROUTES[RoutesEnum.BOOK_REQUESTS],
  },
  {
    label: ROUTE_LABELS[RoutesEnum.BOOK_TRANSFERS],
    route: ROUTES[RoutesEnum.BOOK_TRANSFERS],
  },
  {
    label: ROUTE_LABELS[RoutesEnum.TEST_ZONE],
    route: ROUTES[RoutesEnum.TEST_ZONE],
  },
];

export const getRouteSettings = (route: RoutesEnum) => {
  return { label: ROUTE_LABELS[route], segments: buildRouteSegments(route) };
};

export type Segment = {
  label: string;
  route: string;
};
const buildRouteSegments = (route: RoutesEnum) => {
  const routeSegments = ROUTES[route].split('/');
  routeSegments.shift();

  if (routeSegments[0] === '') {
    return [{ label: '', route: '/' }];
  }

  return routeSegments.reduce((prevValue, currentSegment, index) => {
    const lastRoute = index > 0 ? prevValue[index - 1].route : '';
    const label = currentSegment[0] ? toCapitalCase(currentSegment) : '';
    const route = `${lastRoute}/${currentSegment}`;

    prevValue.push({
      label: label,
      route: route,
    });
    return prevValue;
  }, new Array<Segment>());
};
