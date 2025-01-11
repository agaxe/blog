import CommonLayout from '@/app/(common)/Layout';
import commonMetadata from '@/app/(common)/metadata';

export const metadata = commonMetadata;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <CommonLayout>{children}</CommonLayout>;
}
