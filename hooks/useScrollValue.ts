import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * - 페이지 이동 시, 페이지의 스크롤 값을 관리하는 custom hook 입니다.
 */
export const useScrollValue = () => {
  const router = useRouter();
  const scrollRef = useRef<Record<string, number>>({});
  const initIsScroll = useRef<boolean>(true);

  useEffect(() => {
    function setScrollValue() {
      if (!initIsScroll.current) {
        const scrollY = window.scrollY;

        scrollRef.current[router.asPath] = scrollY;
        //console.log(router.asPath, scrollY);
      }

      initIsScroll.current = false;
    }

    window.addEventListener('scroll', setScrollValue);

    return () => {
      window.removeEventListener('scroll', setScrollValue);
    };
  }, [router]);

  useEffect(() => {
    router.beforePopState(() => {
      initIsScroll.current = true;
      return true;
    });

    //console.log('scrollRef.current', scrollRef.current);
    window.scrollTo(0, scrollRef.current[router.asPath]);
  }, [router]);
};
