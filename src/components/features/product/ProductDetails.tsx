import { Box, Container, Flex, Grid, GridItem, Heading, Text, useTheme } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Slider from 'react-slick';

import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { QuantitySelector } from '@src/components/shared/quantity-selector';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';
import { useEffect } from 'react';

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
  console.log(featuredProductImage);
  console.log(productImagesCollection?.items);

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    className: 'center',
    centerMode: true,
    centerPadding: '0px',
    rows: 1,
    slidesPerRow: 1,
    fade: false,
    pauseOnHover: true,
  }

  const allImages = [featuredProductImage, ...productImagesCollection?.items]
  
  return (
    <Container mt={{ base: 6, lg: 16 }}>
      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 5, lg: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 7, xl: 8 }}>
          <Flex flexDirection="column" gap={{ base: 3, lg: 5 }}>

          <Slider {...settings}
                style={{ height: '50%', display: 'flex', justifyContent: 'center' }}>
              { 
              allImages.map((image, index) => (
                image?.url &&
            <img
              key={index}
              src={image?.url}
           // style={{ width: setting?.imageWidth, height: setting?.imageHeigth }}
            />
              ))}
      </Slider>
            {/* {featuredProductImage && (
              <CtfImage
                livePreviewProps={inspectorProps({ fieldId: 'featuredProductImage' })}
                {...featuredProductImage}
              />
            )}
            {productImagesCollection?.items &&
              productImagesCollection.items.map(image => {
                console.log(image);
                
                return image ? (
                  <CtfImage
                    livePreviewProps={inspectorProps({ fieldId: 'productImages' })}
                    key={image.sys.id}
                    imageProps={{
                      sizes: '(max-width: 1200px) 70vw, 100vw',
                    }}
                    {...image}
                  />
                ) : null;
              })} */}
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 5, xl: 4 }}>
          <Box
            width="100%"
            bg={theme.f36.gray100}
            mb="auto"
            borderRadius={4}
            px={{ base: 4, lg: 6 }}
            pt={{ base: 6, lg: 6 }}
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
