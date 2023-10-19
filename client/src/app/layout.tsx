import type { Metadata } from 'next';
import { MONTSERRAT_400 } from 'src/app/styles/fonts';
import './global.scss';
import { Providers } from '@components/Providers';
import App from '@components/App/App';

export const metadata: Metadata = {
  title: 'Weather Forecast',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body className={MONTSERRAT_400.className}>
          <Providers>
            <App>{children}</App>
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
