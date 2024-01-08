import { Heading, Box, Grid, GridItem } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { CtfImage } from '@src/components/features/contentful/ctf-image/CtfImage';
import { PageLandingFieldsFragment } from '@src/lib/__generated/sdk';

const StyledBox = styled(Box)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`;

export const PromoLiverpool = ({
  // Tutorial: contentful-and-the-starter-template.md
  // Uncomment the line below to make the Greeting field available to render
  // greeting,
  tituloLiverpool,
  promoLiverpoolCollection,
  promocionesLiverpoolCollection,
  liverpoolPocket,
  sys: { id: entryId },
}: PageLandingFieldsFragment) => {
  const router = useRouter();
  const inspectorProps = useContentfulInspectorMode({ entryId });

  // const containerRef = useRef<HTMLDivElement | null>(null);
  // const headingRef = useRef<HTMLHeadingElement | null>(null);

  // const [headingVisible, setHeadingVisible] = useState(false);

  // useEffect(() => {
  //   const handleFontSize = () => {
  //     window.requestAnimationFrame(() => {
  //       if (containerRef.current && headingRef.current) {
  //         headingRef.current.style.display = 'inline-block'; // In order to calculate the ratio for our font scaling, it needs to be inline, so it doesn't grab the full width of its parent.

  //         // Retrieve the width of both the container and the heading element
  //         const { width: containerWidth } = containerRef.current.getBoundingClientRect();
  //         const { width: headingWidth } = headingRef.current.getBoundingClientRect();

  //         // Retrieve some computed styles, that will be used to accurately remove any additional padding, margin and other layout altering properties from the container width
  //         const headingComputedStyle = window.getComputedStyle(headingRef.current, null);
  //         const headingFontSize = headingComputedStyle.getPropertyValue('font-size');
  //         const headingLetterSpacing = headingComputedStyle.getPropertyValue('letter-spacing');

  //         const containerComputedStyle = window.getComputedStyle(containerRef.current, null);

  //         // Calculate the amount of pixels that need to be deducted from the raw container width
  //         const containerWidthFluff =
  //           parseInt(containerComputedStyle.paddingLeft, 10) +
  //           parseInt(containerComputedStyle.paddingRight, 10) +
  //           Math.abs(parseInt(headingLetterSpacing, 10));

  //         // Calculate the font-size based on its base times the scaling ratio
  //         headingRef.current.style.fontSize = `calc(${headingFontSize} * ${
  //           (containerWidth - containerWidthFluff) / headingWidth
  //         })`;

  //         setHeadingVisible(true);
  //       }
  //     });
  //   };

  //   handleFontSize(); // Runs the method once on init, and a second time after changing visibility so the heading size is corrected after initial calculation as a safeguard

  //   router.events.on('routeChangeComplete', handleFontSize);
  //   window.addEventListener('resize', handleFontSize);

  //   return () => {
  //     window.removeEventListener('resize', handleFontSize);
  //     router.events.off('routeChangeComplete', handleFontSize);
  //   };
  // }, [headingVisible, router.events, router.query]);

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <Grid
        justifyContent="center" // Centrar horizontalmente
        alignItems="center"
        mb={3}
        position="relative"
        gridRow={2}
        gridColumn={1}
        {...inspectorProps({ fieldId: 'liverpoolPocket' })}>
        <StyledBox gridColumnStart={2} zIndex={0} gridArea={{ base: '1 / 1 / 2 / 2' }}>
          <Heading as="h2" mb={3} style={{ textAlign: 'center', fontFamily: 'Arial' }}>
            {tituloLiverpool}
          </Heading>
        </StyledBox>
      </Grid>
      <Grid
        style={{ margin: '16px' }}
        templateColumns={{
          base: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        rowGap={{ base: 3, lg: 4 }}
        columnGap={{ base: 3, lg: 4 }}>
        {promocionesLiverpoolCollection?.items.map((image, index) => {
          return (
            <GridItem key={index}>
              {image ? (
                <CtfImage
                  imageProps={{
                    sizes: '100vw',
                  }}
                  {...image}
                />
              ) : null}{' '}
            </GridItem>
          );
        })}
      </Grid>

      <Grid
        style={{ margin: '16px' }}
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        rowGap={{ base: 3, lg: 4 }}
        columnGap={{ base: 3, lg: 4 }}>
        {promoLiverpoolCollection?.items.map((image, index) => {
          if (image && image?.url) {
            const updatedImage = {
              ...image,
              url: `${image?.url}?fit=scale&w=770&h=770`,
            };
            return (
              <GridItem key={index}>
                {updatedImage ? (
                  <CtfImage
                    imageProps={{
                      sizes: '100vw',
                    }}
                    {...updatedImage}
                  />
                ) : null}{' '}
              </GridItem>
            );
          }
        })}
      </Grid>

      {liverpoolPocket?.url && (
        <div style={{ margin: '16px' }}>
          <CtfImage imageProps={{}} {...liverpoolPocket} />
        </div>
      )}
    </div>
  );
};
