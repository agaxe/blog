import React, { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

type resultType = ReturnType<typeof parseDatabaseItems>;

export const useSearch = () => {
  const debounce = useDebounce();
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<resultType>([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const fetcher = useCallback(async (value: string) => {
    return await fetch(`/api/search?query=${value}`)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.error(err));
  }, []);

  const handleChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setInputValue(value);

      if (!value) {
        setResults([]);
        return;
      }

      debounce(async () => {
        const resResults = await fetcher(value);
        setResults(parseDatabaseItems(resResults));
      }, 800);
    },
    [debounce, fetcher]
  );

  return {
    results,
    handleChangeQuery,
    inputValue,
    modal: { isShowModal, setIsShowModal }
  } as const;
};
