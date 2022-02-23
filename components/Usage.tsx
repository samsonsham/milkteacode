// React
import React, { useState, useEffect } from "react";

// i18n
import { useTranslation } from "next-i18next";

// Chakra UI
import { Heading, List, ListItem, ListIcon } from "@chakra-ui/react";

// icons
import { MdCheckCircle, MdDangerous } from "react-icons/md";

const Usage = () => {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Heading as="h1" mt={8} mb={4}>
          {t("standard-usage")}
        </Heading>
      )}
      <List spacing={1}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {t("usage-list-item-1")}
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {t("usage-list-item-2")}
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {t("usage-list-item-3")}
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {t("usage-list-item-4")}
        </ListItem>
        <ListItem>
          <ListIcon as={MdDangerous} color="red.500" />
          {t("usage-list-item-5")}
        </ListItem>
        <ListItem>
          <ListIcon as={MdDangerous} color="red.500" />
          {t("usage-list-item-6")}
        </ListItem>
      </List>
    </>
  );
};

export default Usage;
