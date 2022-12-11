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

interface HomeProps {
  data: ParseDatabaseItemsType[];
}

export default function Home({ data }: HomeProps) {
  return (
    <Layout>
      <HomePage>
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
  if (!process.env.NOTION_DB_ID)
    return {
      notFound: true
    };

  const dbItems = await getDatabaseItems(process.env.NOTION_DB_ID);
  const data = parseDatabaseItems(dbItems);

  return {
    props: {
      data
    },
    revalidate: ISR_REVALIDATE_TIME
  };
};

const HomePage = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  padding: 16px;
`;
