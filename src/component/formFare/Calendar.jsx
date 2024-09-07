import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css'; 
import 'react-time-picker/dist/TimePicker.css';
import './Calendar.css'; 
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { nextStep,setDateTime  } from './../../store/formSlice'; 

function Calendar() {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('10:00');
    const [errorMessage, setErrorMessage] = useState('');

    const today = new Date();
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setErrorMessage('');
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        setErrorMessage('');
    };

    const handleNext = () => {
        if (!selectedDate || !selectedTime) {
            setErrorMessage('Please select both a pickup date and time.');
            return;
        }
        dispatch(setDateTime({ selectedDate: selectedDate.toISOString(), selectedTime }));

        dispatch(nextStep()); 
    };

    return (
        <div className="calendar-container innerformdiv">
            <div className='heading'>
                <h4>Choose pickup date and time</h4>
                <p>Please provide house detail for moving the goods as per the given date.</p>
            </div>
            <div className='calendarinner'>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    minDate={today} // Disable dates before today
                    inline
                />
                <div className="time-picker">
                    <TimePicker
                        onChange={handleTimeChange}
                        value={selectedTime}
                        disableClock={false} // Set to true if you want to hide the clock
                    />
                </div>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className='step-buttons'>
                <button className='btn btn-primary' type="button" onClick={handleNext}>
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default Calendar;
