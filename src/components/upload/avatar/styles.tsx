import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

import { uploadClasses } from '../classes';

// ----------------------------------------------------------------------

export const UploadWrapper = styled('div')({
  width: '100%',
  position: 'relative',
});

export const UploadArea = styled('div')(() => ({
  width: 144,
  height: 144,
  margin: 'auto',
  cursor: 'pointer',
  borderRadius: '50%',
  position: 'relative',
  padding: tokens.spacing(1),
  border: `1px dashed ${varAlpha(tokens.colors.grey['500Channel'], 0.2)}`,
  [`&.${uploadClasses.state.dragActive}`]: {
    opacity: 0.72,
  },
  [`&.${uploadClasses.state.disabled}`]: {
    opacity: 0.48,
    pointerEvents: 'none',
  },
  [`&.${uploadClasses.state.error}`]: {
    borderColor: tokens.colors.error.main,
    [`& .${uploadClasses.placeholder.root}`]: {
      color: tokens.colors.error.main,
      backgroundColor: varAlpha(tokens.colors.error.mainChannel, 0.08),
    },
    [`&.${uploadClasses.state.hasFile}`]: {
      backgroundColor: varAlpha(tokens.colors.error.mainChannel, 0.08),
    },
  },
  [`&.${uploadClasses.state.hasFile}`]: {
    [`& .${uploadClasses.placeholder.root}`]: {
      opacity: 0,
      color: tokens.colors.common.white,
      backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.64),
    },
    [`&:hover .${uploadClasses.placeholder.root}`]: {
      opacity: 1,
    },
  },
}));

export const UploadContent = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  borderRadius: 'inherit',
});

export const PreviewImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

export const PlaceholderContainer = styled('div')(() => ({
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  borderRadius: 'inherit',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: tokens.spacing(1),
  color: tokens.colors.text.disabled,
  backgroundColor: varAlpha(tokens.colors.grey['500Channel'], 0.08),
  transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    opacity: 0.72,
  },
}));
