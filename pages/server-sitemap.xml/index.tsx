import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';
import config from '@/config';
import { getDatabaseItems } from '@/lib/notion/pages';
import { convertUuidToPostId } from '@/utils/convertUuidToPostId';
import { formatDate } from '@/utils/formatDate';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await getDatabaseItems();

  const fields: Parameters<typeof getServerSideSitemapLegacy>[1] = posts.map(
    (item) => {
      if (!('last_edited_time' in item)) return { loc: '' };

      return {
        loc: `${config.site.url}/${convertUuidToPostId(item.id)}`,
        lastmod: formatDate(item?.last_edited_time as string, 'yyyy-MM-dd'),
        changefreq: 'daily'
      };
    }
  );

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function SitemapIndex() {}
