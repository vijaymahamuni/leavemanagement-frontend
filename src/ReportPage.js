import React, { useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./ReportPage.css";
import axios from "axios";
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate ,useLocation} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Button from 'react-bootstrap/Button';
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
	  backgroundColor: theme.palette.action.hover,
	},
	
	'&:last-child td, &:last-child th': {
	  border: 0,
	},
  }));
export default function SimpleTable() {
const [reportData,setreportData]=useState([])  
const[ReportHead,setReportHead]=useState('Yearly Reports for 2023')
const [selected_Year,setselected_Year]=useState(['2023']);  
const location = useLocation();
let  reportdata=location.state;


 const year_drop=[
  {value:'2016'},
  {value:'2017'},
  {value:'2018'},
  {value:'2019'},
  {value:'2020'},
  {value:'2021'},
  {value:'2022'},	
  {value:'2023'},
  {value:'2024'},
  {value:'2025'},
  {value:'2026'},
  {value:'2027'},
  {value:'2028'},

]

	try {
     
		const response = axios({
		  method: "post",
		  url: `http://localhost:5000/report_summary`,
		  data: {'userid':[reportdata],'selectYear':selected_Year},
		  headers: { 'Content-Type': 'application/json'},
	
		}).then(res=> {
	
		  const summary_data=res.data.data;
		  if(reportData ==''){
			setreportData(res.data.data)
			}
		})
	} catch (error) {

	  }

	
  
const Report_monthwise=(column)=>{
	const demoMonth=column;

	try {
      const response = axios({
		  method: "post",
		  url: `http://localhost:5000/monthClick_data`,
		  data: {'userid':[reportdata],'selectYear':selected_Year,'selectMonth':demoMonth},
		  headers: { 'Content-Type': 'application/json'},
	
		}).then(res=> {
	
		  if(reportData !=''){
			setreportData(res.data.data)
			setReportHead('Daily Reports for' +' '+ demoMonth  +' '+ selected_Year +' '+ 'for User' +' '+reportdata)
			}
		 
		})
	} catch (error) {

	  }
	
}
const BackTo_Action=()=>{

	setreportData([])
	setReportHead('Yearly Reports for 2023')
}
const SubmitYearly=(column)=>{

	try {
      const response = axios({
		  method: "post",
		  url: `http://localhost:5000/report_summary`,
		  data: {'userid':[reportdata],'selectYear':selected_Year},
		  headers: { 'Content-Type': 'application/json'},
	
		}).then(res=> {
	
		  
			setreportData(res.data.data)
	
			
		 
		})
	} catch (error) {

	  }
}
const data = [
   
    {  Present: '', Absent: '', Off: '' },
    {  Present: '', Absent: '', Off: '' },
    { Present: '', Absent: '', Off: '' }
  ];
  const tableColumns = reportData.map(row => row.head_month);
const Sample_clickmon=()=>{
	alert("hello vijay")
}  
return (
        <div className="report_style">
		
              <div className="report_heading"></div>
			  <ArrowBackIcon className="backIcon" onClick={BackTo_Action}></ArrowBackIcon>
              <h5 className="report_subhead">{ReportHead}</h5>
			  
			  <div className="yearly_dropdown">
    <select
      value={selected_Year}
      onChange={e=> {
      const selectedIndex = [e.target.selectedIndex];
      setselected_Year(selectedIndex);
      const options = [...e.target.selectedOptions];
      const year = options.map(option => option.value);
      setselected_Year(year);
  }}
    >
    {year_drop.map((option) => (
      <option key={option.value}>
        {option.value}
      </option>
    ))}
  </select>
  </div>
  <Button as="input" type="submit" value="Submit"  className="year_submitbtn" onClick={SubmitYearly}/>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Column</TableCell>
            {tableColumns.map((column) => (
              <TableCell key={column} onClick={() => Report_monthwise(column)} className="popup_month">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data[0])
            .filter(column => column !== 'head_month')
            .map((column) => (
              <TableRow key={column}>
                <TableCell className="column_cell">{column}</TableCell>
                {reportData.map((row) => (
                  <TableCell key={row.head_month}>
                    {/* {row[column]} */}
				{column === 'Present' && row[column] === 1 ? (<CheckCircleIcon className="DoneIcon" />) :row[column] === 0 ?( <span></span>):(<span></span>) &&column === 'Absent' && row[column] === 1 ? (<CancelRoundedIcon className="AbsentIcon" />):(<span></span>) && column === 'Off' && row[column] === 1 ? (<AccessTimeFilledTwoToneIcon className="OffIcon"/>) :(row[column])}
					
				
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
	);
}
