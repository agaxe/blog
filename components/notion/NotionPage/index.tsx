import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import useSWR from 'swr';
import { mapImageUrl } from '@/lib/notion/utils/mapImageUrl';
import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { PostSeries } from '@/shared/types/PostSeries';
import getPropsComponents from './components';
import { NotionPageProps } from './interface';

export const NotionPage = ({ recordMap }: NotionPageProps) => {
  const { data: postSeries } = useSWR<PostSeries>(SwrFallbackKeys.POST_SERIES);

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
      components={getPropsComponents({
        postSeries
      })}
    />
  );
};
