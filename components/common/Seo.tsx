import React from 'react';
import Head from 'next/head';
import config from '@/config';

export const Seo = ({
  title = config.site.title,
  description = config.description,
  img_url = '/images/og_img.jpg'
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
        />
        {img_url && <link rel='image_src' href={img_url} />}
        <meta name='description' content={description} />
        {img_url && <meta name='image' content={img_url} />}
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={typeof window !== 'undefined' ? window.location.href : ''}
        />
        {img_url && <meta property='og:image' content={img_url} />}
        <meta name='format-detection' content='telephone=no' />
      </Head>
    </div>
  );
};
