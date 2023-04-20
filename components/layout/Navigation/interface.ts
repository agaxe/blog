import { HtmlHTMLAttributes } from 'react';
import { NavPageOptions } from '@/shared/types/NavPageOptions';

export interface NavigationProps extends HtmlHTMLAttributes<HTMLDivElement> {
  options?: NavPageOptions;
}
