import { Container, Box, Text, Link, useTheme, background } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      as="footer"
      width="full"
      py={{ base: 10, lg: 16 }}
      mt="auto"
      borderTop="1px"
      borderColor={theme.f36.gray200}
      style={{backgroundColor: '#e4007c', color: 'white'}}
      >
      <Container>
        <Text mb={8}>{t('common.aboutUs')}</Text>
        <Text>{t('common.description1')}</Text>
        <Text mb={8}>{t('common.description2')}</Text>
        <Text variant="small">
          {t('common.poweredBy')}{' '}
          <Link href="https://www.vinneren.com.mx/" isExternal color={theme.f36.blue500}>
            Vinneren
          </Link>
        </Text>
      </Container>
    </Box>
  );
};
