import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function Calendar() {
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
        setValue(newValue);
    };


    function disableWeekends(date) {
        return date.$W === 0 || date.$W === 6;
    }

    return (
        <div align={'center'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Transport date"
                    inputFormat="YYYY-MM-DD"
                    value={value}
                    onChange={handleChange}
                    disablePast={true}
                    shouldDisableDate={disableWeekends}
                    renderInput={(params) => <TextField {...params} />}
                />
        </LocalizationProvider>
        </div>
    );
}