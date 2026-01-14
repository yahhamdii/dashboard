import type { BoxWrapperProps } from 'src/components/circuit-ui/box-wrapper';
import type { SliderWrapperProps } from 'src/components/circuit-ui/slider-wrapper';
import type { FormHelperTextWrapperProps } from 'src/components/circuit-ui/form-helper-text-wrapper';

import { Controller, useFormContext } from 'react-hook-form';

import { BoxWrapper as Box, SliderWrapper as Slider } from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFSliderProps = SliderWrapperProps & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxWrapperProps;
    helperText?: FormHelperTextWrapperProps;
  };
};

export function RHFSlider({ name, helperText, slotProps, ...other }: RHFSliderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box {...slotProps?.wrapper}>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

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
