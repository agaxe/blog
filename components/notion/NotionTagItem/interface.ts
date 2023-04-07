import { HtmlHTMLAttributes } from 'react';

export interface NotionTagItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  id?: string;
  name: string;
  color: string;
  isLink?: boolean;
  size?: 'large';
}
