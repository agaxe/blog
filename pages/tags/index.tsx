import React from 'react';
import type { GetStaticProps, GetStaticPropsContext } from 'next';
import { Seo } from '@/components/common/Seo';
import { PageLayout } from '@/components/layout/PageLayout';
import { TagList } from '@/components/layout/TagList';
import { TagPageTitleSection } from '@/components/layout/TagPageTitleSection';
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
      <PageLayout>
        <TagPageTitleSection tagName={'Tags'} />
        <TagList tags={tags} />
      </PageLayout>
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
    console.error(error);

    return {
      notFound: true
    };
  }
};
