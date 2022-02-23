/* eslint-disable react/function-component-definition */
// Next
import type { NextPage } from 'next';
import Head from 'next/head';

// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Components
import Header from '../components/Header';
import Converter from '../components/Converter';
import Footer from '../components/Footer';
import Main from '../components/Container';

const Home: NextPage = () => (
  <Main>
    <Head>
      <title>Uvicode - A Unicode Converter</title>
      <meta name="title" property="og:title" content="Uvicode - A Unicode Converter" />
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
    <Header />
    <Converter />
    <Footer />
  </Main>
);

// Server Side Translation from "next-i18next":
// An async function that you need to include on your page-level components
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
