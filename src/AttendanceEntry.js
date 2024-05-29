import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate, } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableContainer, Table, TableHead, TableRow, TableBody, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    
      backgroundColor:'#003152',
      color: theme.palette.common.white,
      fontSize: 16,
      overflowX: 'visible',
    
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    
      
      
    },
  }));
  let ImageLink = '';
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      lineHeight: 0.43,
      overflow: 'hidden',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const MaxHeightTableContainer = styled(TableContainer)(({ maxHeight }) => ({
    maxHeight: `${maxHeight}px`,
    overflowY: 'auto',
  }));
  
const TimeButton = () => {
  const [isAttendanceIn, setIsAttendanceIn] = useState(true);
  const [attendanceTime, setAttendanceTime] = useState(null);
  const [ticket, setticket] = useState([]);
  let Profileid=sessionStorage.getItem("proid",Profileid)
  const history = useNavigate();
  const getTimeIn24HourFormat = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  function formatTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  function convertToIndianTimeFormat(array) {
    const convertedArray = array.map(item => {
      const convertedTimeIn = item.timeIn ? formatTime(item.timeIn) : '';
      const convertedTimeOut = item.timeOut ? formatTime(item.timeOut) : '';
      const convertedTotalTime = item.TotalTime || '';
      return {
        ...item,
        timeIn: convertedTimeIn,
        timeOut: convertedTimeOut,
        TotalTime: convertedTotalTime
      };
    });
    return convertedArray;
  }
  
  const handleTimeInOut = async () => {
    try {
      const currentTime = getTimeIn24HourFormat();
      const currentDate = getCurrentDate();
      const Todaydate = getCurrentDate();
      setAttendanceTime(`${currentDate} ${currentTime}`);
      setIsAttendanceIn((prevState) => !prevState);
      const type = isAttendanceIn ? "In" : "Out";
      const data = {
        Profileid,
        time: currentTime,
        date: currentDate,
        type: type,
      };
      const postResponse = await axios.post("http://localhost:5000/Attend_dailyEntry", data);
  
      const getResponse = await axios.get(`http://localhost:5000/viewDailyentry/${Profileid}/${Todaydate}`);
      const entrytabledata = getResponse.data.data;
  
      const convertedArray = convertToIndianTimeFormat(entrytabledata);
      
      setticket(entrytabledata)
    } catch (error) {
     
    }
  };
  
  const getUserdata = async (id,myArray) => {
    const Todaydate = getCurrentDate();
    const data = await axios.get(`http://localhost:5000/CurrentStatus_show/${Profileid}/${Todaydate}`).then(res => {
    const StatusShowdata=(res.data.data);

    if(StatusShowdata =='1'){
      setIsAttendanceIn(false)
    }
    else{
      setIsAttendanceIn(true)
    }

   })
  }
  const getEntryTabledata = async () => {
    try {
      const Todaydate = getCurrentDate();
      const response = await axios.get(`http://localhost:5000/viewDailyentry/${Profileid}/${Todaydate}`);
      const data = response.data.data;
 
      const convertedArray = convertToIndianTimeFormat(data);
   
      setticket(convertedArray);
    } catch (error) {
   
  }
  };
  useEffect(() => {
    getUserdata();
    getEntryTabledata();
  
  }, [])
  return (
    <div>
    <button className="button-74" onClick={handleTimeInOut} 
    style={{
      backgroundColor: isAttendanceIn ? 'Green' : '#f04d29',
      color: isAttendanceIn ? 'White' : 'Black',
    }}>
      {isAttendanceIn ? (
        <>
          <FontAwesomeIcon icon={faUserCheck} /> Attendance In
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faUserSlash} /> Attendance Out
        </>
      )}
      
    </button>
    <div className="Daily_showtable">

    {/* <Typography variant="h6" className="Entry_heading">
        Daily Attendance
      </Typography> */}
<TableContainer component={Paper} className="sampleliststl">
  <div className="fixTableHead">
<Table sx={{ minWidth: 670 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Time In</StyledTableCell>
              <StyledTableCell>Time Out</StyledTableCell>
              <StyledTableCell>Total Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {ticket.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{item.timeIn}</StyledTableCell>
                  <StyledTableCell>{item.timeOut}</StyledTableCell>
                  <StyledTableCell>{item.TotalTime}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          
          </TableBody>
         
        </Table>
        </div>
        </TableContainer>
   
    </div>
    </div>
  );
};

export default TimeButton;