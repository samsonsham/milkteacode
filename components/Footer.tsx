// Next
import NextLink from "next/link";

// i18n
import { useTranslation } from "next-i18next";

// Chakra UI
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation("common");

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          <NextLink href={"/"} passHref>
            {t("home")}
          </NextLink>
          <NextLink href={"/about"} passHref>
            {t("about")}
          </NextLink>
        </Stack>
        <Text>
          © {year} Uvicode. {t("all-right-reserved")}
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
