import { ExtendedRecordMap } from 'notion-types';
import { PostSeries } from '@/shared/types/PostSeries';

export interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  postSeries: PostSeries | undefined;
}
