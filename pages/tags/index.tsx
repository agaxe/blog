import React from 'react';
import type { GetStaticProps, GetStaticPropsContext } from 'next';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { TagList } from '@/components/layout/TagList';
import { TagPageHeader } from '@/components/layout/TagPageHeader';
import type { NotionTagListProps } from '@/components/notion/NotionTagList';
import { getDatabaseTagItems } from '@/lib/notion/tags';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

interface PageProps {
  tags: NotionTagListProps['tags'];
}

export default function TagPage({ tags = [] }: PageProps) {
  return (
    <>
      <Seo title={'tags'} />
      <Layout>
        <TagPageHeader tagName={'Tags'} />
        <TagList tags={tags} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  try {
    const tags = await getDatabaseTagItems();

    return {
      props: { tags },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
