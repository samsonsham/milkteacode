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

function Header() {
  const router = useRouter();
  const { pathname } = useRouter();
  const { t } = useTranslation('common');
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('rgb(0, 206, 209,0.6)', 'darkcyan');
  const color = useColorModeValue('gray.600', 'white');

  return (
    <Box p={2} backgroundColor={bg}>
      <Flex alignItems="flex-start" color={color}>
        <NextLink href="/" passHref>
          <RepeatIcon w={8} h={8} mr={2} color={color} />
        </NextLink>
        <Text
          fontSize="2xl"
          fontFamily={router.locale === 'en' ? 'Playfair Display' : 'Noto Serif TC'}
        >
          {t('unicode-converter')}
        </Text>
        <Spacer />
        <NextLink href={pathname} locale={router.locale === 'en' ? 'tc' : 'en'} passHref>
          <IconButton
            backgroundColor="rgba(0, 0, 0, 0.0)"
            icon={<MdTranslate />}
            aria-label="Change Language"
            transition="transform .2s"
            _hover={{
              transform: 'scale(1.5)',
            }}
          />
        </NextLink>
        <Button
          backgroundColor="rgba(0, 0, 0, 0.0)"
          aria-label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          onClick={toggleColorMode}
          transition="transform .2s"
          _hover={{
            transform: 'scale(1.5)',
          }}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
