import React from 'react';
import Head from 'next/head';
import config from '@/config';

export const Seo = ({
  title = config.site.title,
  description = config.site.description,
  imgUrl = '/images/og_img.jpg'
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
        {imgUrl && <link rel='image_src' href={imgUrl} />}
        <meta name='description' content={description} />
        {imgUrl && <meta name='image' content={imgUrl} />}
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={typeof window !== 'undefined' ? window.location.href : ''}
        />
        {imgUrl && <meta property='og:image' content={imgUrl} />}
        <meta name='format-detection' content='telephone=no' />
        <meta
          name='google-site-verification'
          content='faIvdZv6LG61u9emvAOXbaQInoKsR0ejsmhb5dtM8Sc'
        />
      </Head>
    </div>
  );
};
