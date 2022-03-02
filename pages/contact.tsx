/* eslint-disable react/function-component-definition */
// Next
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Components
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Main from '../components/Container';

const Contact: NextPage = () => (
  <Main>
    <Header />
    <ContactForm />
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

export default Contact;
