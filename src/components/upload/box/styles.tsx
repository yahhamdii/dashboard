import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

import { uploadClasses } from '../classes';

// ----------------------------------------------------------------------

export const UploadArea = styled('div')(() => ({
  width: 64,
  height: 64,
  flexShrink: 0,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.shape.borderRadius,
  color: tokens.colors.text.disabled,
  backgroundColor: varAlpha(tokens.colors.grey['500Channel'], 0.08),
  border: `dashed 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.2)}`,
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
