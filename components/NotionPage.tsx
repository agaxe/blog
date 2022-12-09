import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

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
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection
      }}
    />
  );
};

export default NotionPage;
