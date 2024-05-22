import React, { useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useLocation} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import "./SummaryPage.css";
function SummaryPage() {
    const [Summarydata,setSummarydata]=useState([]);
    const [SummaryUser_Wise,SetSummaryUser_wise]=useState('');
    const [Summaryshowuser,SetSummaryshowuser]=useState('');
    const [Buffer,setBuffer]=useState(true);
    const location = useLocation();
    let  reportdata=location.state;
    const[ReportHead,setReportHead]=useState('Yearly Reports for 2023');
    const year_drop=[
        {value:'2023'},
        {value:'2022'},
        {value:'2021'},
        {value:'2020'},
        {value:'2019'},
        {value:'2018'},
        {value:'2017'},
        {value:'2016'},
 
      ]
 
    const [SummaryYear,setSummaryYear]=useState(['2023'])
    useEffect(()=>{
        if(reportdata ==null){
            try {
         
                const response = axios({
                  method: "post",
                  url: `http://localhost:5000/SummaryAll`,
                  data: {'userid':1,'selectYear':SummaryYear},
                  headers: { 'Content-Type': 'application/json'},
            
                }).then(res=> {
              
                  const summary_data=res.data.data;
                  if(Summarydata ==''){
                    setSummarydata(res.data.data)
                    }
                    setBuffer(false)
                })
            } catch (error) {
          
              }
        }
        else{
            try {
     
                const response = axios({
                  method: "post",
                  url: `http://localhost:5000/report_summary`,
                  data: {'userid':[reportdata],'selectYear':SummaryYear},
                  headers: { 'Content-Type': 'application/json'},
            
                }).then(res=> {
               
                  const summary_data=res.data.data;
                  if(Summarydata ==''){
                    setSummarydata(res.data.data)
                    }
                    setBuffer(false)
                })
            } catch (error) {
        
              }
    
        }

    })

const SummaryPage=(column)=>{

        const demoMonth=column;

    if(reportdata ==null){
        if(SummaryUser_Wise){
            try {
                const response = axios({
                    method: "post",
                    url: `http://localhost:5000/monthClick_data`,
                    data: {'userid':Summaryshowuser,'selectYear':SummaryYear,'selectMonth':demoMonth},
                    headers: { 'Content-Type': 'application/json'},
              
                  }).then(res=> {
                    
                    setSummarydata(res.data.data)
                    setReportHead('Daily Reports for' +' '+ demoMonth  +' '+ SummaryYear +' '+ 'for User' +' '+Summaryshowuser)
                   
                  })
              } catch (error) {
    
                }
        }
        else{
            try {
                const response = axios({
                    method: "PUT",
                    url: `http://localhost:5000/SummaryAll`,
                    data: {'selectYear':SummaryYear,'selectMonth':demoMonth},
                    headers: { 'Content-Type': 'application/json'},
              
                  }).then(res=> {
                    
                    setSummarydata(res.data.data)
                    setReportHead('Daily Reports for' +' '+ demoMonth  +' '+ SummaryYear)
                   
                  })
              } catch (error) {
                  
                }
        }

    }
    else{
        try {
            const response = axios({
                method: "post",
                url: `http://localhost:5000/monthClick_data`,
                data: {'userid':[reportdata],'selectYear':SummaryYear,'selectMonth':demoMonth},
                headers: { 'Content-Type': 'application/json'},
          
              }).then(res=> {
             
                if(Summarydata !=''){
                  setSummarydata(res.data.data)
                  setReportHead('Daily Reports for' +' '+ demoMonth  +' '+ SummaryYear +' '+ 'for User' +' '+reportdata)
                  }
               
              })
          } catch (error) {
          
            }
    }
    }
    const data = [
   
        {  Present: '', Absent: '', Off: '' },
        {  Present: '', Absent: '', Off: '' },
        { Present: '', Absent: '', Off: '' }
      ];
  const tableColumns = Summarydata.map(row => row.head_month);   
  const Backbtn_Action=()=>{
	setSummarydata([])
	setReportHead('Yearly Reports for 2023')
    SetSummaryUser_wise(null)
}
const SummaryYearly_submit=(column)=>{
    setBuffer(true)
    if(reportdata!=null){
        try {
            const response = axios({
                method: "post",
                url: `http://localhost:5000/report_summary`,
                data: {'userid':[reportdata],'selectYear':SummaryYear},
                headers: { 'Content-Type': 'application/json'},
          
              }).then(res=> {

                setSummarydata(res.data.data)
                setBuffer(false)
          
              })
          } catch (error) {
         
            }
    }
    else if(SummaryUser_Wise){
    
        try {
            const response = axios({
                method: "post",
                url: `http://localhost:5000/report_summary`,
                data: {'userid':Summaryshowuser,'selectYear':SummaryYear,'selectMonth':'March'},
                headers: { 'Content-Type': 'application/json'},
          
              }).then(res=> {
           
                setSummarydata(res.data.data)
          
              })
          } catch (error) {
           
            }
    }
    else{
        try {
         
            const response = axios({
              method: "post",
              url: `http://localhost:5000/SummaryAll`,
              data: {'userid':1,'selectYear':SummaryYear},
              headers: { 'Content-Type': 'application/json'},
        
            }).then(res=> {
             
              const summary_data=res.data.data;
         
                setSummarydata(res.data.data)
          
            })
        } catch (error) {
           
          }
    }
}

const useStyles = makeStyles({
    tableContainer: {
      overflowX: 'auto',
    },
    tableCell: {
      whiteSpace: 'nowrap',
    },
  });
const classes = useStyles();
console.log("Summarydata",Summarydata)
  return (
    <div>
    {Buffer ?(<div animation="border"  className="loader"/>):(   <div className="Summary_style">
		<ArrowBackIcon className="backIcon" onClick={Backbtn_Action}></ArrowBackIcon>
    <div className="report_heading">
    <h5 className="report_subhead">{ReportHead}</h5>
    </div>
    {/* <div>
    <div className="yearly_dropdown">
    <select
      value={SummaryYear}
      onChange={e=> {
      const selectedIndex = [e.target.selectedIndex];
      setSummaryYear(selectedIndex);
      const options = [...e.target.selectedOptions];
      const year = options.map(option => option.value);
      setSummaryYear(year);
  }}
    >'
    {year_drop.map((option) => (
      <option key={option.value}>
        {option.value}
      </option>
    ))}
  </select>
  </div>
  <div className="UserFilter">
    {reportdata == null ?(<div>  <select
      value={showupdate_user}
      onChange={e=> {
      const selectedIndex = [e.target.selectedIndex];
      SetSummaryshowuser(selectedIndex);
      const user_filter = [...e.target.selectedOptions];
      const user = user_filter.map(option => option.value);
      SetSummaryUser_wise(user);
      const user1 = user_filter.map(option1 => option1.label);
   
      Setshowupdate_user(user1)
      }}
    >
    {user_filter.map((option) => (
      <option key={option.value}>
        {option.value}
      </option>
    ))}
</select></div>):(null)}

</div>
<div>
<Button as="input" type="submit" value="Submit"  className={reportdata==null?"summaryYear_Selt":"userwiseYear_dropdown"} onClick={SummaryYearly_submit}/>

</div>
    </div> */}
  <div className="tabledata" >
  <div id="container">
        <TableContainer component={Paper}  className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {tableColumns.map((column) => (
              <TableCell key={column}  className="popup_month" onClick={() => SummaryPage(column)} >{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data[0])
            .filter(column => column !== 'head_month')
            .map((column) => (
              <TableRow key={column}>
                <TableCell className="column_cell" >{column}</TableCell>
                {Summarydata.map((row) => (
                  <TableCell key={row.head_month}>
                    {/* {row[column]} */}
                {reportdata !=null ?(<div>
                    {Summaryshowuser >=1 ?(
                <div>{column === 'Present' && row[column] === 1 ? (<CheckCircleIcon className="DoneIcon" />) :row[column] === 0 ?( <span></span>):(<span></span>) &&column === 'Absent' && row[column] === 1 ? (<CancelRoundedIcon className="AbsentIcon" />):(<span></span>) && column === 'Off' && row[column] === 1 ? (<AccessTimeFilledTwoToneIcon className="OffIcon"/>) :(row[column])}</div>    
                ):(<div>{column === 'Present' && row[column] === 0 ?( <span></span>):(<span></span>)&&  column === 'Present' && row[column] === 1 ?( <CheckCircleIcon className="DoneIcon" />):(<span></span>) &&column === 'Absent' && row[column] === 0 ? (<span></span>):(<span></span>)  &&column === 'Absent' && row[column] === 1 ? (<CancelRoundedIcon className="AbsentIcon" />):(<span></span>) && column === 'Off' && row[column] === 1 ? ((<AccessTimeFilledTwoToneIcon className="OffIcon"/>)) :(<span></span>) && column === 'Off' && row[column] === 0 ? ((<span></span>)) :(row[column])}</div>)}   
                 
				{column === 'Present' && row[column] === 0 ?( <span></span>):(<span></span>) &&column === 'Absent' && row[column] === 0 ? (<span></span>):(<span></span>) && column === 'Off' && row[column] === 0 ? ((<span></span>)) :(<span></span>)}

                </div>):(<div>
                    {Summaryshowuser >=1 ?(
                <div>{column === 'Present' && row[column] === 1 ? (<CheckCircleIcon className="DoneIcon" />) :row[column] === 0 ?( <span></span>):(<span></span>) &&column === 'Absent' && row[column] === 1 ? (<CancelRoundedIcon className="AbsentIcon" />):(<span></span>) && column === 'Off' && row[column] === 1 ? (<AccessTimeFilledTwoToneIcon className="OffIcon"/>) :(row[column])}</div>    
                ):(<div>{column === 'Present' && row[column] === 0 ?( <span></span>):(<span></span>)&& column === 'Absent' && row[column] === 0 ? (<span></span>):(<span></span>)  &&column === 'Off' && row[column] === 0 ? ((<span></span>)) :(row[column])}</div>)}   
                 
				{column === 'Present' && row[column] === 0 ?( <span></span>):(<span></span>) &&column === 'Absent' && row[column] === 0 ? (<span></span>):(<span></span>) && column === 'Off' && row[column] === 0 ? ((<span></span>)) :(<span></span>)}

                </div>)}    
              
				{/* {reportdata ==null ?(<span></span>):(<div>{column === 'Present' && row[column] === 1 ? (<CheckCircleIcon className="DoneIcon" />) :row[column] === 0 ?( <span></span>):(<span></span>) &&column === 'Absent' && row[column] === 1 ? (<CancelRoundedIcon className="AbsentIcon" />):(<span></span>) && column === 'Off' && row[column] === 1 ? (<AccessTimeFilledTwoToneIcon className="OffIcon"/>):(<span></span>)}</div>)} */}
				
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>)}  
    </div>
  )
}

export default SummaryPage