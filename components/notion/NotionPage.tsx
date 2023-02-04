import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { NotionTagItem } from '@/components/notion/NotionTagItem';
import { formatDate } from '@/utils/formatDate';
import { mapImageUrl } from '@/utils/notion/mapImageUrl';

const Code = dynamic(() =>
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
      previewImages={!!recordMap.preview_images}
      mapImageUrl={mapImageUrl}
      //isLinkCollectionToUrlProperty={false}
      //linkTableTitleProperties={false}
      components={{
        nextLink: Link,
        nextImage: Image,
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
            return <NotionTagItem key={key} name={value} color={color} />;
          }

          return defaultFn();
        }
      }}
    />
  );
};

export default NotionPage;
