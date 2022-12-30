import React, { useEffect, useState } from 'react';
import type { GetStaticProps } from 'next';
import styled from 'styled-components';
import { Layout } from '@/components/layout/Layout';
import { MainHeader } from '@/components/layout/MainHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { getDatabaseItems } from '@/lib/notion';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import {
  ParseDatabaseItemsType,
  parseDatabaseItems
} from '@/utils/parseDatabaseItems';

interface HomeProps {
  data: {
    results: ParseDatabaseItemsType[];
    startCursor: string;
    hasMore: boolean;
  };
}

export default function Home({ data }: HomeProps) {
  const { results, startCursor, hasMore } = data;
  const [page, setPage] = useState(0);
  const [pageItems, setPageItems] = useState<any>(results);
  const [pagination, setPagination] = useState({
    startCursor,
    hasMore
  });

  useEffect(() => {
    if (!page || (!pagination.hasMore && !pagination.startCursor)) return;

    async function getPageItems() {
      const response = await fetch(
        `${`/api/pagination?start_cursor=${pagination.startCursor}&has_more=${
          pagination.hasMore ? 1 : 0
        }`}`
      )
        .then((res) => res.json())
        .then((res) => res.data);

      setPageItems((prev: any) => [...prev, ...response.results]);
      setPagination((prev) => ({
        ...prev,
        startCursor: response.startCursor,
        hasMore: response.hasMore
      }));
    }

    getPageItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Layout>
      <HomePage>
        <button onClick={() => setPage(page + 1)}>버튼</button>
        <MainHeader />
        {pageItems.length ? (
          <NotionPageList data={pageItems} />
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </HomePage>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;

  try {
    const dbItems = await getDatabaseItems(databaseId);
    const data = parseDatabaseItems(dbItems.results);

    const { startCursor, hasMore } = dbItems;

    return {
      props: {
        data: {
          startCursor,
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
