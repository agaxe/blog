import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { PostSeries } from './PostSeries';

export interface PostSeriesFallback {
  [SwrFallbackKeys.POST_SERIES]: PostSeries;
}
