import React from 'react';
import { useSearch } from './hooks/useSearch';
import * as S from './styles';

export const Search = () => {
  const {
    response: { data: results, isLoading },
    handleChangeQuery,
    inputValue,
    hasSearchData,
    modal: { isShowModal, setIsShowModal }
  } = useSearch();

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
              <S.SearchBtnArea>
                {isLoading ? (
                  <S.SearchLoading />
                ) : (
                  <S.InputSearchIcon name='search' />
                )}
              </S.SearchBtnArea>
              <S.Input
                type='text'
                value={inputValue}
                onChange={handleChangeQuery}
                placeholder='Search'
              />
            </S.InputWrap>
            {hasSearchData ? (
              <S.ResultList>
                {results.map((item: any) => (
                  <S.ResultItem key={item.id}>
                    <S.ResultLink href={`/${item.id}`}>
                      {item.title}
                    </S.ResultLink>
                  </S.ResultItem>
                ))}
              </S.ResultList>
            ) : (
              <S.NotSearchResult>
                <p>검색 결과가 없습니다 :(</p>
              </S.NotSearchResult>
            )}
          </S.ModalInner>
        </S.Modal>
      )}
    </div>
  );
};
