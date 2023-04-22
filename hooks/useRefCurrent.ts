import { useEffect, useRef } from 'react';

export const useRefCurrent = <T>(
  callback: (current: T) => void,
  isCondition: boolean = true
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (isCondition && ref?.current) {
      callback(ref.current);
    }
  }, [callback, ref, isCondition]);

  return { ref };
};
