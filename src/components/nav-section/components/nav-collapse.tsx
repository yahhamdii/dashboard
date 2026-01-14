import React from 'react';

import { CollapseWrapper } from 'src/components/circuit-ui';

import { navSectionClasses } from '../styles';

// ----------------------------------------------------------------------

export type NavCollapseProps = React.ComponentProps<typeof CollapseWrapper> & {
  depth?: number;
};

export const NavCollapse = React.forwardRef<HTMLDivElement, NavCollapseProps>(
  ({ depth, className, style, ...other }, ref) => {
    const verticalLineStyles: React.CSSProperties = {
      top: 0,
      left: 0,
      width: '2px',
      position: 'absolute',
      backgroundColor: 'var(--nav-bullet-light-color)',
      bottom: 'calc(var(--nav-item-sub-height) - 2px - var(--nav-bullet-size) / 2)',
    };

    const collapseStyles: React.CSSProperties = {
      ...(depth && depth + 1 !== 1
        ? {
            paddingLeft: 'calc(var(--nav-item-pl) + var(--nav-icon-size) / 2)',
          }
        : {}),
      ...(style || {}),
    };

    return (
      <CollapseWrapper
        ref={ref}
        className={className}
        style={collapseStyles}
        {...other}
      >
        {depth && depth + 1 !== 1 && (
          <style>
            {`
              .${navSectionClasses.ul} {
                position: relative;
                padding-left: var(--nav-bullet-size);
              }
              .${navSectionClasses.ul}::before {
                content: "";
                ${Object.entries(verticalLineStyles)
                  .map(([key, value]) => {
                    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    return `${cssKey}: ${value};`;
                  })
                  .join(' ')}
              }
            `}
          </style>
        )}
      </CollapseWrapper>
    );
  }
);

NavCollapse.displayName = 'NavCollapse';
