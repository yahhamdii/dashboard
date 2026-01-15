'use client';

import type { PaperOffset, ArrowPlacement, CustomPopoverProps } from './types';

import { useRef } from 'react';
import { mergeRefs } from 'minimal-shared/utils';

import { PopoverWrapper as Popover } from 'src/components/circuit-ui';

import { tokens } from 'src/theme/design-tokens';
import { useElementRect } from './hooks';
import { getPopoverOrigin } from './utils';
import { Arrow, getPaperOffsetStyles } from './styles';

// ----------------------------------------------------------------------

const DEFAULT_ARROW_SIZE: number = 14;
const DEFAULT_ARROW_PLACEMENT: ArrowPlacement = 'top-right';
const DEFAULT_PAPER_OFFSET: PaperOffset = [8, 2];

export function CustomPopover({
  open,
  onClose,
  children,
  anchorEl,
  slotProps,
  ...other
}: CustomPopoverProps) {
  const isRtl = tokens.direction === 'rtl';

  const { arrow: arrowProps, paper: paperProps, ...otherSlotProps } = slotProps ?? {};

  const arrowSize = arrowProps?.size ?? DEFAULT_ARROW_SIZE;
  const arrowPlacement = arrowProps?.placement ?? DEFAULT_ARROW_PLACEMENT;
  const paperOffset = paperProps?.offset ?? DEFAULT_PAPER_OFFSET;

  const { anchorOrigin, transformOrigin } = getPopoverOrigin(arrowPlacement, isRtl);

  const paperRef = useRef<HTMLDivElement>(null);
  const paperRect = useElementRect(paperRef.current, 'popoverPaper', !!open);
  const anchorRect = useElementRect(anchorEl as HTMLElement, 'anchor', !!open);

  const isArrowVisible = !arrowProps?.hide && !!paperRect && !!anchorRect;

  const paperStyles: any = {
    ...getPaperOffsetStyles(arrowPlacement, paperOffset, isRtl),
    overflow: 'inherit',
    // [`& .${listClasses.root}`]: { minWidth: 140 },
    // [`& .${menuItemClasses.root}`]: { gap: 2 },
  };

  return (
    <Popover
      aria-hidden={!open}
      open={!!open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        ...otherSlotProps,
        paper: {
          ...paperProps,
          ref: mergeRefs([paperRef, paperProps?.ref]),
          sx: [paperStyles, ...(Array.isArray(paperProps?.sx) ? paperProps.sx : [paperProps?.sx])],
        },
      }}
      {...other}
    >
      {isArrowVisible && (
        <Arrow
          size={arrowSize}
          placement={arrowPlacement}
          paperRect={paperRect}
          anchorRect={anchorRect}
          sx={arrowProps?.sx}
        />
      )}

      {children}
    </Popover>
  );
}
