import React from 'react';
import type { GetStaticProps, GetStaticPropsContext } from 'next';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { TagList } from '@/components/layout/TagList';
import { TagPageHeader } from '@/components/layout/TagPageHeader';
import { getTagItems } from '@/lib/notion/tags/getTagItems';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import type { TagsWithCnt } from '@/shared/types/TagsWithCnt';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

interface PageProps {
  tags: TagsWithCnt;
}

export default function TagPage({ tags = [] }: PageProps) {
  return (
    <>
      <Seo title='Tags' />
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
    const tags = await getTagItems();
    const tagsMap = await getTagsWithPostCnt();

    return {
      props: {
        tags: tags.map((tag) => ({
          ...tag,
          cnt: tagsMap.get(tag.name.toLowerCase())
        }))
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
