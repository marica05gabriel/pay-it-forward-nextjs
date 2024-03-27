export enum RoutesEnum {
  DASHBOARD,
  FIND_BOOKS,
  MY_BOOKS,
  ENROLL_BOOK,
  FIND_PRODUCTS,
  TEST_ZONE
}
export const ROUTES = {
  [RoutesEnum.DASHBOARD]: "/",
  [RoutesEnum.FIND_BOOKS]: "/books",
  [RoutesEnum.MY_BOOKS]: "/books/me",
  [RoutesEnum.ENROLL_BOOK]: "/books/me/enroll",
  [RoutesEnum.TEST_ZONE]: "/test-zone",
};
