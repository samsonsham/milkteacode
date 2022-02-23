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
