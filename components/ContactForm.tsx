/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// React
import { useEffect, useState } from 'react';

// React Hook Form
import { useForm } from 'react-hook-form';

// i18n
import { useTranslation } from 'next-i18next';

// Chakra UI
import {
  Alert,
  AlertIcon,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Divider,
  Text,
  Input,
  Button,
  Textarea,
  Box,
  Heading,
  Flex,
  Wrap,
  WrapItem,
  Center,
  Checkbox,
  Spacer,
  useDisclosure,
  Slide,
} from '@chakra-ui/react';

// Icons
import { MdSend, MdClear } from 'react-icons/md';

export default function HookForm() {
  const { t } = useTranslation('common');
  const [check, setCheck] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    const newValue = { ...values, sendCopy: check };
    const res = await fetch('/api/sendgrid', {
      body: JSON.stringify(newValue),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const { error } = await res.json();
    if (error) {
      console.log(error);
    }
    onToggle();
    reset();
  };
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onToggle();
      }, 2000);
    }
  }, [isOpen]);
  return (
    <Box px={[4, 4, 8, 12]} pt={2} pb={12}>
      <Heading as="h1" fontSize={['2xl', '2xl', 'xl', 'xl']} pl={0} pt={4} mb={[0, 0, 6, 6]}>
        {t('contact-us')}
      </Heading>
      <Wrap justify="center">
        <WrapItem
          flex={1}
          p={0}
          w={['90vw', '85vw', '340px', '380px']}
          minW={['80vw', '60vw', '40vw', '300px']}
        >
          <Box mr={[0, 0, 0, 2]} fontSize={['xl', 'xl', 'xl', 'xl']}>
            <Text py={4}>{t('contact-para-1')}</Text>
            <Text>{t('contact-para-2')}</Text>
            <Text py={4}>{t('contact-para-3')}</Text>
          </Box>
        </WrapItem>
        <Center display={['none', 'none', 'block', 'block']} h={500} px={4}>
          <Divider orientation="vertical" />
        </Center>
        <Divider display={['block', 'block', 'none', 'none']} orientation="horizontal" />

        <WrapItem
          flex={1}
          p={0}
          w={['90vw', '85vw', '340px', '380px']}
          minW={['80vw', '60vw', '40vw', '300px']}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginLeft: '0px' }}>
            <FormControl isInvalid={errors.name} mt={[4, 4, 0, 0]}>
              <FormLabel htmlFor="name" fontSize={['xl', 'xl', 'md', 'md']}>
                {t('name')}{' '}
                <Text as="span" color="red.400">
                  *
                </Text>
              </FormLabel>
              <Input
                id="name"
                placeholder="Jane"
                borderColor="gray.400"
                {...register('name', {
                  required: 'This is required',
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              />
              <Box h={4} pt={2}>
                <FormErrorMessage m={0}>{errors.name && errors.name.message}</FormErrorMessage>
              </Box>
            </FormControl>
            <FormControl isInvalid={errors.email} mt={4}>
              <FormLabel htmlFor="email" fontSize={['xl', 'xl', 'md', 'md']}>
                {t('email-address')}{' '}
                <Text as="span" color="red.400">
                  *
                </Text>
              </FormLabel>
              <Input
                id="email"
                type="email"
                borderColor="gray.400"
                placeholder="someone@hotmail.com"
                {...register('email', {
                  required: 'Email is required',
                })}
              />
              <Box h={4} pt={2}>
                <FormErrorMessage m={0}>{errors.email && errors.email.message}</FormErrorMessage>
              </Box>
            </FormControl>
            <FormControl isInvalid={errors.msg} mt={4}>
              <FormLabel htmlFor="msg" fontSize={['xl', 'xl', 'md', 'md']}>
                {t('message')}{' '}
                <Text as="span" color="red.400">
                  *
                </Text>
              </FormLabel>
              <Textarea
                id="msg"
                placeholder="Hi!"
                borderColor="gray.400"
                {...register('msg', {
                  required: 'This is required',
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
                h={150}
              />
              <Box h={6} pt={2}>
                <FormErrorMessage m={0}>{errors.msg && errors.msg.message}</FormErrorMessage>
              </Box>
            </FormControl>
            <Flex>
              <Checkbox isChecked={check} onChange={() => setCheck(!check)}>
                {t('send-me-copy')}
              </Checkbox>
              <Spacer />
              <Button mt={6} colorScheme="red" type="button" onClick={() => reset()}>
                <MdClear style={{ marginRight: '4px' }} />
                {t('clear')}
              </Button>
              <Button mt={6} ml={3} colorScheme="blue" isLoading={isSubmitting} type="submit">
                <MdSend style={{ marginRight: '4px' }} /> {t('send')}
              </Button>
            </Flex>
          </form>
        </WrapItem>
      </Wrap>

      <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
        <Alert status="success">
          <AlertIcon />
          {t('message-sent')}
        </Alert>
      </Slide>
    </Box>
  );
}
