import type { BoxWrapperProps } from 'src/components/circuit-ui/box-wrapper';
import type { RatingWrapperProps } from 'src/components/circuit-ui/rating-wrapper';
import type { FormHelperTextWrapperProps } from 'src/components/circuit-ui/form-helper-text-wrapper';

import { Controller, useFormContext } from 'react-hook-form';

import { BoxWrapper as Box, RatingWrapper as Rating } from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFRatingProps = RatingWrapperProps & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxWrapperProps;
    helperText?: FormHelperTextWrapperProps;
  };
};

export function RHFRating({ name, helperText, slotProps, ...other }: RHFRatingProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box
          {...slotProps?.wrapper}
          sx={[
            { display: 'flex', flexDirection: 'column' },
            ...(Array.isArray(slotProps?.wrapper?.sx)
              ? slotProps.wrapper.sx
              : [slotProps?.wrapper?.sx]),
          ]}
        >
          <Rating
            {...field}
            onChange={(event, newValue) => field.onChange(Number(newValue))}
            {...other}
          />

          <HelperText
            {...slotProps?.helperText}
            disableGutters
            errorMessage={error?.message}
            helperText={helperText}
          />
        </Box>
      )}
    />
  );
}
