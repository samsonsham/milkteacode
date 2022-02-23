// Next
import type { NextPage } from "next";
import Head from "next/head";

// Components
import Header from "../components/Header";
import Converter from "../components/Converter";
import Footer from "../components/Footer";
import Main from "../components/Container";

// i18n
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <Main>
      <Head>
        <title>Uvicode - A Unicode Converter</title>
        <meta
          name="title"
          property="og:title"
          content="Uvicode - A Unicode Converter"
        ></meta>
        <meta
          name="description"
          property="og:description"
          content="Web site for doing unicode conversion with different encoding"
        ></meta>
        <meta
          name="image"
          property="og:image"
          content="https://avatars.githubusercontent.com/u/4945010?v=4"
        ></meta>
        <meta name="author" content="Samson Sham"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Converter />
      <Footer />
    </Main>
  );
};

interface Props {}
// Server Side Translation from "next-i18next":
// An async function that you need to include on your page-level components
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
