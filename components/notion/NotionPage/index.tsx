import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { mapImageUrl } from '@/lib/notion/utils/mapImageUrl';
import components from './components';
import { NotionPageProps } from './interface';

export const NotionPage = ({ recordMap }: NotionPageProps) => {
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
      mapImageUrl={mapImageUrl}
      components={components}
    />
  );
};
