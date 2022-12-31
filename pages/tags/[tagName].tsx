import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import styled from 'styled-components';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { TagHeader } from '@/components/layout/TagHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { NotionPageListSkeleton } from '@/components/notion/NotionPageList/Skeleton';
import { usePageItems } from '@/hooks/usePageItems';
import { PageItemsReturnType, getDatabaseItems } from '@/lib/notion/pages';
import { getPathTagItems } from '@/lib/notion/tags';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface TagNameProps {
  tagName: string;
  data: PageItemsReturnType;
}

export default function TagName({ tagName, data }: TagNameProps) {
  const { items, baseRef, pagination } = usePageItems(data, { tagName });

  return (
    <>
      <Seo title={`tag: ${tagName}`} />
      <Layout>
        <TagNameWrap>
          <TagHeader tagName={convertPascalCase(String(tagName))} />
          <div>
            <NotionPageList data={items} />
            <div
              ref={baseRef}
              style={{
                display: items.length && pagination.hasMore ? 'block' : 'none'
              }}
            >
              <NotionPageListSkeleton />
            </div>
          </div>
        </TagNameWrap>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const tagName = context?.params?.tagName as string;

  try {
    const dbItems = await getDatabaseItems(databaseId, {
      tagName
    });

    const { nextCursor, hasMore, results } = dbItems;

    const data = parseDatabaseItems(results);

    return {
      props: {
        tagName,
        data: {
          nextCursor,
          hasMore,
          results: data
        }
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPathTagItems();

  return {
    paths,
    fallback: 'blocking'
  };
};

const TagNameWrap = styled.div`
  display: grid;
  gap: 48px;
`;
