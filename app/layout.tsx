/**
 * LAYOUT: Root Application Shell
 * Purpose: Defines the global layout, metadata, and wraps the application 
 * in the AuthProvider to enable session awareness across all pages.
 */

import AuthProvider from "@/components/SessionProvider";
import "./globals.css";

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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
