import React from 'react';
import { NavigationProps } from './interface';
import * as S from './styles';

export const Navigation = ({ options }: NavigationProps) => {
  const pagePath = options?.pagePath || '';

  return (
    <S.Navigation>
      {!options?.pageNum ? (
        <S.ViewPages>
          <S.ViewPagesLink href='/pages/1'>VIEW PAGES</S.ViewPagesLink>
        </S.ViewPages>
      ) : (
        <>
          {options?.pageNum !== 1 && (
            <S.PrevArrowLink href={`${pagePath}/pages/${options?.pageNum - 1}`}>
              <S.ArrowIcon name='arrow-left' />
            </S.PrevArrowLink>
          )}
          {options?.pageNum !== options?.pageLength && (
            <S.NextArrowLink
              href={`${pagePath}/pages/${String(options?.pageNum + 1)}`}
            >
              <S.ArrowIcon name='arrow-right' />
            </S.NextArrowLink>
          )}
        </>
      )}
    </S.Navigation>
  );
};
