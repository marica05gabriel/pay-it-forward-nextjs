import { useEffect, useCallback } from 'react';

/***
 * From https://stackoverflow.com/a/69729166/12730428
 */
// @ts-ignore
export default function useDebounce(effect, dependencies, delay) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
