import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import { normalizeTitle } from 'notion-utils';
import { formatDate } from '@/utils/formatDate';
import { NotionTagItem } from '@/components/notion/NotionTagItem';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
);

const NotionPage = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      disableHeader={true}
      minTableOfContentsItems={3}
      showCollectionViewDropdown={false}
      showTableOfContents={true}
      header={<Header />}
      footer={<Footer />}
      //isLinkCollectionToUrlProperty={false}
      //linkTableTitleProperties={false}
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection,
        propertyCreatedTimeValue: (dateProperty) => {
          return formatDate(dateProperty.block.created_time);
        },
        propertyLastEditedTimeValue: (dateProperty) => {
          return formatDate(dateProperty.block.last_edited_time);
        },
        propertySelectValue: (
          { schema, value, key, pageHeader, color },
          defaultFn: () => React.ReactNode
        ) => {
          if (pageHeader && schema.type === 'multi_select' && value) {
            return (
              <NotionTagItem
                key={key}
                name={normalizeTitle(value)}
                color={color}
              />
            );
          }

          return defaultFn();
        }
      }}
    />
  );
};

export default NotionPage;
