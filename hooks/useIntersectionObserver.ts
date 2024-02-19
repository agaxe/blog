import { useEffect, useRef, useState } from 'react';

const options = {
  root: null,
  rootMargin: '0px'
};

export const useIntersectionObserver = <T extends Element>() => {
  const baseRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!baseRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      setIsIntersecting(target.isIntersecting);
    }, options);

    observer.observe(baseRef.current);

    return () => {
      observer.disconnect();
      setIsIntersecting(false);
    };
  }, []);

  return { baseRef, isIntersecting };
};
