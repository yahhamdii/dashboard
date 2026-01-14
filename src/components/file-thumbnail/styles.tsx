import type { FileThumbnailProps } from './types';

import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

export const ThumbnailRoot = styled('span')(() => ({
  width: 36,
  height: 36,
  flexShrink: 0,
  alignItems: 'center',
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  borderRadius: tokens.shape.borderRadius * 1.25,
}));

export const ThumbnailImage = styled('img', {
  shouldForwardProp: (prop: string) => !['showImage', 'sx'].includes(prop),
})<Pick<FileThumbnailProps, 'showImage'>>({
  width: '100%',
  height: '100%',
  variants: [
    {
      props: (props) => !!props.showImage,
      style: {
        objectFit: 'cover',
        borderRadius: 'inherit',
      },
    },
  ],
});

export const RemoveButton = styled(IconButton)(() => ({
  top: 4,
  right: 4,
  position: 'absolute',
  padding: tokens.spacing(0.5),
  color: tokens.colors.common.white,
  backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.48),
  '&:hover': {
    backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.72),
  },
}));

export const DownloadButton = styled(ButtonBase)(() => ({
  top: 0,
  right: 0,
  zIndex: 9,
  padding: 0,
  opacity: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  borderRadius: 'inherit',
  color: tokens.colors.common.white,
  transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.64),
    opacity: 1,
  },
}));
