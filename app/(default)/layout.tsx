import CommonLayout from '@/app/(common)/Layout';
import commonMetadata from '@/app/(common)/metadata';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata = commonMetadata;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <CommonLayout>
      <PageLayout>{children}</PageLayout>
    </CommonLayout>
  );
}
