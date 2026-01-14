import styled from '@emotion/styled';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

export const BreadcrumbsRoot = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing(2),
} as any));

export const BreadcrumbsHeading = styled('h6')(() => ({
  ...tokens.typography.h4,
  margin: 0,
  padding: 0,
  display: 'inline-flex',
}));

export const BreadcrumbsContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing(2),
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
} as any));

export const BreadcrumbsContent = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  gap: tokens.spacing(2),
  flexDirection: 'column',
} as any));

export const BreadcrumbsSeparator = styled('span')(() => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: tokens.colors.text.disabled,
}));
