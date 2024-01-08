import React, { useState, useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { ProductTile } from '@src/components/features/product/ProductTile';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';
import Carousel from 'nuka-carousel';

const CustomControls = ({
  previousDisabled,
  nextDisabled,
  previousSlide,
  nextSlide,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <button onClick={previousSlide} disabled={previousDisabled}
     style={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '0',
      marginLeft: '-30px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1.5rem',
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#e4007c" />
      <path
        d="M11 13l-3-3 3-3"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="scale(1.2)"
      />
    </svg>
  </button>

    <button onClick={nextSlide} disabled={nextDisabled}
     style={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '0', // Mover el botón más a la derecha
      marginRight: '-30px', // Margen negativo para empujar más a la orilla
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1.8rem',
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#e4007c" />
      <path
        d="M9 13.5l3-3-3-3"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="scale(1.2)"
      />
    </svg>
  </button>
  </div>
);
interface ProductTileGridProps {
  title: string;
  products: Array<PageProductFieldsFragment | undefined | null>;
}

export const ProductTileGrid = ({ title, products }: ProductTileGridProps) => {
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [showControls, setShowControls] = useState(true);
  
    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
          setSlidesToShow(1);
          setShowControls(false);
        } else if (screenWidth <= 780) {
          setSlidesToShow(2);
          setShowControls(true);
        } else {
          setSlidesToShow(3);
          setShowControls(true);
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  

  return (
<Container style={{ maxWidth: '1600px', margin: '16px auto' }}>
      <br />
      {title && (
        <Heading as="h3" style={{ textAlign: 'center', fontFamily: 'Helvetica' }}>
          {title}
        </Heading>
      )}
      <br />
      <div style={{ margin: '0 auto', maxWidth: '1600px', width: '100%' }}>
        <Carousel
          cellAlign="center"
          style={{ margin: '16px auto', maxWidth: '1600px', width: '100%' }}
          slidesToShow={slidesToShow}
          wrapAround
          renderCenterRightControls={(props) =>
            showControls ? <CustomControls {...props} /> : null
          }
          renderCenterLeftControls={() => null}
          renderBottomCenterControls={() => null}
        >
          {products.map((product, index) => (
            <div key={index} style={{ margin: '8px' }}>
              {product && <ProductTile {...product} />}
            </div>
          ))}
        </Carousel>
      </div>
      <br />
    </Container>
  );
};