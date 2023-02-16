import React from 'react';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { MainHeader } from '@/components/layout/MainHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';
import { getPaginationLength } from '@/utils/getPaginationLength';
import { getPaginationPosts } from '@/utils/getPaginationPosts';
import { getPostsWithJson } from '@/utils/getPostsWithJson';
import { ParseDatabaseItemsType } from '@/utils/parseDatabaseItems';

interface PageProps {
  items: ParseDatabaseItemsType[];
  pageLength: number;
}

export default function Page({ items = [], pageLength = 0 }: PageProps) {
  const router = useRouter();

  const { pageNum } = router.query;

  return (
    <Layout>
      <div>
        <MainHeader />
        <div>
          {items.length ? (
            <NotionPageList data={items} />
          ) : (
            <div>데이터가 존재하지 않습니다.</div>
          )}
        </div>
      </div>
      {pageNum !== '1' && <Link href='/page/1'>prev page</Link>}
      {Number(pageNum) !== pageLength && (
        <Link href={`/page/${Number(pageNum) + 1}`}>next page</Link>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const pageNum = Number(params?.pageNum) || 0;

  try {
    const posts = getPostsWithJson();
    const items = getPaginationPosts(posts, pageNum);
    const pageLength = getPaginationLength(posts);

    // console.log('pageNum', pageNum);
    // console.log('items', items);
    return {
      props: {
        items,
        pageLength
      },
      revalidate: ISR_REVALIDATE_TIME
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPostsWithJson();
  const pageLength = getPaginationLength(posts);
  const params = [...Array(pageLength)].map((v, i) => ({
    params: { pageNum: String(i + 1) }
  }));

  return {
    paths: params,
    fallback: true
  };
};
