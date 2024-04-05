import React, { useRef ,useState,useEffect} from "react";
import axios from "axios";
import "./dailyattendance_table.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { useNavigate ,useLocation, NavLink} from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    
      backgroundColor:'#003152',
      color: theme.palette.common.white,
      fontSize: 16,
    
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    
      
      
    },
  }));
  let ImageLink = '';
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
function DailyAttendance_table() {
 
  let Profileid=sessionStorage.getItem("proid",Profileid)
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
  const [ticket, setticket] = useState([]);
  const updateEntry_attend=()=>{
    const location = useLocation();
    const entrytabledata = location.state;
  
    setticket(entrytabledata)
  }

 
  const getUserdata = async () => {
    try {
      const Todaydate = getCurrentDate();
      const response = await axios.get(`http://localhost:5000/viewDailyentry/${Profileid}/${Todaydate}`);
      const data = response.data.data;
      
      setticket(data);
    } catch (error) {

 
    }
  };
  useEffect(() => {
        getUserdata();
      
      }, [])
      
return (
    <div className="Daily_showtable">

<TableContainer component={Paper} className="sampleliststl">
<Table sx={{ minWidth: 670 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              
              <StyledTableCell>TimeIn</StyledTableCell>
              <StyledTableCell>TimeOut</StyledTableCell>
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
        </TableContainer>
    </div>
  )
}

export default DailyAttendance_table





  
      
    
    

  