import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row } from 'reactstrap';

interface DatepickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  label: string;
}

const CustomDatePicker: React.FC<DatepickerProps> = ({
  label,
  selectedDate,
  onChange,
  dateFormat = 'dd/MM/yyyy',
  minDate,
  maxDate,
  placeholderText = 'Select a date',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  //   const handleTodayClick = () => {
  //     onChange(new Date());
  //     setIsOpen(false);
  //   };

  return (
    <label>
      {label}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
        onFocus={toggleDatepicker}
        onBlur={toggleDatepicker}
        open={isOpen}
      />
      {/* <button onClick={handleTodayClick}>Today</button> */}
    </label>
  );
};

export default CustomDatePicker;
