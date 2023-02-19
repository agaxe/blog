import { HtmlHTMLAttributes } from 'react';
import { NavPageOptionsType } from '@/shared/types';

export interface NavigationProps extends HtmlHTMLAttributes<HTMLDivElement> {
  options?: NavPageOptionsType;
}
