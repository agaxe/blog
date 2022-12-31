import React from 'react';
import type { GetStaticProps } from 'next';
import styled from 'styled-components';
import { Layout } from '@/components/layout/Layout';
import { MainHeader } from '@/components/layout/MainHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { usePageItems } from '@/hooks/usePageItems';
import { PageItemsReturnType, getDatabaseItems } from '@/lib/notion/pages';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface HomeProps {
  data: PageItemsReturnType;
}

export default function Home({ data }: HomeProps) {
  const { items, baseRef, pagination } = usePageItems(data);

  return (
    <Layout>
      <HomePage>
        <MainHeader />
        {data.results.length ? (
          <NotionPageList data={items} />
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
        <div
          ref={baseRef}
          style={{
            display: items.length && pagination.hasMore ? 'block' : 'none'
          }}
        />
      </HomePage>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;

  try {
    const dbItems = await getDatabaseItems(databaseId);

    const { nextCursor, hasMore, results } = dbItems;

    const data = parseDatabaseItems(results);

    return {
      props: {
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

const HomePage = styled.div`
  display: grid;
  gap: 48px;
`;
