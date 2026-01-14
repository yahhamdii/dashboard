/**
 * Calendar Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';

// Note: On importera Calendar de Circuit UI ici une fois vérifié
// import { Calendar } from '@sumup-oss/circuit-ui';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type CalendarWrapperProps = any; // On utilise any pour la transition

export function CalendarWrapper({
    value,
    onChange,
    className,
    sx,
    ...other
}: CalendarWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <DateCalendar
                value={value}
                onChange={onChange}
                sx={sx}
                {...other}
            />
        );
    }

    // TODO: Implémenter avec Circuit UI Calendar
    // Pour l'instant on garde MUI mais on prépare le terrain
    return (
        <DateCalendar
            value={value}
            onChange={onChange}
            sx={[
                {
                    '& .MuiPickersCalendarHeader-root': {
                        color: 'var(--cui-fg-normal)',
                    },
                    '& .MuiPickersDay-root': {
                        color: 'var(--cui-fg-normal)',
                        '&.Mui-selected': {
                            backgroundColor: 'var(--cui-bg-accent)',
                            color: 'var(--cui-fg-on-accent)',
                        },
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        />
    );
}
