import { useCallback, useRef } from 'react';

export const useDebounce = () => {
  let timer = useRef<ReturnType<typeof setTimeout>>();

  return useCallback((callback: any, delay: number) => {
    if (timer) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback();
    }, delay);
  }, []);
};
