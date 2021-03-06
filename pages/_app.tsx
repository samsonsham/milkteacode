import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
