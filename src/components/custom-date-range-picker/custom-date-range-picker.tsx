'use client';


type PaperProps = React.ComponentProps<'div'>;
type DialogProps = React.ComponentProps<'div'>;
import type { UseDateRangePickerReturn } from './use-date-range-picker';

import { useCallback } from 'react';

import {
  DatePickerWrapper as DatePicker,
  CalendarWrapper as DateCalendar,
} from 'src/components/circuit-ui';
import {
  ButtonWrapper as Button,
  DialogWrapper as Dialog,
  DialogTitleWrapper as DialogTitle,
  DialogActionsWrapper as DialogActions,
  DialogContentWrapper as DialogContent,
  BoxWrapper as Box,
} from 'src/components/circuit-ui';

import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

export type CustomDateRangePickerProps = DialogProps &
  UseDateRangePickerReturn & {
    onSubmit?: () => void;
    slotProps?: any;
    variant?: 'input' | 'calendar';
    title?: string;
  };

export function CustomDateRangePicker({
  open,
  error,
  onClose,
  onSubmit,
  /********/
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  /********/
  slotProps,
  variant = 'input',
  title = 'Select date range',
  ...other
}: CustomDateRangePickerProps) {
  const mdUp = typeof window !== 'undefined' && window.innerWidth >= tokens.breakpoints.values.md;

  const isCalendarView = mdUp && variant === 'calendar';

  const handleSubmit = useCallback(() => {
    onClose();
    onSubmit?.();
  }, [onClose, onSubmit]);

  const dialogPaperSx = (slotProps?.paper as any)?.sx;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth={isCalendarView ? false : 'xs'}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          sx: [
            { ...(isCalendarView && { maxWidth: 720 }) },
            ...(Array.isArray(dialogPaperSx) ? dialogPaperSx : [dialogPaperSx]),
          ],
        },
      }}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={[
          {
            gap: 3,
            display: 'flex',
            overflow: 'unset',
            flexDirection: isCalendarView ? 'row' : 'column',
          },
        ]}
      >
        {isCalendarView ? (
          <>
            <DateCalendar value={startDate} onChange={onChangeStartDate} />
            <DateCalendar value={endDate} onChange={onChangeEndDate} />
          </>
        ) : (
          <>
            <DatePicker label="Start date" value={startDate} onChange={onChangeStartDate} />
            <DatePicker label="End date" value={endDate} onChange={onChangeEndDate} />
          </>
        )}

        {error && (
          <Box sx={{ px: 2, color: 'error.main', typography: 'caption' }}>
            End date must be later than start date
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={error} variant="contained" onClick={handleSubmit}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
