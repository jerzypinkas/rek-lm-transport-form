import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { getDay } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

const TransportDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showIcon
            inline
            dateFormat="yyyy-MM-dd"
            filterDate={isWeekday}
            minDate={new Date()}
            locale="pl"
        />
    );
};

export default TransportDatePicker;