import { useEffect, useState } from 'react';
import { useThrottle } from '@/hooks/useThrottle';

export const useStickyHeader = () => {
  const throttle = useThrottle();
  const [isSticky, setIsSticky] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const headerHeight = Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--layout-header-h')
        .replace('px', '')
    );

    function handleScroll() {
      throttle(() => {
        const scrollY = window.scrollY;

        if (scrollY >= headerHeight) {
          setIsSticky(prevScrollY > scrollY);
          setPrevScrollY(scrollY);
        }
      }, 200);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY, throttle]);

  return { isSticky };
};
