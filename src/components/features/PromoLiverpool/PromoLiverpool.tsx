import { Heading, Box, Grid, GridItem } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import styled from '@emotion/styled';
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
  tituloLiverpool,
  promoLiverpoolCollection,
  promocionesLiverpoolCollection,
  liverpoolPocket,
  sys: { id: entryId },
}: PageLandingFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <Grid
        justifyContent="center"
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
