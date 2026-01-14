'use client';

import React from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

import { useScrollOffsetTop } from 'minimal-shared/hooks';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { ContainerWrapper } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { layoutClasses } from './classes';

// ----------------------------------------------------------------------

export type HeaderSectionProps = React.ComponentProps<'header'> & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: React.ComponentProps<typeof ContainerWrapper>;
    centerArea?: React.ComponentProps<'div'> & { sx?: any };
  };
  sx?: any;
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}: HeaderSectionProps) {
  const { offsetTop: isOffset } = useScrollOffsetTop();

  return (
    <HeaderRoot
      position="sticky"
      isOffset={isOffset}
      disableOffset={disableOffset}
      disableElevation={disableElevation}
      className={mergeClasses([layoutClasses.header, className])}
      sx={[
        {
          bgcolor: 'transparent',
          color: 'inherit',
          boxShadow: 'none',
          ...(isOffset && {
            '--color': `var(--offset-color, ${tokens.colors.text.primary})`,
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer layoutQuery={layoutQuery} {...slotProps?.container}>
        {slots?.leftArea}

        <HeaderCenterArea {...slotProps?.centerArea}>{slots?.centerArea}</HeaderCenterArea>

        {slots?.rightArea}
      </HeaderContainer>

      {slots?.bottomArea}
    </HeaderRoot>
  );
}

// ----------------------------------------------------------------------

type HeaderRootProps = Pick<HeaderSectionProps, 'disableOffset' | 'disableElevation' | 'sx' | 'className' | 'position'> & {
  isOffset: boolean;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<'header'>, 'className'>;

const HeaderRoot: React.FC<HeaderRootProps> = ({ 
  isOffset, 
  disableOffset, 
  disableElevation, 
  sx,
  className,
  position = 'sticky',
  children,
  ...other 
}) => {
  const pauseZindex = { top: -1, bottom: -2 };

  const pauseStyles: React.CSSProperties = {
    opacity: 0,
    content: '""',
    visibility: 'hidden',
    position: 'absolute',
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), visibility 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const bgStyles: React.CSSProperties = {
    ...pauseStyles,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: pauseZindex.top,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: varAlpha(tokens.colors.background.defaultChannel, 0.8),
    ...(isOffset && { opacity: 1, visibility: 'visible' }),
  };

  const shadowStyles: React.CSSProperties = {
    ...pauseStyles,
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    margin: 'auto',
    borderRadius: '50%',
    width: `calc(100% - 48px)`,
    zIndex: pauseZindex.bottom,
    boxShadow: tokens.customShadows.z8,
    ...(isOffset && { opacity: 0.48, visibility: 'visible' }),
  };

  const baseStyles: React.CSSProperties = {
    position: position as any,
    zIndex: 'var(--layout-header-zIndex)' as any,
    backgroundColor: 'transparent',
    color: 'inherit',
    boxShadow: 'none',
    ...(isOffset && {
      '--color': `var(--offset-color, ${tokens.colors.text.primary})`,
    } as any),
  };

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const finalStyles: React.CSSProperties = {
    ...baseStyles,
    ...sxStyles,
  };

  return (
    <header
      className={className}
      style={finalStyles}
      {...other}
    >
      {!disableOffset && (
        <div
          style={{
            ...bgStyles,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}
      {!disableElevation && (
        <div
          style={{
            ...shadowStyles,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </header>
  );
};

type HeaderContainerProps = Pick<HeaderSectionProps, 'layoutQuery'> & React.ComponentProps<typeof ContainerWrapper>;

const HeaderContainer: React.FC<HeaderContainerProps> = ({ layoutQuery = 'md', sx, className, style, ...other }) => {
  const breakpointValue = tokens.breakpoints.values[layoutQuery] || 900;
  const containerId = React.useId();

  React.useEffect(() => {
    const styleId = `header-container-${containerId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      [data-header-container="${containerId}"] {
        display: flex;
        align-items: center;
        color: var(--color);
        height: var(--layout-header-mobile-height);
      }
      @media (min-width: ${breakpointValue}px) {
        [data-header-container="${containerId}"] {
          height: var(--layout-header-desktop-height);
        }
      }
    `;

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [breakpointValue, containerId]);

  const containerStyles: React.CSSProperties = {
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    ...(style || {}),
  };

  return (
    <ContainerWrapper
      data-header-container={containerId}
      className={className}
      style={containerStyles}
      {...other}
    />
  );
};

const HeaderCenterArea: React.FC<React.ComponentProps<'div'>> = ({ sx, ...other }) => {
  const styles: React.CSSProperties = {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  return <div style={styles} {...other} />;
};
