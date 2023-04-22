import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useDebounce } from '@/hooks/useDebounce';
import { useRefCurrent } from '@/hooks/useRefCurrent';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

const fetcher = async (url: string) => {
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export const useSearch = () => {
  const router = useRouter();
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

  useEffect(() => {
    setIsShowModal(false);
  }, [router]);

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

  // modal 활성화 시 searchInput 활성화
  const { ref: searchInputRef } = useRefCurrent<HTMLInputElement>((current) => {
    current.focus();
  }, isShowModal);

  return {
    response: { data: parseDatabaseItems(data), isLoading, error },
    handleChangeQuery,
    inputValue,
    hasSearchData,
    modal: { isShowModal, setIsShowModal },
    searchInputRef
  } as const;
};
