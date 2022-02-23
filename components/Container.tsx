// React
import React, { FC } from "react";

// Chakra UI
import { Box, Container, useColorModeValue } from "@chakra-ui/react";

interface Props {}

const Main: FC<Props> = ({ children }) => {
  const bgOuter = useColorModeValue("gray.100", "black");
  const bgInner = useColorModeValue("white", "gray.800");
  return (
    <Box backgroundColor={bgOuter}>
      <Container maxW="4xl" p={0}>
        <Box backgroundColor={bgInner}>{children}</Box>
      </Container>
    </Box>
  );
};

export default Main;
