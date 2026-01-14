import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { tokens } from 'src/theme/design-tokens';

import { uploadClasses } from '../classes';

// ----------------------------------------------------------------------

export const UploadWrapper = styled('div')({
  width: '100%',
  position: 'relative',
});

export const UploadArea = styled('div')(() => ({
  minHeight: 280,
  outline: 'none',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  padding: tokens.spacing(3),
  borderRadius: tokens.shape.borderRadius,
  transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: varAlpha(tokens.colors.grey['500Channel'], 0.08),
  border: `1px dashed ${varAlpha(tokens.colors.grey['500Channel'], 0.2)}`,
  '&:hover': {
    opacity: 0.72,
  },
  [`&.${uploadClasses.state.dragActive}`]: {
    opacity: 0.72,
  },
  [`&.${uploadClasses.state.disabled}`]: {
    opacity: 0.48,
    pointerEvents: 'none',
  },
  [`&.${uploadClasses.state.error}`]: {
    color: tokens.colors.error.main,
    borderColor: tokens.colors.error.main,
    backgroundColor: varAlpha(tokens.colors.error.mainChannel, 0.08),
  },
}));

export const PlaceholderContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  [`& .${uploadClasses.placeholder.content}`]: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    gap: tokens.spacing(1),
  },
  [`& .${uploadClasses.placeholder.title}`]: {
    ...tokens.typography.h6,
  },
  [`& .${uploadClasses.placeholder.description}`]: {
    ...tokens.typography.body2,
    color: tokens.colors.text.secondary,
    '& span': {
      textDecoration: 'underline',
      color: tokens.colors.primary.main,
    },
  },
}));

export const DeleteButton = styled(IconButton)(() => ({
  top: 16,
  right: 16,
  zIndex: 9,
  position: 'absolute',
  color: varAlpha(tokens.colors.common.whiteChannel, 0.8),
  backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.72),
  '&:hover': {
    backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.48),
  },
}));
