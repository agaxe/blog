import { useEffect, useRef, useState } from 'react';
import { DatabaseQueryOption, PageItemsReturnType } from '@/lib/notion';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';

type usePageItemsOptions = Pick<DatabaseQueryOption, 'tagName'>;

export const usePageItems = (
  data: PageItemsReturnType,
  options?: usePageItemsOptions
) => {
  const { results, nextCursor = '', hasMore = false } = data;
  const baseRef = useRef<null | HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ParseDatabaseItemsType[]>([]);
  const [pagination, setPagination] = useState({
    nextCursor: '',
    hasMore: false
  });

  useEffect(() => {
    if (results) {
      setItems(results);
      setPagination({
        nextCursor,
        hasMore
      });
    }
  }, [hasMore, nextCursor, results]);

  useEffect(() => {
    if (!page) return;

    const tagName = options?.tagName || '';
    const startCursor = pagination.nextCursor || '';
    const hasMore = pagination.hasMore ? 1 : 0;

    const apiUrl = `/api/pagination?tagName=${tagName}&start_cursor=${startCursor}&has_more=${hasMore}`;

    async function getPageItems() {
      const response = await fetch(apiUrl)
        .then((res) => res.json())
        .then((res) => res.data);

      const { results, nextCursor, hasMore } = response;

      setItems((prev: any) => [...prev, ...results]);
      setPagination((prev) => ({
        ...prev,
        nextCursor,
        hasMore
      }));
    }

    //console.log('page', page + 1);
    getPageItems();

    return () => {
      setPage(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, options?.tagName]);

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

      return () => {
        observer.disconnect();
        setPage(0);
      };
    }
  }, [baseRef, results]);

  return { items, baseRef };
};
