import React from 'react';
import type { GetStaticProps } from 'next';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { MainHeader } from '@/components/layout/MainHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import {
  ParseDatabaseItemsType,
  parseDatabaseItems
} from '@/utils/parseDatabaseItems';

interface HomeProps {
  items: ParseDatabaseItemsType[];
}

export default function Home({ items = [] }: HomeProps) {
  return (
    <Layout>
      <Seo />
      <MainHeader />
      <>
        {items.length ? (
          <NotionPageList data={items} />
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getPageItems({
      pageSize: 5
    });
    const items = parseDatabaseItems(data);

    return {
      props: {
        items
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
