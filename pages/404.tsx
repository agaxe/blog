import React from 'react';
import { Seo } from '@/components/common/Seo';
import { NotFound } from '@/components/layout/NotFound';

export default function NotFoundPage() {
  return (
    <>
      <Seo title='404 Not Found' />
      <NotFound />
    </>
  );
}
