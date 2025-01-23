import type { Metadata } from 'next';
import projectConfig from '@/config';
import CommonLayout from './(common)/Layout';

const { site } = projectConfig;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description + '1231231',
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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <CommonLayout>{children}</CommonLayout>;
}
