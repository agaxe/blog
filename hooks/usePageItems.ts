import { useEffect, useRef, useState } from 'react';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';

function getPageItems(
  data: ParseDatabaseItemsType[],
  start: number,
  end: number
) {
  return data.slice(start, end);
}

export const usePageItems = (data: ParseDatabaseItemsType[] = []) => {
  const pageLimit = useRef(10);
  const baseRef = useRef<null | HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ParseDatabaseItemsType[]>([
    ...getPageItems(data, 0, pageLimit.current)
  ]);

  useEffect(() => {
    if (page) {
      console.log('page', page);
      const start = page * pageLimit.current;
      const end = page * pageLimit.current + pageLimit.current;
      const list = getPageItems(data, start, end);
      setItems((prev) => [...prev, ...list]);
    }
  }, [data, page]);

  useEffect(() => {
    if (baseRef.current) {
      const options = {
        root: null,
        rootMargin: '0px'
      };

      const observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      }, options);
      observer.observe(baseRef.current);

      return () => observer.disconnect();
    }
  }, [baseRef]);

  return { items, baseRef };
};
