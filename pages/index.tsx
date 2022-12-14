import React from 'react';
import styled from 'styled-components';
import type { GetStaticProps } from 'next';
import { getDatabaseItems } from '@/lib/notion';
import {
  parseDatabaseItems,
  ParseDatabaseItemsType
} from '@/utils/parseDatabaseItems';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { Layout } from '@/components/layout/Layout';
import { MainHeader } from '@/components/layout/MainHeader';

interface HomeProps {
  data: ParseDatabaseItemsType[];
}

export default function Home({ data }: HomeProps) {
  return (
    <Layout>
      <HomePage>
        <MainHeader />
        {data.length ? (
          <NotionPageList data={data} />
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
    const data = parseDatabaseItems(dbItems);

    return {
      props: {
        data
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
