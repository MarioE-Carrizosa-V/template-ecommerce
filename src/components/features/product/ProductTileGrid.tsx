import React, { useState, useEffect } from 'react';
import { Container, Grid, Heading } from '@chakra-ui/react';
import { ProductTile } from '@src/components/features/product/ProductTile';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

interface ProductTileGridProps {
  title: string;
  products: Array<PageProductFieldsFragment | undefined | null>;
}

const ProductSlider = ({
  products,
}: {
  products: Array<PageProductFieldsFragment | undefined | null>;
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartIndex(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const distance = event.touches[0].clientX - startIndex;
    if (Math.abs(distance) >= 70) {
      if (distance > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
      setStartIndex(event.touches[0].clientX); // Reiniciar la posición inicial
    }
  };

  const handleTouchEnd = () => {
    setStartIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}>
      {products.map((product, index) => (
        <div
          key={product?.sys?.id || index}
          style={{ display: index === currentIndex ? 'block' : 'none' }}>
          {product && <ProductTile {...product} />}
        </div>
      ))}
    </div>
  );
};

export const ProductTileGrid = ({ title, products }: ProductTileGridProps) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 780px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  if (isSmallScreen) {
    return (
      <Container style={{width: '70%'}}>
      <br />
        {title && (
          <Heading
            as="h3"
            style={{ textAlign: 'center', fontFamily: 'Helvetica' }}>
            {title}
          </Heading>
        )}
        <br />
        <ProductSlider products={products} />
        <br />
      </Container>
    );
  }

  return (
    <Container style={{maxWidth: '1220px'}}>
      <br />
      {title && (
        <Heading
          as="h3"
          style={{ textAlign: 'center', fontFamily: 'Helvetica' }}>
          {title}
        </Heading>
      )}
      <br />
      <div style={{ position: 'relative'}}>
        <Grid
          templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)' }}
          rowGap={{ base: 6, lg: 3 }}
          columnGap={{ base: 4, lg: 3 }}>
          {products
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((product, index) => (
              <div key={index} style={{margin: '16px'}}>{product && <ProductTile {...product} />}</div>
            ))}
        </Grid>
        { products.length > itemsPerPage && 
        <>
        <button
          onClick={() => goToPage((currentPage - 1 + totalPages) % totalPages)}
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
        <button
          onClick={() => goToPage((currentPage + 1) % totalPages)}
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
        </>}
      </div>
      <br />
    </Container>
  );
};
