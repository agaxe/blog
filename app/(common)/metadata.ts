import type { Metadata } from 'next';
import projectConfig from '@/config';

const { site } = projectConfig;

const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: site.title,
    description: site.description,
    siteName: site.title,
    images: [{ url: site.imgUrl }],
    url: site.url
  },
  other: {
    image: site.imgUrl,
    'format-detection': 'telephone=no',
    'google-site-verification': 'faIvdZv6LG61u9emvAOXbaQInoKsR0ejsmhb5dtM8Sc'
  }
};

export default metadata;
