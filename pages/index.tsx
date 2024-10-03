import React from 'react';
import type { GetStaticProps } from 'next';
import { SWRConfig } from 'swr';
import { Seo } from '@/components/common/Seo';
import { MainTitleSection } from '@/components/layout/MainTitleSection';
import { PageLayout } from '@/components/layout/PageLayout';
import { PostListContent } from '@/components/layout/PostListContent';
import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import type { TagsWithCntFallback } from '@/shared/types/TagsWithCntFallback';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import {
  ParseDatabaseItemsType,
  parseDatabaseItems
} from '@/utils/parseDatabaseItems';

interface HomeProps {
  items: ParseDatabaseItemsType[];
  fallback: TagsWithCntFallback;
}

export default function Home({ items = [], fallback }: HomeProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <PageLayout>
        <Seo />
        <MainTitleSection />
        <>
          {items.length ? (
            <PostListContent data={items} />
          ) : (
            <div>데이터가 존재하지 않습니다.</div>
          )}
        </>
      </PageLayout>
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [data, tags] = await Promise.all([
      await getPageItems({
        pageSize: 5
      }),
      await getTagsWithPostCnt()
    ]);

    const items = parseDatabaseItems(data);

    return {
      props: {
        items,
        fallback: {
          [SwrFallbackKeys.TAGS_WITH_CNT]: Object.fromEntries(tags)
        }
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true
    };
  }
};
