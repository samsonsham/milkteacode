// React
import React, { useState, useEffect } from 'react';

// i18n
import { useTranslation } from 'next-i18next';

// Chakra UI
import {
  Box,
  Button,
  RadioGroup,
  Radio,
  Switch,
  Spacer,
  Text,
  Textarea,
  Stack,
} from '@chakra-ui/react';

// Helper
import copy from 'copy-to-clipboard';
import { helpers } from '../utils/converter-helper';

// Components
import Usage from './Usage';

function Converter() {
  const [charValue, setCharValue] = useState('');
  const [u16Value, setU16Value] = useState('');
  const [focusChar, setFocusChar] = useState(true);
  const [focusU16, setFocusU16] = useState(false);
  const [isConvASCII, setIsConvASCII] = useState(false);
  const [output, setOutput] = useState('utf16');
  const { t } = useTranslation('common');

  // Handle Input Box Changes
  const handleCharChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = e.target.value;
    if (focusChar) {
      setCharValue(inputValue);
    }
  };
  const handleU16Change = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = e.target.value;
    if (focusU16) {
      setU16Value(inputValue);
    }
  };

  // Handle Input Box Focus
  const handleCharFocus = (e: React.ChangeEvent<HTMLTextAreaElement>, isFocus: boolean): void => {
    const inputValue = e.target.value;
    setCharValue(inputValue);
    setFocusChar(isFocus);
    setFocusU16(!isFocus);
    if (!charValue) {
      setU16Value('');
    }
  };
  const handleU16Focus = (e: React.ChangeEvent<HTMLTextAreaElement>, isFocus: boolean): void => {
    const inputValue = e.target.value;
    setU16Value(inputValue);
    setFocusU16(isFocus);
    setFocusChar(!isFocus);
    if (!u16Value) {
      setCharValue('');
    }
  };

  // Convert Character to UTF-16 encoding
  const convertChar2Utf16 = (str: string) => {
    const strArr = Array.from(str);
    const u16Arr = strArr.map((string) => {
      // Determine charCode or codePoint to use
      let codeArr: (string | number | undefined)[] = [];
      if (output === 'codePt' || output === 'htmlEn') {
        codeArr = helpers.char2CodePt(string);
      } else {
        codeArr = helpers.char2Charcode(string);
      }
      // Handle Convert ASCII Character Toggle
      const u16Body: (string | number | undefined)[] = [];
      if (codeArr.length <= 1) {
        const codePt = codeArr[0];
        u16Body.push(codePt);
        if (typeof codePt === 'number') {
          if (!isConvASCII && helpers.isAscii(codePt)) {
            return string;
          }
        }
      } else {
        for (let i = 0; i < codeArr.length; i += 1) {
          u16Body.push(codeArr[i]);
        }
      }
      // Compile result base on radio button
      const result: string[] = [];

      switch (output) {
        case 'codePt':
          if (typeof codeArr[0]?.toString(16) === 'string')
            result.push(`\\u\u007b${codeArr[0]?.toString(16)}\u007d`);
          break;
        case 'htmlEn':
          if (typeof codeArr[0]?.toString(16) === 'string')
            result.push(`\u0026\u0023${codeArr[0]}\u003b`);
          break;
        default: {
          u16Body.forEach((item) => {
            if (typeof item === 'number') {
              const hexVal = helpers.dec2hex(item);
              result.push(`\\u${hexVal}`);
            }
          });
        }
      }
      return result.join('');
    });
    return u16Arr.join('');
  };

  // Convert UTF-16 encoding to Character
  const convertUtf162Char = (u16: string) => {
    if (u16 === '\\') return u16;
    let u16Arr: string[] = [];
    if (output === 'utf16' || output === 'codePt') {
      u16Arr = u16.split('\\');
    } else if (output === 'htmlEn') {
      u16Arr = u16.split('\u0026');
    }
    if (!u16Arr[0]) u16Arr.shift();
    const charArr = u16Arr.map((unifiedValue) => {
      if (
        // Escapes other than \uXXXX
        (unifiedValue[0] !== 'u' && unifiedValue[0] !== '\u0023') ||
        // Second character is open branket {
        (output !== 'codePt' && unifiedValue[1] === '\u007b')
      )
        return `${unifiedValue}`;
      const value = unifiedValue.slice(1);
      const hexValue: number | string = parseInt(value, 16);
      let codePtStr;
      switch (output) {
        case 'codePt': {
          codePtStr = value.slice(1, value.length - 1);
          const codePtInt = parseInt(codePtStr, 16);
          if (helpers.isInRange(codePtInt)) return String.fromCodePoint(codePtInt);
          break;
        }
        case 'htmlEn':
          codePtStr = value.slice(0, value.length - 1);
          return String.fromCodePoint(Number(codePtStr));
          break;
        default:
          if (helpers.isInRange(hexValue)) return String.fromCharCode(hexValue);
      }
      return unifiedValue;
    });
    return charArr.join('');
  };

  const getU16Value = () => (charValue ? convertChar2Utf16(charValue) : u16Value);
  const getCharValue = () => (u16Value ? convertUtf162Char(u16Value) : charValue);

  // Clear Button
  const handleClear = () => {
    setCharValue('');
    setU16Value('');
  };

  // Upper Box placeholder
  const getEncodeType = () => {
    switch (output) {
      case 'utf16':
        return t('encoding-utf16');
        break;
      case 'codePt':
        return `${t('code-point')}`;
        break;
      case 'htmlEn':
        return t('html-entity');
        break;
      default:
        return t('encoding-utf16');
    }
  };

  // Lower Box Placeholder
  const getEncodeExample = () => {
    switch (output) {
      case 'utf16':
        return 'e.g. \\u4eba\\u4eba\\u751f\\u800c\\u5e73\\u7b49\\ud83e\\udd1d';
        break;
      case 'codePt':
        return 'e.g. \\u{4eba}\\u{4eba}\\u{751f}\\u{800c}\\u{5e73}\\u{7b49}\\u{1f91d}';
        break;
      case 'htmlEn':
        return 'e.g. &#20154;&#20154;&#29983;&#32780;&#24179;&#31561;&#129309;';
        break;
      default:
        return 'e.g. \\u4eba\\u4eba\\u751f\\u800c\\u5e73\\u7b49\\ud83e\\udd1d';
    }
  };

  // Handle Copy functions
  const [hasCopiedChar, setHasCopiedChar] = useState(false);
  const [hasCopiedU16, setHasCopiedU16] = useState(false);

  const handleCopyChar = () => {
    copy(getCharValue());
    setHasCopiedChar(true);
  };

  const handleCopyU16 = () => {
    copy(getU16Value());
    setHasCopiedU16(true);
  };

  useEffect(() => {
    if (hasCopiedChar) {
      setTimeout(() => {
        setHasCopiedChar(false);
      }, 1000);
    } else if (hasCopiedU16) {
      setTimeout(() => {
        setHasCopiedU16(false);
      }, 1000);
    }
  }, [hasCopiedChar, hasCopiedU16]);

  return (
    <Box px={[2, 4, 12]} mt={4} mb={10}>
      <Usage />
      <Stack
        direction="row"
        align="baseline"
        borderWidth={2}
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        borderStyle="solid"
        borderColor="gray.400"
        borderRadius="10px 10px 0 0"
        mt={8}
        py={2}
        px={2}
        backgroundColor="rgb(255,250,205,0.2)"
      >
        <Text fontWeight="bold">{t('character')}:</Text>
        <Spacer />
        <Button onClick={handleCopyChar} m={0} aria-label="Copy Character">
          {hasCopiedChar ? <>{t('copied')}</> : <>{t('copy')}</>}
        </Button>
      </Stack>
      <Textarea
        value={focusChar ? charValue : getCharValue()}
        onChange={handleCharChange}
        onFocus={(e) => handleCharFocus(e, true)}
        placeholder="e.g. &#20154;&#20154;&#29983;&#32780;&#24179;&#31561;&#128516;"
        aria-label="Input Box for converting Character"
        fontSize={['xl', 'md', 'md', 'sm']}
        h={150}
        borderWidth={2}
        borderTopWidth={0}
        borderStyle="solid"
        borderColor="gray.400"
        borderRadius="0 0 10px 10px"
        backgroundColor="rgb(255,250,205,0.2)"
      />
      <Stack
        direction="row"
        align="baseline"
        borderWidth={2}
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        borderStyle="solid"
        borderColor="gray.400"
        borderRadius="10px 10px 0 0"
        py={2}
        px={2}
        mt={6}
        backgroundColor="rgb(102,205,170,0.1)"
      >
        <Text fontWeight="bold" m="8px">
          {getEncodeType()}:
        </Text>
        <Spacer />
        <Button onClick={handleCopyU16} ml={2} aria-label={`Copy ${getEncodeType()}`}>
          {hasCopiedU16 ? <>{t('copied')}</> : <>{t('copy')}</>}
        </Button>
      </Stack>
      <Textarea
        value={focusU16 ? u16Value : getU16Value()}
        onChange={handleU16Change}
        onFocus={(e) => handleU16Focus(e, true)}
        placeholder={getEncodeExample()}
        aria-label={`Input Box for converting ${getEncodeType()}`}
        fontSize={['xl', 'md', 'md', 'sm']}
        h={150}
        borderWidth={2}
        borderTopWidth={0}
        borderStyle="solid"
        borderColor="gray.400"
        borderRadius="0 0 10px 10px"
        backgroundColor="rgb(102,205,170,0.1)"
      />
      <Stack direction="row" mt={4}>
        <Stack direction="row">
          <RadioGroup onChange={setOutput} value={output}>
            <Stack direction="column" mx={2}>
              <Radio value="utf16" aria-label="Select UTF-16">
                <Text>UTF-16 \uXXXX </Text>
              </Radio>
              <Radio value="codePt" aria-label="Select Code Point">
                <Text>{t('code-point')} \u&#123;XXXXX&#125; </Text>
              </Radio>
              <Radio value="htmlEn" aria-label="Select HTML Entity">
                <Text>{t('html-entity')} &amp;&#35;XXXX&#59;</Text>
              </Radio>
            </Stack>
          </RadioGroup>
        </Stack>
        <Spacer />
        <Button colorScheme="teal" size="sm" onClick={handleClear} aria-label="Clear">
          {t('clear')}
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" ml={2} mt={4}>
        <Text>{t('convert-ascii-char')}</Text>
        <Switch
          isChecked={isConvASCII}
          onChange={() => setIsConvASCII(!isConvASCII)}
          aria-label="Convert ASCII"
        />
      </Stack>
    </Box>
  );
}

export default Converter;
