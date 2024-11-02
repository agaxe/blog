import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import Link from 'next/link';
import type { NotionComponents } from 'react-notion-x';
import { NotionPageSeries } from '@/components/notion/NotionPageSeries';
import { NotionTagItem } from '@/components/notion/NotionTagItem';
import { PostSeries } from '@/shared/types/PostSeries';
import { formatDate } from '@/utils/formatDate';

interface Args {
  postSeries?: PostSeries;
}

const getPropsComponents = ({
  postSeries
}: Args): Partial<NotionComponents> => {
  return {
    nextLink: Link,
    nextImage: Image,
    Code: dynamic(() =>
      import('react-notion-x/build/third-party/code').then(async (m) => {
        await Promise.all([
          import('prismjs/components/prism-git'),
          import('prismjs/components/prism-graphql.js'),
          import('prismjs/components/prism-markdown.js'),
          import('prismjs/components/prism-python.js'),
          import('prismjs/components/prism-sass.js'),
          import('prismjs/components/prism-scss.js'),
          import('prismjs/components/prism-sql.js')
        ]);
        return m.Code;
      })
    ),
    Collection: dynamic(() =>
      import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
      )
    ),
    propertyCreatedTimeValue: (dateProperty) => {
      return formatDate(dateProperty.block.created_time);
    },
    propertyLastEditedTimeValue: (dateProperty) => {
      return formatDate(dateProperty.block.last_edited_time);
    },
    // 텍스트 속성 return null
    propertyTextValue: () => {
      return null;
    },
    propertyRelationValue: () => {
      if (!postSeries?.title) return null;

      return <NotionPageSeries {...postSeries} />;
    },
    propertySelectValue: (
      { schema, value, key, pageHeader, color },
      defaultFn: () => React.ReactNode
    ) => {
      if (pageHeader && schema.type === 'multi_select' && value) {
        return <NotionTagItem key={key} name={value} color={color} />;
      }

      return defaultFn();
    }
  };
};

export default getPropsComponents;
