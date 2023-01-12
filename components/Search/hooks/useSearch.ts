import React, { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useDebounce } from '@/hooks/useDebounce';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

const fetcher = async (url: string) => {
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export const useSearch = () => {
  const debounce = useDebounce();
  const [inputValue, setInputValue] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useSWR(
    query ? `/api/search?query=${query}` : null,
    fetcher,
    { fallbackData: [] }
  );

  const hasSearchData = useMemo(
    () => !Boolean(query && !data.length && !isLoading),
    [data.length, isLoading, query]
  );

  const handleChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setInputValue(value);

      debounce(() => {
        if (!value) {
          setQuery('');
          return;
        }

        setQuery(value);
      }, 800);
    },
    [debounce]
  );

  return {
    response: { data: parseDatabaseItems(data), isLoading, error },
    handleChangeQuery,
    inputValue,
    hasSearchData,
    modal: { isShowModal, setIsShowModal }
  } as const;
};
