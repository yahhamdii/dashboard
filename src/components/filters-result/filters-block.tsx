'use client';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

export type FilterBlockProps = React.ComponentProps<'div'> & {
  label: string;
  isShow: boolean;
  sx?: any;
  children: React.ReactNode;
};

export function FiltersBlock({ label, children, isShow, sx, ...other }: FilterBlockProps) {
  if (!isShow) {
    return null;
  }

  return (
    <BlockRoot sx={sx} {...other}>
      <BlockLabel>{label}</BlockLabel>
      <BlockContent>{children}</BlockContent>
    </BlockRoot>
  );
}

// ----------------------------------------------------------------------

const BlockRoot = styled('div')(() => ({
  display: 'flex',
  overflow: 'hidden',
  gap: tokens.spacing(1),
  padding: tokens.spacing(1),
  borderRadius: tokens.shape.borderRadius,
  border: `dashed 1px ${tokens.colors.divider}`,
}));

const BlockLabel = styled('span')(() => ({
  height: 24,
  lineHeight: '24px',
  fontSize: tokens.typography.subtitle2.fontSize,
  fontWeight: tokens.typography.subtitle2.fontWeight,
}));

const BlockContent = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing(1),
}));
