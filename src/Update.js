import React, { useEffect, useState } from 'react';
import "./AttendanceEntry.css";
import axios from 'axios';
const AttendanceEntry = () => {
  const [attendanceEntries, setAttendanceEntries] = useState([]);

  const handleTimeInOut = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    setAttendanceEntries(prevEntries => {
      const lastEntry = prevEntries[prevEntries.length - 1];
      if (lastEntry && !lastEntry.timeOut) {
        lastEntry.timeOut = currentTime;
      } else {
        return [
          ...prevEntries,
          {
            date: currentDate,
            timeIn: currentTime,
            timeOut: null,
          },
        ];
      }
      return [...prevEntries];
    });


    
  };
  useEffect(() => {
    if (attendanceEntries.length > 0) {
      const data = { attendanceEntries };
      axios.post('http://localhost:5000/Attend_dailyEntry', data)
        .then(response => {
         
        })
        .catch(error => {
          
        });
    }
  }, [attendanceEntries]);
  return (
    <div>
      
      <button className="button-74" onClick={handleTimeInOut}>
        {attendanceEntries.length > 0 && !attendanceEntries[attendanceEntries.length - 1].timeOut
          ? 'Attendance Out':'Attendance In'}
      </button>
      {attendanceEntries.map((entry, index) => (
        <div key={index}>
          <p>Date: {entry.date}</p>
          <p>Time In: {entry.timeIn}</p>
          <p>Time Out: {entry.timeOut || 'Not recorded yet'}</p>
        </div>
      ))}
    </div>
  );
};

export default AttendanceEntry;
