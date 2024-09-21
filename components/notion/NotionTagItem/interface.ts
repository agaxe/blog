import { HtmlHTMLAttributes } from 'react';
import { size } from '@/styles/device';

export interface NotionTagItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  id?: string;
  name: string;
  color: string;
  isLink?: boolean;
  size?: Extract<keyof typeof size, 'lg'>;
  count?: number;
}
