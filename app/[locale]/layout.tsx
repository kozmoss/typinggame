import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import "../globals.scss"
import { CounterStoreProvider } from '../store/storeProvider';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <CounterStoreProvider>
        <NextIntlClientProvider messages={messages}>
            <div id="root" className='default'>
            {children}
            </div>
  
        </NextIntlClientProvider>
        </CounterStoreProvider>

      </body>
    </html>
  );
}