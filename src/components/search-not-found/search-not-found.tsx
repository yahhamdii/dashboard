'use client';

import type { BoxProps, SxProps, TypographyProps } from 'src/types/component-props';

import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { TypographyWrapper as Typography } from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type SearchNotFoundProps = BoxProps & {
  query?: string;
  sx?: SxProps<Theme>;
  slotProps?: {
    title?: TypographyProps;
    description?: TypographyProps;
  };
};

export function SearchNotFound({ query, sx, slotProps, className, ...other }: SearchNotFoundProps) {
  const useCircuit = useCircuitLayoutsWithPathname();

  if (!query) {
    return (
      <Typography variant="body2" {...slotProps?.description}>
        Please enter keywords
      </Typography>
    );
  }

  // Migration vers Tailwind pour les cas simples
  const tailwindClasses = 'flex flex-col gap-1 rounded-xl text-center';
  const combinedClassName = className ? `${tailwindClasses} ${className}` : tailwindClasses;

  // Filtrer les props MUI spécifiques
  const {
    sx: _sx,
    ...divProps
  } = other as any;

  if (useCircuit) {
    return (
      <div
        className={combinedClassName}
        {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
      >
        <Typography
          variant="h6"
          {...slotProps?.title}
          sx={[
            { color: 'text.primary' },
            ...(Array.isArray(slotProps?.title?.sx) ? slotProps.title.sx : [slotProps?.title?.sx]),
          ]}
        >
          Not found
        </Typography>

        <Typography variant="body2" {...slotProps?.description}>
          No results found for &nbsp;
          <strong>{`"${query}"`}</strong>
          .
          <br /> Try checking for typos or using complete words.
        </Typography>
      </div>
    );
  }

  // Fallback MUI pour les cas complexes ou quand le flag est désactivé
  return (
    <Box
      sx={[
        {
          gap: 1,
          display: 'flex',
          borderRadius: 1.5,
          textAlign: 'center',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={className}
      {...other}
    >
      <Typography
        variant="h6"
        {...slotProps?.title}
        sx={[
          { color: 'text.primary' },
          ...(Array.isArray(slotProps?.title?.sx) ? slotProps.title.sx : [slotProps?.title?.sx]),
        ]}
      >
        Not found
      </Typography>

      <Typography variant="body2" {...slotProps?.description}>
        No results found for &nbsp;
        <strong>{`"${query}"`}</strong>
        .
        <br /> Try checking for typos or using complete words.
      </Typography>
    </Box>
  );
}
