// Next
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// i18n
import { useTranslation } from 'next-i18next';

// Chakra UI
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';

// Icons and Fonts
import { SunIcon, MoonIcon, RepeatIcon } from '@chakra-ui/icons';
import { MdTranslate } from 'react-icons/md';
import '@fontsource/noto-serif-tc/600.css';
import '@fontsource/playfair-display/600.css';
import React from 'react';

function Header() {
  React.useLayoutEffect = React.useEffect;
  const router = useRouter();
  const { pathname } = useRouter();
  const { t } = useTranslation('common');
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('#d0e7e9', 'darkcyan');
  const IconColor = useColorModeValue('yellow.500', 'yellow.200');
  const color = useColorModeValue('gray.600', 'white');

  return (
    <Box px={[2, 4, 10, 10]} backgroundColor={bg} h={[14, 20, 20, 20]}>
      <Flex
        color={color}
        transform={['translateY(30%)', 'translateY(55%)', 'translateY(40%)', 'translateY(40%)']}
      >
        <NextLink href="/" passHref>
          <RepeatIcon
            w={[7, 8, 10, 10]}
            h={[7, 8, 10, 10]}
            mr={3}
            ml={[2, 0, 0, 0]}
            color={IconColor}
          />
        </NextLink>
        <Text
          display={['none', 'block', 'block', 'block']}
          fontSize={['2xl', '2xl', '3xl', '3xl']}
          fontFamily={router.locale === 'en' ? 'Playfair Display' : 'Noto Serif TC'}
        >
          {t('unicode-converter')}
        </Text>
        <Text
          display={['block', 'none', 'none', 'none']}
          fontSize={['2xl', '2xl', '3xl', '3xl']}
          fontFamily="Playfair Display"
        >
          UC
        </Text>
        <Spacer />
        <Box>
          <NextLink href={pathname} locale={router.locale === 'en' ? 'tc' : 'en'} passHref>
            <IconButton
              backgroundColor="rgba(0, 0, 0, 0.0)"
              icon={<MdTranslate />}
              aria-label="Change Language"
              fontSize={[20, 20, 24, 24]}
              transition="transform .2s"
              _hover={{
                transform: 'scale(1.2)',
              }}
            />
          </NextLink>
          <Button
            backgroundColor="rgba(0, 0, 0, 0.0)"
            aria-label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            fontSize={[20, 20, 24, 24]}
            onClick={toggleColorMode}
            transition="transform .2s"
            _hover={{
              transform: 'scale(1.2)',
            }}
            p={0}
            ml={[0, 0, 2]}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
