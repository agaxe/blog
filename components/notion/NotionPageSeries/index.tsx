import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NotionPageSeriesProps } from './interface';
import * as S from './styles';

export const NotionPageSeries = ({ title, posts }: NotionPageSeriesProps) => {
  const { query } = useRouter();
  const [isShowList, setIsShowList] = useState(false);

  return (
    <S.Wrap>
      <S.ContentContainer>
        <S.Title>{title}</S.Title>
        {isShowList && (
          <S.List>
            {posts.length > 0 &&
              posts.map((v: any, i: number) => (
                <S.Item key={v.id}>
                  <S.Link href={`/${v.id}`} $isActive={v.id === query?.pageId}>
                    <S.PostName>
                      {i + 1}. {v.title}
                    </S.PostName>
                  </S.Link>
                </S.Item>
              ))}
          </S.List>
        )}
      </S.ContentContainer>
      <S.ShowHideToggleBtn onClick={() => setIsShowList((prev) => !prev)}>
        <S.ShowHideToggleBtnIcon name='chevron-down' isShowList={isShowList} />
        <S.ShowHideToggleBtnText>
          {`목록 ${isShowList ? '닫기' : '열기'}`}
        </S.ShowHideToggleBtnText>
      </S.ShowHideToggleBtn>
    </S.Wrap>
  );
};
