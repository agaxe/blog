import type {  NextApiResponse } from 'next';
import { getPathPages } from '@/lib/notion/pages';


export const revalidatePages = async (res: NextApiResponse) => {
  const pagesPaths = await getPathPages();

  return pagesPaths.map(({ params: { pageNum } }) => {
    const path = `/pages/${pageNum}`;

    res.revalidate(path);
    return path;
  });
};