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
      const scrollY = window.scrollY;

      throttle(() => {
        if (window.scrollY >= headerHeight) {
          setIsSticky(prevScrollY > scrollY);
          setPrevScrollY(scrollY);
        }
      }, 200);

      if (scrollY <= headerHeight) {
        setIsSticky(true);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY, throttle]);

  return { isSticky };
};
