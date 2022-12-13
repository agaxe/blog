import React from 'react';
import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { Layout } from '@/components/layout/Layout';
import { TagHeader } from '@/components/layout/TagHeader';
import {
  parseDatabaseItems,
  ParseDatabaseItemsType
} from '@/utils/parseDatabaseItems';
import { convertPascalCase } from '@/utils/convertPascalCase';
import { getDatabaseTagItems, getDatabaseItems } from '@/lib/notion';

interface TagNameProps {
  data: ParseDatabaseItemsType[];
  tagName: string;
}

export default function tagName({ tagName, data }: TagNameProps) {
  return (
    <Layout>
      <TagNameWrap>
        <TagHeader tagName={convertPascalCase(String(tagName))} />
        <NotionPageList data={data} />
      </TagNameWrap>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  if (!process.env.NOTION_DB_ID)
    return {
      notFound: true
    };

  const tagName = context?.params?.tagName as string;
  const dbItems = await getDatabaseItems(process.env.NOTION_DB_ID, {
    tagName
  });
  const data = parseDatabaseItems(dbItems);

  return {
    props: {
      tagName,
      data
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DB_ID;
  const tagItems = await getDatabaseTagItems(databaseId as string);
  const paths = tagItems.map(({ name: tagName }: any) => ({
    params: {
      tagName
    }
  }));

  return {
    paths,
    fallback: true
  };
};

const TagNameWrap = styled.div`
  display: grid;
  gap: 48px;
`;
