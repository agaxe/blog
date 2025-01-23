import { type Metadata } from 'next';
import { NotFound } from '@/components/layout/NotFound';

export const metadata: Metadata = {
  title: '404 Not Found'
};

export default function NotFoundPage() {
  return <NotFound />;
}
