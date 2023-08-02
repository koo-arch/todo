import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from 'date-fns/locale';

const DateTimeField = (field) => {
    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns}
            adapterLocale={ja}
            dateFormats={{ monthAndYear: "yyyy年 MM月" }}
        >
            <DateTimePicker
                label="期限"
                slotProps={{ 
                    textField: { 
                        required: true,
                        fullWidth: true,
                        margin: "normal"
                    } 
                }}
                {...field}
            />
        </LocalizationProvider>
    )
}

export default DateTimeField;