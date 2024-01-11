import { Box, Heading, Text } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';
import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';
import { useState } from 'react';

export const ProductTile = ({
  name,
  featuredProductImage,
  price,
  slug,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });

  const [hovered, setHovered] = useState(false);

  const shadow = {
    height: '90%',
    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)'
  };

  const noShadow = {
    height: '90%',
    boxShadow: 'none',
  }
  return slug ? (
    <div {...inspectorProps({ fieldId: 'featuredProductImage' })} style={hovered? shadow: noShadow} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Box as={Link} href={slug}>
        {featuredProductImage && (
          <Box borderRadius={4} overflow="hidden">
            <CtfImage {...featuredProductImage} />
          </Box>
        )}
        {name && (
            <Heading {...inspectorProps({ fieldId: 'name' })} style={{font: 'Arial', fontSize: '1rem', textAlign: 'center'}}>
              {name}
            </Heading>
        )}
          <br />
        {price && (
          <Text {...inspectorProps({ fieldId: 'price' })} fontWeight="800" style={{fontSize: '1rem', color: 'red', font: 'Arial', display:'flex', justifyContent:'center'}}>
            <FormatCurrency value={price}/>
          </Text>
        )}
        <br />
      </Box>
    </div>
  ) : null;
};
