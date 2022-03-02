/* eslint-disable react/function-component-definition */
// React
import React, { FC } from 'react';
import Head from 'next/head';

// Chakra UI
import { Box, Container, useColorModeValue } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Main: FC<Props> = ({ children }) => {
  const bgOuter = useColorModeValue('gray.100', 'black');
  const bgInner = useColorModeValue('white', 'gray.800');
  return (
    <Box backgroundColor={bgOuter}>
      <Head>
        <title>MilkteaCode - A Unicode Converter</title>
        <meta name="title" property="og:title" content="MilkteaCode - A Unicode Converter" />
        <meta
          name="description"
          property="og:description"
          content="Web site for doing unicode conversion with different encoding"
        />
        <meta
          name="image"
          property="og:image"
          content="https://avatars.githubusercontent.com/u/4945010?v=4"
        />
        <meta name="author" content="Samson Sham" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </Head>
      <Container maxW="4xl" p={0}>
        <Box backgroundColor={bgInner}>{children}</Box>
      </Container>
    </Box>
  );
};

export default Main;
