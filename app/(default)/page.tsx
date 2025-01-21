import { notFound } from 'next/navigation';
import { MainTitleSection } from '@/components/layout/MainTitleSection';
import { PostListContent } from '@/components/layout/PostListContent';
import { getPageItems } from '@/lib/notion/pages/getPageItems';
import { getTagsWithPostCnt } from '@/lib/notion/tags/getTagsWithPostCnt';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

export default async function Home() {
  const { posts, tags } = await getData();

  return (
    <>
      <MainTitleSection />
      <>
        {posts.length ? (
          <PostListContent data={posts} tags={tags} />
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </>
    </>
  );
}

const getData = async () => {
  try {
    const [data, tags] = await Promise.all([
      await getPageItems({
        pageSize: 5
      }),
      await getTagsWithPostCnt()
    ]);
    const posts = parseDatabaseItems(data);

    return { posts, tags };
  } catch (error) {
    console.log(error);
    notFound();
  }
};
