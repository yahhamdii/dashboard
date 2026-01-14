import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { CardWrapper as Card } from 'src/components/circuit-ui';

import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { Image } from 'src/components/image';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = CardProps & {
  list: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export function AppFeatured({ list, sx, ...other }: Props) {
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 8000 })]);

  return (
    <Card sx={[{ bgcolor: 'common.black' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          left: 16,
          position: 'absolute',
          color: 'primary.light',
        }}
      />

      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        sx={{
          top: 8,
          right: 8,
          position: 'absolute',
          color: 'common.white',
        }}
      />

      <Carousel carousel={carousel}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = BoxProps & {
  item: Props['list'][number];
};

function CarouselItem({ item, sx, ...other }: CarouselItemProps) {
  const useCircuit = useCircuitLayoutsWithPathname();
  
  // Filtrer les props MUI spécifiques
  const {
    sx: _sx,
    ...divProps
  } = other as any;
  
  return useCircuit ? (
    <div className="w-full relative" {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1 z-10 text-white">
        <Typography variant="overline" sx={{ color: 'primary.light' }}>
          Featured App
        </Typography>

        <Link color="inherit" underline="none" variant="h5" noWrap>
          {item.title}
        </Link>

        <Typography variant="body2" noWrap>
          {item.description}
        </Typography>
      </div>

      <Image
        alt={item.title}
        src={item.coverUrl}
        slotProps={{
          overlay: {
            sx: (theme) => ({
              backgroundImage: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.common.black} 75%)`,
            }),
          },
        }}
        sx={{ width: 1, height: { xs: 288, xl: 320 } }}
      />
    </div>
  ) : (
    <Box
      sx={[
        {
          width: 1,
          position: 'relative',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {useCircuit ? (
        <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1 z-10 text-white">
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
            Featured App
          </Typography>

          <Link color="inherit" underline="none" variant="h5" noWrap>
            {item.title}
          </Link>

          <Typography variant="body2" noWrap>
            {item.description}
          </Typography>
        </div>
      ) : (
        <Box
          sx={{
            p: 3,
            gap: 1,
            width: 1,
            bottom: 0,
            zIndex: 9,
            display: 'flex',
            position: 'absolute',
            color: 'common.white',
            flexDirection: 'column',
          }}
        >
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
            Featured App
          </Typography>

          <Link color="inherit" underline="none" variant="h5" noWrap>
            {item.title}
          </Link>

          <Typography variant="body2" noWrap>
            {item.description}
          </Typography>
        </Box>
      )}

      <Image
        alt={item.title}
        src={item.coverUrl}
        slotProps={{
          overlay: {
            sx: (theme) => ({
              backgroundImage: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.common.black} 75%)`,
            }),
          },
        }}
        sx={{ width: 1, height: { xs: 288, xl: 320 } }}
      />
    </Box>
  );
}
