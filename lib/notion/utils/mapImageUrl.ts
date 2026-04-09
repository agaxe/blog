import { Block } from 'notion-types';
import { defaultMapImageUrl } from 'notion-utils';

export const mapImageUrl = (url: string | undefined, block: Block): any => {
  if (!url) return '';
  return defaultMapImageUrl(url, block);
};
