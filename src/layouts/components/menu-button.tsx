import { IconButtonWrapper as IconButton } from 'src/components/circuit-ui';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function MenuButton({ sx, style, ...other }: React.ComponentProps<typeof IconButton>) {
  const mergedStyles: React.CSSProperties = {
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    ...(style || {}),
  };

  return (
    <IconButton style={mergedStyles} {...other}>
      <Iconify icon="custom:menu-duotone" width={24} />
    </IconButton>
  );
}
