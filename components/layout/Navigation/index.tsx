import React from 'react';
import { NavigationProps } from './interface';
import * as S from './styles';

export const Navigation = ({ className = '', options }: NavigationProps) => {
  const pagePath = options?.pagePath || '';
  const isMainPage = !options?.pageNum;

  // 메인 페이지이거나 (!pagePath), 페이지의 수가 2개 이상일 경우
  const isShowNav = !pagePath || Number(options?.pageLength) > 1;

  return (
    <>
      {isShowNav ? (
        <S.Navigation className={className}>
          {isMainPage ? (
            <S.ViewPages>
              <S.ViewPagesLink href='/pages/1'>VIEW PAGES</S.ViewPagesLink>
            </S.ViewPages>
          ) : (
            <>
              {options?.pageNum !== 1 && (
                <S.PrevArrowLink
                  href={`${pagePath}/pages/${options?.pageNum - 1}`}
                >
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
      ) : null}
    </>
  );
};
