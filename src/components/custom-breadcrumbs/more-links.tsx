import { LinkWrapper as Link } from 'src/components/circuit-ui';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------

export type MoreLinksProps = React.ComponentProps<typeof MoreLinksRoot> & {
  links?: string[];
  sx?: any;
};

export function MoreLinks({ links, sx, ...other }: MoreLinksProps) {
  const sxStyles = Array.isArray(sx) ? Object.assign({}, ...sx) : sx;
  return (
    <MoreLinksRoot style={sxStyles as React.CSSProperties} {...other}>
      {links?.map((href) => (
        <li key={href}>
          <Link href={href} variant="body2" target="_blank" rel="noopener noreferrer">
            {href}
          </Link>
        </li>
      ))}
    </MoreLinksRoot>
  );
}

// ----------------------------------------------------------------------

const MoreLinksRoot = styled('ul')({
  display: 'flex',
  flexDirection: 'column' as const,
  '& > li': { display: 'flex' },
});
