import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendarcomponent() {
  const [date, setDate] = useState (new Date());

  return (
    <div className='text-center'>
      <h1>Calendário</h1>
      <Calendar
        onChange={setDate}
        value={date}
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        tileDisabled={({ date, view }) => view === 'month' && date.getDay() === 0}
      />
    </div>
  );
}

export default Calendarcomponent;
