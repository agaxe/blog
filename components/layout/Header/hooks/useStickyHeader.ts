import { useEffect, useState } from 'react';

export const useStickyHeader = () => {
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

      if (scrollY >= headerHeight) {
        setIsSticky(prevScrollY > scrollY);
        setPrevScrollY(scrollY);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return { isSticky };
};
