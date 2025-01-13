import { Block } from 'notion-types';
import { defaultMapImageUrl } from 'notion-utils';

export const mapImageUrl = (url: string, block: Block): any => {
  return defaultMapImageUrl(url, block);
};
