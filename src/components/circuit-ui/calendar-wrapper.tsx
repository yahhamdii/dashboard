/**
 * Calendar Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import type { DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';

// Note: On importera Calendar de Circuit UI ici une fois vérifié
// import { Calendar } from '@sumup-oss/circuit-ui';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface CalendarWrapperProps {
    value?: any;
    onChange?: (value: any) => void;
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function CalendarWrapper({
    value,
    onChange,
    className,
    sx,
    ...other
}: CalendarWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    // Simple placeholder for now since DateCalendar is removed
    return (
        <div
            className={className}
            style={{
                padding: '20px',
                border: '1px solid var(--cui-border-subtle)',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'var(--cui-fg-subtle)'
            }}
        >
            Calendar not available (Migration in progress)
        </div>
    );
}
