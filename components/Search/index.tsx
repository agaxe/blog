import React from 'react';
import { useSearch } from './hooks/useSearch';
import * as S from './styles';

export const Search = () => {
  const {
    response: { data: results, isLoading },
    handleChangeQuery,
    inputValue,
    hasSearchData,
    modal: { isShowModal, setIsShowModal },
    searchInputRef
  } = useSearch();

  return (
    <S.Search>
      <S.Button onClick={() => setIsShowModal(true)} data-testid='search-btn'>
        <S.SearchIcon name='search' />
      </S.Button>
      {isShowModal && (
        <S.Modal>
          <S.ModalBg onClick={() => setIsShowModal(false)} />
          <S.ModalInner>
            <S.InputWrap>
              <S.SearchBtnArea>
                {isLoading ? (
                  <S.SearchLoading data-testid='search-loading-icon' />
                ) : (
                  <S.InputSearchIcon name='search' />
                )}
              </S.SearchBtnArea>
              <S.Input
                type='text'
                value={inputValue}
                onChange={handleChangeQuery}
                placeholder='Search'
                ref={searchInputRef}
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
    </S.Search>
  );
};
