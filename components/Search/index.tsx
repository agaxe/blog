import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import * as S from './styles';

type resultType = ReturnType<typeof parseDatabaseItems>;

export const Search = () => {
  const debounce = useDebounce();
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<resultType>([]);
  const [isShowModal, setIsShowModal] = useState(false);

  function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setInputValue(value);

    debounce(async () => {
      const result = await fetch(`/api/search?query=${value}`)
        .then((data) => data.json())
        .then((res) => res.data)
        .catch((err) => console.error(err));

      setResult(parseDatabaseItems(result));
    }, 300);
  }

  return (
    <div>
      <S.Button onClick={() => setIsShowModal(true)}>
        <S.SearchIcon name='search' />
      </S.Button>
      {isShowModal && (
        <S.Modal>
          <S.ModalBg onClick={() => setIsShowModal(false)} />
          <S.ModalInner>
            <S.InputWrap>
              <S.InputSearchIcon name='search' />
              <S.Input
                type='text'
                value={inputValue}
                onChange={handleChangeQuery}
                placeholder='Search'
              />
            </S.InputWrap>
            <S.ResultList>
              {result.map((item: any) => (
                <S.ResultItem key={item.id}>
                  <S.ResultLink href={`/${item.id}`}>{item.title}</S.ResultLink>
                </S.ResultItem>
              ))}
            </S.ResultList>
          </S.ModalInner>
        </S.Modal>
      )}
    </div>
  );
};
