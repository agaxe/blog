'use client';

import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import getPropsComponents from './components';
import { NotionPageProps } from './interface';

export const NotionPage = ({ recordMap, postSeries }: NotionPageProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      disableHeader={true}
      minTableOfContentsItems={3}
      showCollectionViewDropdown={false}
      showTableOfContents={true}
      previewImages={!!recordMap.preview_images}
      // mapImageUrl={mapImageUrl}
      components={getPropsComponents({
        postSeries
      })}
    />
  );
};
