
import { LinkWrapper as Link } from 'src/components/circuit-ui';

import { RouterLink } from 'src/routes/components';

import { Iconify, iconifyClasses } from '../iconify';

// ----------------------------------------------------------------------

export type BackLinkProps = React.ComponentProps<'a'> & {
  label?: string;
  sx?: any;
};

export function BackLink({ sx, label, ...other }: BackLinkProps) {
  return (
    <Link
      component={RouterLink}
      color="inherit"
      underline="none"
      sx={[
        (theme: any) => ({
          verticalAlign: 'middle',
          [`& .${iconifyClasses.root}`]: {
            verticalAlign: 'inherit',
            transform: 'translateY(-2px)',
            ml: {
              xs: '-14px',
              md: '-18px',
            },
            transition: theme.transitions.create(['opacity'], {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.sharp,
            }),
          },
          '&:hover': {
            [`& .${iconifyClasses.root}`]: {
              opacity: 0.48,
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify width={18} icon="eva:arrow-ios-back-fill" />
      {label}
    </Link>
  );
}
