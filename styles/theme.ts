// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        p: 0,
        m: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      },
      // styles for the `a`
      a: {
        textDecoration: 'none',
      },
    }),
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      border: '1px solid red',
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    blockquote: {
      fontSize: ['20px', '24px'],
      fontFamily: 'Times New Roman',
      padding: '20px 20px 10px 20px',
      _before: {
        content: '"\u201C"',
      },
      _after: {
        content: '"\u201D"',
      },
    },
    figcaption: {
      fontSize: ['16px', '20px'],
      fontFamily: 'Times New Roman',
      padding: '0 20px 20px 20px',
      _before: {
        content: '"\u2014"',
      },
    },
  },
});

export default theme;
