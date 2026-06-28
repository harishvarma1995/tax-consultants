export const metadata = {
  title: 'Tax Consultants',
  description: 'Professional Tax Consulting Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
