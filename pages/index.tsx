import React from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { getDatabaseItems } from '@/lib/notion';
import {
  parseDatabaseItems,
  ParseDatabaseItemsType
} from '@/utils/parseDatabaseItems';
import { ISR_REVALIDATE_TIME } from '@/shared/variable';

interface HomeProps {
  data: ParseDatabaseItemsType[];
}

export default function Home({ data }: HomeProps) {
  return (
    <>
      <h2>메인 페이지</h2>
      {data.length ? (
        <ul>
          {data.map((item: ParseDatabaseItemsType) => (
            <li key={item.id}>
              <Link href={`/post/${item.id}`}>
                <h2>{item.title}</h2>
                <ul>
                  {item.tags.map((it) => (
                    <li key={it.id}>{it.name}</li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>데이터가 존재하지 않습니다.</div>
      )}
    </>
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
