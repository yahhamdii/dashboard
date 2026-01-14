import React from 'react';

import { imageClasses } from './classes';

// ----------------------------------------------------------------------

const placeholderImage =
  'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPHJhZGlhbEdyYWRpZW50IGlkPSJhIiBjeD0iNTAlIiBjeT0iNDYuODAxMTAyJSIgcj0iOTUuNDk3MTEyJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIgLz4KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzkxOWVhYiIgc3RvcC1vcGFjaXR5PSIuNDgiIC8+CiAgPC9yYWRpYWxHcmFkaWVudD4KICA8cGF0aCBkPSJtODggODZoNTEydjUxMmgtNTEyeiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODggLTg2KSIgLz4KPC9zdmc+Cg==';

const sharedStyles: React.CSSProperties = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'inherit',
  aspectRatio: 'inherit',
  borderRadius: 'inherit',
};

export type EffectsType = {
  duration?: number;
  disabled?: boolean;
  style?: 'blur' | 'black-and-white' | 'opacity';
};

const getEffectStyles = (effect?: EffectsType): React.CSSProperties => {
  const { style, duration } = effect ?? {};

  const transition =
    style === 'opacity'
      ? `opacity ${duration}ms`
      : `opacity ${Number(duration) / 2}ms, filter ${duration}ms`;

  // Note: These styles need to be applied via className or inline styles on the img element
  // We'll handle this in the Image component
  return {};
};

export type ImageRootProps = React.ComponentProps<'span'> & {
  effect?: EffectsType;
  sx?: any;
};

export const ImageRoot = React.forwardRef<HTMLSpanElement, ImageRootProps>(
  ({ effect, sx, style, className, ...other }, ref) => {
    const mergedSx = Array.isArray(sx) ? sx : [sx];
    const sxStyles = mergedSx.reduce((acc, style) => {
      if (style && typeof style === 'object') {
        return { ...acc, ...style };
      }
      return acc;
    }, {});

    const rootStyles: React.CSSProperties = {
      maxWidth: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'bottom',
      aspectRatio: 'var(--aspect-ratio)',
      ...sxStyles,
      ...(style || {}),
    };

    return <span ref={ref} className={className} style={rootStyles} {...other} />;
  }
);

ImageRoot.displayName = 'ImageRoot';

export const ImageImg = React.forwardRef<HTMLImageElement, React.ComponentProps<'img'>>(
  ({ style, className, ...other }, ref) => {
    const imgStyles: React.CSSProperties = {
      ...sharedStyles,
      objectFit: 'cover',
      ...(style || {}),
    };

    return <img ref={ref} className={className} style={imgStyles} {...other} />;
  }
);

ImageImg.displayName = 'ImageImg';

export const ImageOverlay = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  ({ style, className, ...other }, ref) => {
    const overlayStyles: React.CSSProperties = {
      ...sharedStyles,
      zIndex: 1,
      position: 'absolute',
      ...(style || {}),
    };

    return <span ref={ref} className={className} style={overlayStyles} {...other} />;
  }
);

ImageOverlay.displayName = 'ImageOverlay';

export const ImagePlaceholder = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  ({ style, className, ...other }, ref) => {
    const placeholderStyles: React.CSSProperties = {
      ...sharedStyles,
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${placeholderImage})`,
      ...(style || {}),
    };

    return <span ref={ref} className={className} style={placeholderStyles} {...other} />;
  }
);

ImagePlaceholder.displayName = 'ImagePlaceholder';
