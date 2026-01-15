'use client';

import type { MoreLinksProps } from './more-links';
import type { BreadcrumbsLinkProps } from './breadcrumb-link';


import { BackLink } from './back-link';
import { MoreLinks } from './more-links';
import { BreadcrumbsLink } from './breadcrumb-link';
import {
  BreadcrumbsRoot,
  BreadcrumbsHeading,
  BreadcrumbsContent,
  BreadcrumbsContainer,
  BreadcrumbsSeparator,
} from './styles';

// ----------------------------------------------------------------------

export type CustomBreadcrumbsSlotProps = {
  breadcrumbs: any; // BreadcrumbsProps;
  moreLinks: Omit<MoreLinksProps, 'links'>;
  heading: React.ComponentProps<typeof BreadcrumbsHeading>;
  content: React.ComponentProps<typeof BreadcrumbsContent>;
  container: React.ComponentProps<typeof BreadcrumbsContainer>;
};

export type CustomBreadcrumbsSlots = {
  breadcrumbs?: React.ReactNode;
};

export type CustomBreadcrumbsProps = React.ComponentProps<'div'> & {
  sx?: any; // SxProps<Theme>;
  heading?: string;
  activeLast?: boolean;
  backHref?: string;
  action?: React.ReactNode;
  links?: BreadcrumbsLinkProps[];
  moreLinks?: MoreLinksProps['links'];
  slots?: CustomBreadcrumbsSlots;
  slotProps?: Partial<CustomBreadcrumbsSlotProps>;
};

export function CustomBreadcrumbs({
  sx,
  action,
  backHref,
  heading,
  slots = {},
  links = [],
  moreLinks = [],
  slotProps = {},
  activeLast = false,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1]?.name;

  const renderHeading = () => (
    <BreadcrumbsHeading {...slotProps?.heading}>
      {backHref ? <BackLink href={backHref} label={heading} /> : heading}
    </BreadcrumbsHeading>
  );

  const renderLinks = () =>
    slots?.breadcrumbs ?? (
      <nav aria-label="breadcrumb">
        <ol
          style={{
            display: 'flex',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            alignItems: 'center',
          }}
        >
          {links.map((link, index) => {
            const isLast = index === links.length - 1;
            return (
              <li key={link.name ?? index} style={{ display: 'flex', alignItems: 'center' }}>
                <BreadcrumbsLink
                  icon={link.icon}
                  href={link.href}
                  name={link.name}
                  disabled={link.name === lastLink && !activeLast}
                />
                {!isLast && (
                  <span style={{ margin: '0 8px' }}>
                    <BreadcrumbsSeparator />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );

  const renderMoreLinks = () => <MoreLinks links={moreLinks} {...slotProps?.moreLinks} />;

  const sxStyles = Array.isArray(sx) ? Object.assign({}, ...sx) : sx;

  return (
    <BreadcrumbsRoot style={sxStyles as React.CSSProperties} {...other}>
      <BreadcrumbsContainer {...slotProps?.container}>
        <BreadcrumbsContent {...slotProps?.content}>
          {(heading || backHref) && renderHeading()}
          {(!!links.length || slots?.breadcrumbs) && renderLinks()}
        </BreadcrumbsContent>
        {action}
      </BreadcrumbsContainer>

      {!!moreLinks?.length && renderMoreLinks()}
    </BreadcrumbsRoot>
  );
}
