import { forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export interface SvgIconWrapperProps extends React.SVGProps<SVGSVGElement> {
  sx?: any;
  color?: string;
  fontSize?: 'inherit' | 'small' | 'medium' | 'large';
  inheritViewBox?: boolean;
  viewBox?: string;
  titleAccess?: string;
}

export const SvgIconWrapper = forwardRef<SVGSVGElement, SvgIconWrapperProps>(
  (
    {
      children,
      className,
      sx,
      color,
      fontSize = 'medium',
      inheritViewBox,
      viewBox = '0 0 24 24',
      titleAccess,
      ...other
    },
    ref
  ) => {
    const sxStyle = Array.isArray(sx) ? Object.assign({}, ...sx) : sx;

    return (
      <svg
        ref={ref}
        className={className}
        viewBox={inheritViewBox ? undefined : viewBox}
        aria-hidden={titleAccess ? undefined : true}
        role={titleAccess ? 'img' : undefined}
        style={{
          userSelect: 'none',
          width: '1em',
          height: '1em',
          display: 'inline-block',
          fill: 'currentColor',
          flexShrink: 0,
          transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          fontSize:
            fontSize === 'inherit'
              ? 'inherit'
              : fontSize === 'small'
                ? '1.25rem'
                : fontSize === 'large'
                  ? '2.1875rem'
                  : '1.5rem',
          color: color,
          ...sxStyle,
        }}
        {...other}
      >
        {titleAccess ? <title>{titleAccess}</title> : null}
        {children}
      </svg>
    );
  }
);
