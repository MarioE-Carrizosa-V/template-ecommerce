import { Box, Text } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';
import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';
import { useState } from 'react';

export const ProductTile = ({
  featuredProductImage,
  price,
  slug,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });

  const [hovered, setHovered] = useState(false);


  const shadow = {
    boxShadow: '0px 2px 6px 0px',
    transition: 'box-shadow 0.3s ease',
  };

  const noShadow = {
    boxShadow: 'none',
  }
  return slug ? (
    <div {...inspectorProps({ fieldId: 'featuredProductImage' })}       style={hovered? noShadow : shadow}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>
      <Box as={Link} href={slug}>
        {featuredProductImage && (
          <Box borderRadius={4} overflow="hidden">
            <CtfImage {...featuredProductImage} />
          </Box>
        )}
        {price && (
          <Text {...inspectorProps({ fieldId: 'price' })} mt={3} fontWeight="600" style={{color: 'red', font: 'roboto'}}>
            <FormatCurrency value={price}/>
          </Text>
        )}
      </Box>
    </div>
  ) : null;
};
