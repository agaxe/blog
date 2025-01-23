import CommonLayout from '@/app/(common)/Layout';
import { PageLayout } from '@/components/layout/PageLayout';

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
