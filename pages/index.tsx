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

const HomePage = styled.div`
  max-width: var(--layout-inner-w);
  margin: 0 auto;
  height: 100%;
  padding-left: var(--layouy-side-pd);
  padding-right: var(--layouy-side-pd);
  display: grid;
  gap: 48px;
`;
