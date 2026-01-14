import type { IUserProfileGallery } from 'src/types/user';

import {
  BoxWrapper as Box,
  CardWrapper as Card,
  IconButtonWrapper,
  ListItemTextWrapper as ListItemText,
  TypographyWrapper as Typography
} from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';
import { tokens } from 'src/theme/design-tokens';

import { fDate } from 'src/utils/format-time';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Lightbox, useLightbox } from 'src/components/lightbox';

// ----------------------------------------------------------------------

type Props = {
  gallery: IUserProfileGallery[];
};

export function ProfileGallery({ gallery }: Props) {
  const slides = gallery.map((slide) => ({ src: slide.imageUrl }));
  const lightbox = useLightbox(slides);

  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Gallery
      </Typography>

      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {gallery.map((image) => (
          <Card key={image.id} sx={{ cursor: 'pointer', color: tokens.colors.common.white }}>
            <IconButtonWrapper
              color="inherit"
              sx={{
                top: 8,
                right: 8,
                zIndex: 9,
                position: 'absolute',
              }}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButtonWrapper>

            <ListItemText
              sx={{ p: 3, left: 0, width: 1, bottom: 0, zIndex: 9, position: 'absolute' }}
              primary={image.title}
              secondary={fDate(image.postedAt)}
              slotProps={{
                primary: {
                  noWrap: true,
                  sx: { typography: 'subtitle1' },
                },
                secondary: {
                  sx: { mt: 0.5, opacity: 0.48, color: 'inherit' },
                },
              }}
            />

            <Image
              alt="Gallery"
              src={image.imageUrl}
              ratio="1/1"
              onClick={() => lightbox.onOpen(image.imageUrl)}
              slotProps={{
                overlay: {
                  sx: {
                    backgroundImage: `linear-gradient(to bottom, transparent 0%, ${tokens.colors.common.black} 75%)`,
                  },
                },
              }}
            />
          </Card>
        ))}
      </Box>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}
