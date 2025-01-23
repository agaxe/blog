import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TagList } from '@/components/layout/TagList';
import { TagPageTitleSection } from '@/components/layout/TagPageTitleSection';
import { getTagItems } from '@/lib/notion/tags/getTagItems';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

export const revalidate = ISR_REVALIDATE_TIME;

export const metadata: Metadata = {
  title: 'Tags'
};

export default async function TagPage() {
  const tags = (await getTags()) ?? [];

  return (
    <>
      <TagPageTitleSection tagName={'Tags'} />
      <TagList tags={tags} />
    </>
  );
}

const getTags = async () => {
  try {
    const tags = await getTagItems();
    const tagsMap = await getTagsWithPostCnt();

    return tags.map((tag) => ({
      ...tag,
      cnt: tagsMap.get(tag.name.toLowerCase()) ?? 0
    }));
  } catch (error) {
    notFound();
  }
};
