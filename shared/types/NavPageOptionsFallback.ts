import { SwrFallbackKeys } from '@/shared/enums/SwrFallbackKeys';
import { NavPageOptions } from '@/shared/types/NavPageOptions';

export interface NavPageOptionsFallback {
  [SwrFallbackKeys.PAGE_OPTIONS]: NavPageOptions;
}
