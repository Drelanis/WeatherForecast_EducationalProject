import type { Metadata } from 'next';
import { MONTSERRAT_400 } from '@styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Weather Forecast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={MONTSERRAT_400.className}>{children}</body>
      </html>
    </>
  );
}
