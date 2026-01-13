'use client';

import type { PaperProps } from '@mui/material/Paper';
import type { DialogProps } from '@mui/material/Dialog';
import type { UseDateRangePickerReturn } from './use-date-range-picker';

import { useCallback } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar, dateCalendarClasses } from '@mui/x-date-pickers/DateCalendar';

import { ButtonWrapper as Button, DialogWrapper as Dialog, DialogTitleWrapper as DialogTitle, DialogActionsWrapper as DialogActions, DialogContentWrapper as DialogContent } from 'src/components/circuit-ui';

// ----------------------------------------------------------------------

export type CustomDateRangePickerProps = DialogProps &
  UseDateRangePickerReturn & {
    onSubmit?: () => void;
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
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const isCalendarView = mdUp && variant === 'calendar';

  const handleSubmit = useCallback(() => {
    onClose();
    onSubmit?.();
  }, [onClose, onSubmit]);

  const dialogPaperSx = (slotProps?.paper as PaperProps)?.sx;

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
          (theme) => ({
            gap: 3,
            display: 'flex',
            overflow: 'unset',
            flexDirection: isCalendarView ? 'row' : 'column',
            [`& .${dateCalendarClasses.root}`]: {
              borderRadius: 2,
              border: `dashed 1px ${theme.vars.palette.divider}`,
            },
          }),
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
          <FormHelperText error sx={{ px: 2 }}>
            End date must be later than start date
          </FormHelperText>
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
