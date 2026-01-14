import React from 'react';
import type { ElementRect } from './hooks';
import type { ArrowProps, PaperOffset, ArrowPlacement } from './types';

import { varAlpha, noRtlFlip } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { getArrowOffset } from './utils';

// ----------------------------------------------------------------------

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = Side | 'center';

const ARROW_TRANSLATE = '48%';
const ARROW_COLOR_THRESHOLDS = {
  topCyan: 0.6,
  bottomRed: 0.4,
  sideCyan: 0.6,
  sideRed: 0.4,
} as const;

// ----------------------------------------------------------------------

export function getPaperOffsetStyles(
  placement: ArrowPlacement,
  paperOffsets: PaperOffset,
  isRtl: boolean
): React.CSSProperties {
  if (!placement) return {};

  const [primaryOffset, secondaryOffset] = paperOffsets;
  const rtlDirection = isRtl ? -1 : 1;

  const offsetBySide: Record<Side, Record<string, PaperOffset>> = {
    top: {
      left: [-primaryOffset * rtlDirection, secondaryOffset],
      center: [0, secondaryOffset],
      right: [primaryOffset * rtlDirection, secondaryOffset],
    },
    bottom: {
      left: [-primaryOffset * rtlDirection, -secondaryOffset],
      center: [0, -secondaryOffset],
      right: [primaryOffset * rtlDirection, -secondaryOffset],
    },
    left: {
      top: [secondaryOffset * rtlDirection, -primaryOffset],
      center: [secondaryOffset * rtlDirection, 0],
      bottom: [secondaryOffset * rtlDirection, primaryOffset],
    },
    right: {
      top: [-secondaryOffset * rtlDirection, -primaryOffset],
      center: [-secondaryOffset * rtlDirection, 0],
      bottom: [-secondaryOffset * rtlDirection, primaryOffset],
    },
  };

  const [side, align = 'center'] = placement.split('-') as [Side, Align];
  const [translateX, translateY] = offsetBySide[side]?.[align] || [0, 0];

  return { transform: `translate(${translateX}px, ${translateY}px)` };
}

// ----------------------------------------------------------------------

function getArrowPlacementStyles(side: Side, isRtl = false): React.CSSProperties {
  const styleBySide: Record<Side, React.CSSProperties> = {
    top: { top: 0, transform: `rotate(135deg) translate(0, -${ARROW_TRANSLATE})` },
    bottom: { bottom: 0, transform: `rotate(-45deg) translate(0, ${ARROW_TRANSLATE})` },
    left: isRtl
      ? { left: 0, transform: `rotate(-135deg) translate(${ARROW_TRANSLATE}, 0)` }
      : { left: 0, transform: `rotate(45deg) translate(-${ARROW_TRANSLATE}, 0)` },
    right: isRtl
      ? { right: 0, transform: `rotate(45deg) translate(-${ARROW_TRANSLATE}, 0)` }
      : { right: 0, transform: `rotate(-135deg) translate(${ARROW_TRANSLATE}, 0)` },
  };

  return styleBySide[side] ?? {};
}

type ArrowColorParams = {
  xRatio: number;
  yRatio: number;
  paperRatio: number;
  isRtl: boolean;
  placement: ArrowPlacement;
};

function getArrowColor({
  isRtl,
  placement,
  xRatio,
  yRatio,
  paperRatio,
}: ArrowColorParams): 'cyan' | 'red' | null {
  if (!placement) return null;

  const isTop = placement.startsWith('top-');
  const isBottom = placement.startsWith('bottom-');
  const isLeft = placement.startsWith('left-');
  const isRight = placement.startsWith('right-');

  if (isTop && xRatio > ARROW_COLOR_THRESHOLDS.topCyan) return 'cyan';
  if (isBottom && xRatio < ARROW_COLOR_THRESHOLDS.bottomRed) return 'red';

  if (isLeft || isRight) {
    const useCyan = yRatio > ARROW_COLOR_THRESHOLDS.sideCyan || paperRatio >= 1.8;
    const useRed = yRatio < ARROW_COLOR_THRESHOLDS.sideRed || paperRatio >= 1.8;

    if (isRtl) {
      if (isRight && useCyan) return 'red';
      if (isLeft && useRed) return 'cyan';
    } else {
      if (isRight && useRed) return 'cyan';
      if (isLeft && useCyan) return 'red';
    }
  }

  return null;
}

// ----------------------------------------------------------------------

type StyledArrowProps = ArrowProps & {
  paperRect: ElementRect;
  anchorRect: ElementRect;
  sx?: any;
  style?: React.CSSProperties;
};

export const Arrow = React.forwardRef<HTMLSpanElement, StyledArrowProps>(
  ({ size = 0, placement = 'top-right', anchorRect, paperRect, sx, style, ...other }, ref) => {
    const isRtl = tokens.direction === 'rtl';
    const { offsetX, offsetY } = getArrowOffset(anchorRect, paperRect, size);

    const arrowColor = getArrowColor({
      isRtl,
      placement,
      xRatio: offsetX / paperRect.width,
      yRatio: offsetY / paperRect.height,
      paperRatio: Math.round((paperRect.width / paperRect.height) * 100) / 100,
    });

    const mergedSx = Array.isArray(sx) ? sx : [sx];
    const sxStyles = mergedSx.reduce((acc, style) => {
      if (style && typeof style === 'object') {
        return { ...acc, ...style };
      }
      return acc;
    }, {});

    const arrowBaseStyle: React.CSSProperties = {
      width: size,
      height: size,
      position: 'absolute',
      borderBottomLeftRadius: isRtl ? 0 : size / 4,
      borderBottomRightRadius: isRtl ? size / 4 : 0,
      clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
      backgroundColor: tokens.colors.background.paper,
      border: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.12)}`,
    };

    const arrowBackgroundStyle: React.CSSProperties = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${size * 3}px ${size * 3}px`,
      ...(arrowColor === 'cyan' && {
        backgroundPosition: noRtlFlip('top right'),
        backgroundImage: `linear-gradient(45deg, ${varAlpha(tokens.colors.info.mainChannel, 0.08)}, ${varAlpha(tokens.colors.info.mainChannel, 0.08)})`,
      }),
      ...(arrowColor === 'red' && {
        backgroundPosition: noRtlFlip('bottom left'),
        backgroundImage: `linear-gradient(45deg, ${varAlpha(tokens.colors.error.mainChannel, 0.08)}, ${varAlpha(tokens.colors.error.mainChannel, 0.08)})`,
      }),
    };

    let placementStyles: React.CSSProperties = {};
    if (placement?.startsWith('top-')) {
      placementStyles = { ...getArrowPlacementStyles('top'), left: noRtlFlip(`${offsetX}px`) };
    } else if (placement?.startsWith('bottom-')) {
      placementStyles = { ...getArrowPlacementStyles('bottom'), left: noRtlFlip(`${offsetX}px`) };
    } else if (placement?.startsWith('left-')) {
      placementStyles = { ...getArrowPlacementStyles('left', isRtl), top: `${offsetY}px` };
    } else if (placement?.startsWith('right-')) {
      placementStyles = { ...getArrowPlacementStyles('right', isRtl), top: `${offsetY}px` };
    }

    const arrowStyles: React.CSSProperties = {
      ...arrowBaseStyle,
      ...arrowBackgroundStyle,
      ...placementStyles,
      ...sxStyles,
      ...(style || {}),
    };

    return <span ref={ref} style={arrowStyles} {...other} />;
  }
);

Arrow.displayName = 'Arrow';
