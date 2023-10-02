import type { Metadata } from 'next';
import { MONTSERRAT_400 } from 'src/app/styles/fonts';
import './global.scss';
import { Header } from './components/Header/Header';
import Footer from '@components/Footer/Footer';
import Main from '@components/Main/Main';
import { Providers } from '@components/Providers/App';

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
        <body className={MONTSERRAT_400.className}>
          <Providers>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  );
}
