import StyledComponentsRegistry from '@/lib/registry';

export default function CommonLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
