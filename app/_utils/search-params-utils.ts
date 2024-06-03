export const getParamOrDefault = (
  searchParams: { [key: string]: string | string[] | undefined },
  key: string,
  defaultValue: number
) => {
  let result = defaultValue;
  const param = searchParams[key];
  if (typeof param === 'string') {
    result = parseInt(param);
  }
  if (isNaN(result)) {
    return defaultValue;
  }
  return result;
};
