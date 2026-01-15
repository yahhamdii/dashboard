
import { LinkWrapper as Link } from 'src/components/circuit-ui';
import styled from '@emotion/styled';
import { tokens } from 'src/theme/design-tokens';

// import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = React.ComponentProps<'div'> & {
  name?: string;
  href?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  sx?: any;
};

export function BreadcrumbsLink({ href, icon, name, disabled, ...other }: BreadcrumbsLinkProps) {
  const renderContent = () => (
    <ItemRoot disabled={disabled} {...other}>
      {icon && <ItemIcon>{icon}</ItemIcon>}
      {name}
    </ItemRoot>
  );

  if (href) {
    return (
      <Link
        href={href}
        // component={RouterLink} // LinkWrapper handles this internally via router or a tag
        color="inherit"
        sx={{
          display: 'inline-flex',
          ...(disabled && { pointerEvents: 'none' }),
        }}
      >
        {renderContent()}
      </Link>
    );
  }

  return renderContent();
}

// ----------------------------------------------------------------------

const ItemRoot = styled('div', {
  shouldForwardProp: (prop: string) => !['disabled', 'sx'].includes(prop),
})<Pick<BreadcrumbsLinkProps, 'disabled'>>(({ disabled }) => ({
  ...tokens.typography.body2,
  alignItems: 'center',
  gap: tokens.spacing(0.5),
  display: 'inline-flex',
  color: tokens.colors.text.primary,
  ...(disabled && {
    cursor: 'default',
    pointerEvents: 'none',
    color: tokens.colors.text.disabled,
  }),
}));

const ItemIcon = styled('span')(() => ({
  display: 'inherit',
  /**
   * As ':first-child' for ssr
   * https://github.com/emotion-js/emotion/issues/1105#issuecomment-1126025608
   */
  '& > :first-of-type:not(style):not(:first-of-type ~ *), & > style + *': {
    width: 20,
    height: 20,
  },
}));
