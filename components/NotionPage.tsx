import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import { normalizeTitle } from 'notion-utils';
import { formatDate } from '@/utils/formatDate';

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
      header={<div>header</div>}
      footer={<div>footer</div>}
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
          { schema, value, key, pageHeader },
          defaultFn: () => React.ReactNode
        ) => {
          value = normalizeTitle(value);

          if (pageHeader && schema.type === 'multi_select' && value) {
            return (
              <Link href={`/tag/${value}`} key={key}>
                {defaultFn()}
              </Link>
            );
          }

          return defaultFn();
        }
      }}
    />
  );
};

export default NotionPage;
