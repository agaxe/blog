export interface NavPageOptionsType {
  pageNum: number;
  pageLength: number;
  pagePath?: string;
}

export interface NavPageOptionsFallbackType {
  'page-options': NavPageOptionsType;
}
