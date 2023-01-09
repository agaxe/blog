import React, { useCallback, useRef } from 'react';

export const useThrottle = () => {
  const timer = useRef<boolean>(false);

  const throttle = useCallback((callback: () => void, delay = 1000) => {
    if (!timer.current) {
      callback();
      timer.current = true;

      setTimeout(() => {
        timer.current = false;
      }, delay);
    }
  }, []);

  return throttle;
};
