import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import styled from 'styled-components';
import { Seo } from '@/components/common/Seo';
import { Layout } from '@/components/layout/Layout';
import { TagHeader } from '@/components/layout/TagHeader';
import { NotionPageList } from '@/components/notion/NotionPageList';
import { getDatabaseItems, getDatabaseTagItems } from '@/lib/notion';
import { convertPascalCase } from '@/utils/convertPascalCase';
import {
  ParseDatabaseItemsType,
  parseDatabaseItems
} from '@/utils/parseDatabaseItems';

interface TagNameProps {
  data: ParseDatabaseItemsType[];
  tagName: string;
}

export default function tagName({ tagName, data }: TagNameProps) {
  return (
    <>
      <Seo title={`tag: ${tagName}`} />
      <Layout>
        <TagNameWrap>
          <TagHeader tagName={convertPascalCase(String(tagName))} />
          <NotionPageList data={data} />
        </TagNameWrap>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const tagName = context?.params?.tagName as string;

  try {
    const dbItems = await getDatabaseItems(databaseId, {
      tagName
    });
    const data = parseDatabaseItems(dbItems);

    return {
      props: {
        tagName,
        data
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DB_ID as string;
  const tagItems = await getDatabaseTagItems(databaseId);
  const paths = tagItems.map(({ name: tagName }: any) => ({
    params: {
      tagName: tagName.toLowerCase()
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

const TagNameWrap = styled.div`
  display: grid;
  gap: 48px;
`;
