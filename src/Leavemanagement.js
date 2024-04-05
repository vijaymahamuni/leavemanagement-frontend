import React, { useRef ,useState,useEffect} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate ,useLocation} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import _ from "lodash";
import Stack from '@mui/material/Stack';
import Button from 'react-bootstrap/Button';
import ExcelExportButton from "./ExcelExportButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./LeaveRequestlisting.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./Leavemanagement.css";
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
  var limit = 2;


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const Ownrecord=()=>{
  console.log("hey vijay")
}
  return (
    <div className='Tabpanel'>
<Tabs value={value} onChange={handleChange} centered>
  <Tab label="Own" onClick={Ownrecord}/>
  <Tab label="Requested" />
  <Tab label="Pending" />
</Tabs>
    </div>
  );
}