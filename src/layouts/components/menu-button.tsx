import { IconButtonWrapper as IconButton } from 'src/components/circuit-ui';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function MenuButton({ sx, style, ...other }: React.ComponentProps<typeof IconButton>) {
  // Filtrer sx pour ne garder que les propriétés CSS valides (pas de @media, :hover, etc.)
  const filteredSx: React.CSSProperties = {};

  if (sx && typeof sx === 'object' && !Array.isArray(sx)) {
    Object.keys(sx).forEach((key) => {
      // Ignorer les media queries, pseudo-classes/elements et nested styles
      if (!key.startsWith('@') && !key.startsWith('&') && !key.startsWith(':')) {
        const value = sx[key];
        // Ignorer les valeurs qui sont des objets (nested styles)
        if (typeof value !== 'object') {
          filteredSx[key as keyof React.CSSProperties] = value;
        }
      }
    });
  }

  const mergedStyles: React.CSSProperties = {
    ...filteredSx,
    ...(style || {}),
  };

  return (
    <IconButton style={mergedStyles} {...other}>
      <Iconify icon="custom:menu-duotone" width={24} />
    </IconButton>
  );
}
