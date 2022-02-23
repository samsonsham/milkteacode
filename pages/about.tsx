// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Container";

// i18n
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Chakra UI
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  Wrap,
  WrapItem,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";

// Helper
import { unicodePlane, aboutBoxStyle } from "../utils/converter-helper";

function About() {
  const { t } = useTranslation("common");
  const { colorMode } = useColorMode();
  const formatNum = (item: string | number) => {
    if (typeof item === "number") return item.toLocaleString();
    return item;
  };

  return (
    <Main>
      <Header />
      <Box px={[2, 2, 12]} pt={2} pb={12}>
        <Heading as="h1" size="lg" pt={4}>
          {t("what-is-unicode")}
        </Heading>
        <Text
          as="blockquote"
          textStyle="blockquote"
          cite="https://home.unicode.org/basic-info/overview/"
        >
          {t("unicode-org-quote")}
        </Text>
        <Text
          as="figcaption"
          textStyle="figcaption"
          fontSize="baseline"
          textAlign="right"
        >
          {t("unicode-consortium")}
        </Text>
        <Wrap spacing="30px" justify="center">
          <WrapItem
            w={["90vw", "85vw", "380px"]}
            p={4}
            bg={
              colorMode === "light"
                ? aboutBoxStyle.box1_bg_light
                : aboutBoxStyle.box1_bg_dark
            }
            borderRadius={5}
          >
            <Flex direction="column" gap={3}>
              <Text>
                <strong>{t("unicode")}.</strong> {t("unicode-intro-1")}
              </Text>
              <Text>{t("unicode-intro-2")}</Text>
              <Text>
                {t("code-point")}: <strong>U+1F600</strong> 😀
                <br />
                {t("short-name")}:{" "}
                <strong>grinning face with smiling eyes</strong>
              </Text>
              <Spacer />
              <Text fontStyle="italic" fontWeight="semibold" fontSize="sm">
                {t("source")}:
                <Link
                  href="https://stackoverflow.com/questions/2241348/what-are-unicode-utf-8-and-utf-16"
                  ml={1}
                  fontWeight="normal"
                >
                  stackoverflow
                </Link>
                ,
                <Link
                  href="https://en.wikipedia.org/wiki/Unicode"
                  ml={1}
                  fontWeight="normal"
                >
                  wikipedia
                </Link>
              </Text>
            </Flex>
          </WrapItem>
          <WrapItem
            w={["90vw", "85vw", "380px"]}
            p={4}
            bg={
              colorMode === "light"
                ? aboutBoxStyle.box2_bg_light
                : aboutBoxStyle.box2_bg_dark
            }
            borderRadius={5}
          >
            <Flex flex="1" direction="column" gap={3}>
              <Text textDecoration="underline" fontWeight="bold">
                {t("unicode-plane")}
              </Text>
              <Table variant="simple" size="sm">
                <TableCaption>{t("plane-table-caption")}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>{t("plane")}</Th>
                    <Th isNumeric>{t("allocated-code-points")}</Th>
                    <Th isNumeric>{t("assigned-char")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {unicodePlane.map((plane, i) => (
                    <Tr key={i}>
                      <Td>{plane.plane}</Td>
                      <Td isNumeric>{formatNum(plane.AllocCodePt)}</Td>
                      <Td isNumeric>{formatNum(plane.assignedChar)}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>{t("totals")}</Th>
                    <Th isNumeric>{(288512).toLocaleString()}</Th>
                    <Th isNumeric>{(144762).toLocaleString()}</Th>
                  </Tr>
                </Tfoot>
              </Table>
              <Spacer />
              <Text fontStyle="italic" fontWeight="semibold" fontSize="sm">
                {t("source")}:
                <Link
                  href="https://zh.wikipedia.org/zh-hk/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84"
                  ml={1}
                  fontWeight="normal"
                >
                  wikipedia
                </Link>
              </Text>
            </Flex>
          </WrapItem>
          <WrapItem
            w={["90vw", "40vw", "380px"]}
            p={4}
            bg={
              colorMode === "light"
                ? aboutBoxStyle.box3_bg_light
                : aboutBoxStyle.box3_bg_dark
            }
            borderRadius={5}
          >
            <Flex direction="column" gap={3}>
              <Text>
                <strong>UTF-16.</strong> {t("utf16-intro")}
              </Text>
              <Text>
                <u>E.g.</u>
                <br />
                {t("surrogate-pair")} : <strong>\ud83d\ude00</strong> 😀
                <br />
                {t("js-escape-format")} : <strong>\u&#123;1f600&#125;</strong>{" "}
                😀
              </Text>
              <Spacer />
              <Text fontStyle="italic" fontWeight="semibold" fontSize="sm">
                {t("source")}:
                <Link
                  href="https://en.wikipedia.org/wiki/UTF-16"
                  ml={1}
                  fontWeight="normal"
                >
                  wikipedia
                </Link>
              </Text>
            </Flex>
          </WrapItem>
          <WrapItem
            w={["90vw", "40vw", "380px"]}
            p={4}
            bg={
              colorMode === "light"
                ? aboutBoxStyle.box6_bg_light
                : aboutBoxStyle.box6_bg_dark
            }
            borderRadius={5}
          >
            <Flex direction="column" gap={3}>
              <Text>
                <strong>ISO-10646.</strong> {t("iso10646-intro-1")}
              </Text>
              <Text>{t("iso10646-intro-2")}</Text>
              <Spacer />
              <Text fontStyle="italic" fontWeight="semibold" fontSize="sm">
                {t("source")}:
                <Link
                  href="https://en.wikipedia.org/wiki/Universal_Coded_Character_Set"
                  ml={1}
                  fontWeight="normal"
                >
                  wikipedia
                </Link>
                ,
                <Link
                  href="https://www.unicode.org/faq/unicode_iso.html"
                  ml={1}
                  fontWeight="normal"
                >
                  unicode.org
                </Link>
              </Text>
            </Flex>
          </WrapItem>
          <WrapItem
            w={["90vw", "40vw", "380px"]}
            p={4}
            bg={
              colorMode === "light"
                ? aboutBoxStyle.box4_bg_light
                : aboutBoxStyle.box4_bg_dark
            }
            borderRadius={5}
          >
            <Flex direction="column" gap={3}>
              <Text>
                <strong>ASCII.</strong> {t("ascii-intro")}
              </Text>
              <UnorderedList>
                <ListItem>
                  {t("num-of-char")}: <strong>128</strong>
                </ListItem>
                <ListItem>{t("reserved-char")}</ListItem>
                <ListItem>
                  {t("num-of-printable-char")}: <strong>95</strong>
                </ListItem>
                <ListItem>
                  <strong>0x20</strong> ({t("space")}) - <strong>0x7E</strong>{" "}
                  (~)
                </ListItem>
                <ListItem>
                  {t("last-char")}: <strong>0x7F</strong> (DEL)
                </ListItem>
              </UnorderedList>
              <Spacer />
              <Text fontStyle="italic" fontWeight="semibold" fontSize="sm">
                {t("source")}:
                <Link
                  href="https://en.wikipedia.org/wiki/ASCII"
                  ml={1}
                  fontWeight="normal"
                >
                  wikipedia
                </Link>
              </Text>
            </Flex>
          </WrapItem>
          <WrapItem
            w={["90vw", "40vw", "380px"]}
            p={4}
            bg={
              colorMode === "light"
                ? aboutBoxStyle.box5_bg_light
                : aboutBoxStyle.box5_bg_dark
            }
            borderRadius={5}
          >
            <Flex direction="column" gap={3}>
              <Text>
                <strong>{t("html-entity")}.</strong> {t("html-en-intro")}
              </Text>
              <UnorderedList listStyleType="none">
                <ListItem>
                  {t("character")}: <strong>&copy;</strong>
                </ListItem>
                <ListItem>
                  {t("entity-name")}: <strong>&#38;&#35;copy&#59;</strong>
                </ListItem>
                <ListItem>
                  {t("entity-num")}: <strong>&#38;&#35;169&#59;</strong>
                </ListItem>
                <ListItem>
                  {t("desc")}: <strong>Copyright</strong>
                </ListItem>
              </UnorderedList>
              <Spacer />
              <Text fontStyle="italic" fontWeight="semibold" fontSize="sm">
                {t("source")}:
                <Link href="https://entitycode.com/" ml={1} fontWeight="normal">
                  entitycode.com
                </Link>
              </Text>
            </Flex>
          </WrapItem>
        </Wrap>
      </Box>
      <Footer />
    </Main>
  );
}

// Server Side Translation from "next-i18next":
// An async function that you need to include on your page-level components
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default About;
