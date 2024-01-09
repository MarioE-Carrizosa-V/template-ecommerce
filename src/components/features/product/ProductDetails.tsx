import { Box, Container, Flex, Grid, GridItem, Heading, Text, useTheme } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import React, { useState, useEffect } from 'react';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { QuantitySelector } from '@src/components/shared/quantity-selector';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';
import Carousel from 'nuka-carousel';

export const ProductDetails = ({
  name,
  price,
  description,
  featuredProductImage,
  productImagesCollection,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const theme = useTheme();
  const inspectorProps = useContentfulInspectorMode({ entryId });
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) {
        setImageSize({width: 500, height: 700});
      } else if (screenWidth <= 780) {
        setImageSize({width: 700, height: 900});
      } else {
        setImageSize({width: 1000, height: 1200});
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const allImages = [
    featuredProductImage,
    ...(productImagesCollection?.items ?? []),
  ];
    
  return (
    <Container>
      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 5, lg: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 6, xl: 6 }}>

          <Carousel
            renderBottomCenterControls={() => null}
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
            wrapAround
            autoplay={true}
          >
          {allImages.map((image, index) => (
              image?.url && image?.title &&
            <img
              alt={image?.title}
              key={index}
              src={`${image?.url}?fit=scale&w=${imageSize.width}&h=${imageSize.height}`}
            />
              ))}
          </Carousel>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 6, xl: 6 }} pt={{ lg: 20 }}>
          <Box
            width="100%"
            bg={theme.f36.gray100}
            mb="auto"
            borderRadius={4}
            px={{ base: 4, lg: 6 }}
            pt={{ base: 6, lg: 10 }}
            pb={{ base: 8, lg: 14 }}>
            <Heading {...inspectorProps({ fieldId: 'name' })} as="h1" variant="h3">
              {name}
            </Heading>
            {price && (
              <Text {...inspectorProps({ fieldId: 'price' })} mt={1} fontWeight="500">
                <FormatCurrency value={price} />
              </Text>
            )}
            <Text {...inspectorProps({ fieldId: 'description' })} mt={5} color={theme.f36.gray700}>
              {description}
            </Text>

            <Box mt={{ base: 5, lg: 10 }}>
              <QuantitySelector />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
