import {
  Text,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex
} from '@chakra-ui/react';
import LanguageIcon from '@icons/Login.svg';
import ShopingBag from '@icons/bagShopping.svg';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export const LanguageSelectorMobile = ({ displayName, localeName }) => {
  const { locale, locales } = useRouter();
  const router = useRouter();
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLSelectElement | null>(null);

  return (
    <Flex justifyContent="center" alignItems="center" >
      <Button variant="unstyled" onClick={onOpen}>
      <LanguageIcon width="40px" height="40px" variant="secondary"/>
      </Button>
      <ShopingBag width="32px" height="32px"/>

      {/* <Drawer isOpen={isOpen} onClose={onClose} placement="right" initialFocusRef={firstField}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={20}>{t('common.regionalSettings')}</DrawerHeader>

          <DrawerBody>
            <Text fontSize="md" fontWeight={600}>
              {t('common.language')}
            </Text>
            <Select
              size="md"
              mt={2}
              ref={firstField}
              defaultValue={locale}
              onChange={event => {
                router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
                  locale: String(event.target.value),
                });
                onClose();
              }}>
              {locales?.map(availableLocale => (
                <option key={availableLocale} value={availableLocale}>
                  {displayName(availableLocale).of(localeName(availableLocale))}
                </option>
              ))}
            </Select>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
    </Flex>
  );
};
