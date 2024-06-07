import { toCapitalCase } from './string-utils';

export enum RoutesEnum {
  DASHBOARD,
  FIND_BOOKS,
  MY_BOOKS,
  ENROLL_BOOK,
  TRANSFER_REQUESTS,
  BOOK_TRANSFERS,
  GENERATE_SIGNATURE,
  VALIDATE_SIGNATURE,
  CHAT,
  TEST_ZONE,
  UNAUTHORIZED,
}

export const NAVBAR_ROUTES: RoutesEnum[] = [
  RoutesEnum.DASHBOARD,
  RoutesEnum.FIND_BOOKS,
  RoutesEnum.MY_BOOKS,
  RoutesEnum.ENROLL_BOOK,
  RoutesEnum.TRANSFER_REQUESTS,
  RoutesEnum.BOOK_TRANSFERS,
  RoutesEnum.CHAT,
  RoutesEnum.TEST_ZONE,
];

export const ROUTES = {
  [RoutesEnum.DASHBOARD]: '/',
  [RoutesEnum.FIND_BOOKS]: '/find-books',
  [RoutesEnum.MY_BOOKS]: '/books/me',
  [RoutesEnum.ENROLL_BOOK]: '/books/me/enroll',
  [RoutesEnum.TRANSFER_REQUESTS]: '/transfer-requests',
  [RoutesEnum.BOOK_TRANSFERS]: '/ongoing-transfers',
  [RoutesEnum.GENERATE_SIGNATURE]: '/signature/generate',
  [RoutesEnum.VALIDATE_SIGNATURE]: '/signature/validate',
  [RoutesEnum.CHAT]: '/chat',
  [RoutesEnum.TEST_ZONE]: '/test-zone',
  [RoutesEnum.UNAUTHORIZED]: '/unauthorized',
};

export const ROUTE_LABELS = {
  [RoutesEnum.DASHBOARD]: 'Dashboard',
  [RoutesEnum.FIND_BOOKS]: 'Find books',
  [RoutesEnum.MY_BOOKS]: 'My Books',
  [RoutesEnum.ENROLL_BOOK]: 'Book enroll',
  [RoutesEnum.TRANSFER_REQUESTS]: 'Transfer requests',
  [RoutesEnum.BOOK_TRANSFERS]: 'Ongoing Transfers',
  [RoutesEnum.GENERATE_SIGNATURE]: 'Generate Signature',
  [RoutesEnum.VALIDATE_SIGNATURE]: 'Validate Signature',
  [RoutesEnum.CHAT]: 'Open chats',
  [RoutesEnum.TEST_ZONE]: 'Test zone',
  [RoutesEnum.UNAUTHORIZED]: 'UNAUTHORIZED',
};

export const ROUTE_ITEMS = [
  {
    enum: RoutesEnum.DASHBOARD,
    label: ROUTE_LABELS[RoutesEnum.DASHBOARD],
    route: ROUTES[RoutesEnum.DASHBOARD],
  },
  {
    enum: RoutesEnum.FIND_BOOKS,
    label: ROUTE_LABELS[RoutesEnum.FIND_BOOKS],
    route: ROUTES[RoutesEnum.FIND_BOOKS],
  },
  {
    enum: RoutesEnum.MY_BOOKS,
    label: ROUTE_LABELS[RoutesEnum.MY_BOOKS],
    route: ROUTES[RoutesEnum.MY_BOOKS],
  },
  {
    enum: RoutesEnum.ENROLL_BOOK,
    label: ROUTE_LABELS[RoutesEnum.ENROLL_BOOK],
    route: ROUTES[RoutesEnum.ENROLL_BOOK],
  },
  {
    enum: RoutesEnum.TRANSFER_REQUESTS,
    label: ROUTE_LABELS[RoutesEnum.TRANSFER_REQUESTS],
    route: ROUTES[RoutesEnum.TRANSFER_REQUESTS],
  },
  {
    enum: RoutesEnum.BOOK_TRANSFERS,
    label: ROUTE_LABELS[RoutesEnum.BOOK_TRANSFERS],
    route: ROUTES[RoutesEnum.BOOK_TRANSFERS],
  },
  {
    enum: RoutesEnum.GENERATE_SIGNATURE,
    label: ROUTE_LABELS[RoutesEnum.GENERATE_SIGNATURE],
    route: ROUTES[RoutesEnum.GENERATE_SIGNATURE],
  },
  {
    enum: RoutesEnum.VALIDATE_SIGNATURE,
    label: ROUTE_LABELS[RoutesEnum.VALIDATE_SIGNATURE],
    route: ROUTES[RoutesEnum.VALIDATE_SIGNATURE],
  },
  {
    enum: RoutesEnum.CHAT,
    label: ROUTE_LABELS[RoutesEnum.CHAT],
    route: ROUTES[RoutesEnum.CHAT],
  },
  {
    enum: RoutesEnum.TEST_ZONE,
    label: ROUTE_LABELS[RoutesEnum.TEST_ZONE],
    route: ROUTES[RoutesEnum.TEST_ZONE],
  },
];

export const NAVBAR_ROUTE_ITEMS = ROUTE_ITEMS.filter((route) =>
  NAVBAR_ROUTES.includes(route.enum)
);

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
