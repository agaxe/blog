import { HtmlHTMLAttributes } from 'react';

export interface NavigationProps extends HtmlHTMLAttributes<HTMLDivElement> {
  options?: {
    pageNum: number;
    pageLength: number;
    pagePath?: string;
  };
}
