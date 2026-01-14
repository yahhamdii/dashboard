import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Autoplay from 'embla-carousel-autoplay';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import Link from '@mui/material/Link';

import { CardWrapper as Card } from 'src/components/circuit-ui';

import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';
import { tokens } from 'src/theme/design-tokens';

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
    <Card sx={[{ bgcolor: tokens.colors.common.black }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          left: 16,
          position: 'absolute',
          color: tokens.colors.primary.light,
        }}
      />

      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        sx={{
          top: 8,
          right: 8,
          position: 'absolute',
          color: tokens.colors.common.white,
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

  const content = (
    <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1 z-10 text-white">
      <Typography variant="overline" sx={{ color: tokens.colors.primary.light }}>
        Featured App
      </Typography>

      <Link color="inherit" underline="none" variant="h5" noWrap>
        {item.title}
      </Link>

      <Typography variant="body2" noWrap>
        {item.description}
      </Typography>
    </div>
  );

  return (
    <Box
      sx={[
        {
          width: 1,
          position: 'relative',
          color: tokens.colors.common.white,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {content}

      <Image
        alt={item.title}
        src={item.coverUrl}
        slotProps={{
          overlay: {
            sx: {
              backgroundImage: `linear-gradient(to bottom, transparent 0%, ${tokens.colors.common.black} 75%)`,
            },
          },
        }}
        sx={{ width: 1, height: { xs: 288, xl: 320 } }}
      />
    </Box>
  );
}
