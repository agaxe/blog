import type { NextApiRequest, NextApiResponse } from 'next';
import {
  PathTagPages,
  getPathTagPages
} from '@/lib/notion/tags/getPathTagPages';
import { convertBlankToHyphen } from '@/utils/convertBlankToHyphen';

export const revalidateTagPages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const queryTagName = (req.query?.tagName as string) || '';

    const revalidate = (arr: PathTagPages = []) => {
      return arr.map(({ params: { tagName, pageNum } }) => {
        const path = `/tags/${convertBlankToHyphen(tagName)}/pages/${pageNum}`;

        res.revalidate(path);
        return path;
      });
    };

    const tagPaths = await getPathTagPages(queryTagName);
    return revalidate(tagPaths);
  } catch (error) {
    console.error('Error: revalidateTagPages');
    throw error;
  }
};
