import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePickerWrapper as DatePicker } from 'src/components/circuit-ui';
import { BoxWrapper as Box, TypographyWrapper as Typography } from 'src/components/circuit-ui';

// ----------------------------------------------------------------------

type DateInput = Dayjs | Date | string | number | null | undefined;

function normalizeDateValue(value: DateInput): Dayjs | null {
  if (dayjs.isDayjs(value)) return value;

  const parsed = value ? dayjs(value) : null;
  return parsed?.isValid() ? parsed : null;
}

// ----------------------------------------------------------------------

type PickerProps = {
  name: string;
  label?: string;
  slotProps?: any;
  [key: string]: any;
};

export function RHFDatePicker({ name, slotProps, ...other }: PickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue: any) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// Note: TimePicker et DateTimePicker seront implémentés plus tard si nécessaire
// Pour l'instant on réutilise DatePicker pour ne pas casser le build
export const RHFTimePicker = RHFDatePicker;
export const RHFDateTimePicker = RHFDatePicker;
