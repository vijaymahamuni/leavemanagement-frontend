import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PermissionLeave.css";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate ,useLocation, Navigate} from "react-router-dom";
const PermissionLeave = () => {
  const [firstName, setFirstName] = useState('');
  const [employeename, setemployeename] = useState('');
  const [Employeeid, setEmployeeid] = useState('');
  const [empid,setempid]=useState('')
  const [mobileNo, setMobileNo] = useState('');
  const [phone, setphone] = useState('');
  const [Email, setEmail] = useState('');
  const [emailid, setemailid] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [nxtleavetype, setnxtleavetype] = useState('');
  const [startDate, setStartDate] = useState('');
  const [firstday,setfirstday]=useState();
  const [lastday,setlastday]=useState('')
  const [endDate, setEndDate] = useState('');
  const [Comments, setComments] = useState('');
  const [reason, setreason] = useState('');
  const [CheckDays,setCheckdays]=useState(false);
  const [updatealert,setupdatealert]=useState(false);
  const handleFirstNameChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const handleChange = (e) => {
    e.preventDefault(); 
    setFirstName(e.target.value); 
  };
  const handleLastNameChange = (e) => {
    setEmployeeid(e.target.value);
  };

  const handleMobileNoChange = (e) => {
    setMobileNo(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };
  let Profileid=sessionStorage.getItem("proid",Profileid)
  let ProfileEmailid=sessionStorage.getItem('Proemail',ProfileEmailid)
  let Profilename=sessionStorage.getItem("profileName",Profilename);
  let AllowAccess=sessionStorage.getItem('Access_Level')

const Requestleave = (e) => {
    e.preventDefault();
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    const indianDateTime = now.toLocaleString('en-IN', options);
  
    const inputDate = indianDateTime;
    const currentDateTime = moment(inputDate, 'DD/MM/YYYY hh:mm:ss a').format('YYYY-MM-DD HH:mm:ss');

   
    const start1Date = moment(startDate);
    const end1Date = moment(endDate);
  
    const duration = moment.duration(end1Date.diff(start1Date));
    const diffInDays = duration.asDays();
    const diffInMonths = duration.asMonths();
    const diffInYears = duration.asYears();
    let TypeofNotification='Leave Request' 

  
    if(diffInDays >0 && leaveType != '' && Comments!=''){
      try {
        setLoading(true)
        const response = axios({
            method: "post",
            url: `http://localhost:5000/permissionLeave`,
            data: {'UserId':Profileid,'L1Req-timing':currentDateTime,'typeof_notification':TypeofNotification,'Employee':Profilename,'Level_employee':AllowAccess,'Empid':ProfileEmailid,'Email':Email,'Mobile':mobileNo,'Leave Type':leaveType,'Fromdate':startDate,'ToDate':endDate,'Commends':Comments,'Profileid':Profileid},
            headers: { 'Content-Type': 'application/json'},
      
          }).then(res=> {
         
            if(res.data.status==200){
              setLoading(false)
              setupdatealert(true)
            }
          
          })
      } catch (error) {
        
        }
    }
    else{
      if(Comments &&leaveType  ==''){
        alert('Please fill this input field')
      }
      else{
        setCheckdays(true)
      }
     
    }
  
  
  };
  // const location = useLocation();
  // const EditLeaveReq_data=location.state;

  // const { employee, employeeID, mobileno,email,leave_type,start_date,end_date,comments } = EditLeaveReq_data[0];

  const [button, setButton] = useState('')
let tab_label=sessionStorage.getItem('permission_tab');
let permiss_tab=tab_label;
  useEffect(()=>{
   
     setrequest(sessionStorage.getItem('request'))
  })
 
  const [request, setrequest] = useState('') 
  const history = useNavigate();
  const [mainid,setmainid]=useState('')
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const storedValue = sessionStorage.getItem('employee');
    const storedempid =sessionStorage.getItem('employeeID')
    const storeEmailid = sessionStorage.getItem('email');
    const storeMobileno =sessionStorage.getItem('mobileno')
    const storeLeavetype= sessionStorage.getItem('leave_type');
    const storeStart_date=sessionStorage.getItem('start_date')
    const storeEnd_date=sessionStorage.getItem('end_date')
    const storeReason=sessionStorage.getItem('reason')
    setId(sessionStorage.getItem('id'))
   
    const formattedDate = formatDate(storeStart_date);
    const End_Dateformat=formatDate(storeEnd_date)

 


    if (storedValue) {
      setemployeename(storedValue);
    }
    if(storedempid){
      setempid(storedempid)
    }
    if (storeEmailid) {
      setemailid(storeEmailid);
    }
    if(storeMobileno){
      setphone(storeMobileno)
    }
    if(storeLeavetype){
      setnxtleavetype(storeLeavetype)
    }
   if(formattedDate){
    setfirstday(formattedDate)
   }
  if(End_Dateformat){
      setlastday(End_Dateformat)
    }
    if(storeReason){
      setreason(storeReason)
    }
  }, []);
  const [id, setId] = useState('')
  const navigate = useNavigate();

 
  const Updatedleave = (e) => {
    e.preventDefault();


    const start1Date = moment(firstday);
    const end1Date = moment(lastday);
  
    const duration = moment.duration(end1Date.diff(start1Date));
    const diffInDays = duration.asDays();
    const diffInMonths = duration.asMonths();
    const diffInYears = duration.asYears();

    if(nxtleavetype ==''){
      alert('Please Fill input field')
    }
    if(reason ==''){
      alert('Please Fill input field')
    }
    if(diffInDays >=0){
      try {
        const response = axios({
            method: "put",
            url: `http://localhost:5000/leaveUpdate/${id}`,
            data: {'Employee':employeename,'Empid':empid,'Email':emailid,'Mobile':phone,'Leave Type':nxtleavetype,'Fromdate':firstday,'ToDate':lastday,'comments':reason},
            headers: { 'Content-Type': 'application/json'},
      
          }).then(res=> {
       
            if (res.data.status == 200) {

              // alert("Successfully Updated")
              setupdatealert(true)
              // navigate("/user/permission");
          
            }
          })
      } catch (error) {
         
        }
      
    }
    else{
      setCheckdays(true)
     
    }
    

   
  };
 
 
  const handleInputChange = (event) => {
    const value = event.target.value;
    setFirstName(value);

  };
  // const start1Date = moment(firstday);
  // const end1Date = moment(lastday);

  // const duration = moment.duration(end1Date.diff(start1Date));
  // const diffInDays = duration.asDays();
  // const diffInMonths = duration.asMonths();
  // const diffInYears = duration.asYears();
 

  const today = new Date().toISOString().split('T')[0];
  const hideReject=()=>{
    setCheckdays(false)
  
  }
  const hideupdatealt=()=>{
    setupdatealert(false)
    navigate(`/user/permission/${tab_label}`);
  }
  const [selectedOption, setSelectedOption] = useState('');

  const handleDrop = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: 'Privilege', label: 'Privilege' },
    { value: 'Sick', label: 'Sick' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Maternity', label: 'Maternity' },
    { value: 'Paternity', label: 'Paternity' },
    { value: 'Work From Home', label: 'Work From Home' },
  ];
  const swtalert=()=>{
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
    )

  }
  const [Loading,setLoading]=useState(false);
  return (
    <div>
{Loading ?(<div animation="border"  className="loader_permission"/>):(
<div className="LeaveRequest_page">
  <div className='LeaveForm_adjust'>
      <h4 className="heading_leave">Leave Request</h4>
      <form >
      <div className="form-group">
        <div className='leave_style'>
          {request=='leave'?(<>
           
    
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField
        select
        label="Leave Type"
        variant="standard"
        value={leaveType}
        onChange={handleLeaveTypeChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </Box> </>):(<>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField
        select
        label="Leave Type"
        variant="standard"
        value={nxtleavetype}
        onChange={event => setnxtleavetype
              (event.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </Box> 
      </>)}
         
          </div>
        </div>
        
        <div className="form-group">
        <div className='fromday_stl'>
          {request=='leave'?(<>
           
            
          {leaveType =='sick' ?(<>
          
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="Start Date"
        type="date"
      
        value={startDate}
        onChange={handleStartDateChange}
        inputProps={{
          max: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
          </>):(<>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="Start Date"
        type="date"
        min={today}
        value={startDate}
        onChange={handleStartDateChange}
        inputProps={{
          min: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
        </>)}</>):(<>
            
        {nxtleavetype =='sick' ?(<>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="Start Date"
        type="date"
        value={firstday}
        onChange={event => setfirstday
          (event.target.value)}
        inputProps={{
          max: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
          
          
          
        </>):(<>
        
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="Start Date"
        type="date"
        value={firstday}
        onChange={event => setfirstday
              (event.target.value)}
        inputProps={{
          min: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
        
        
         </>)} </>)}
        
        </div>
        </div>
        <div className="form-group">
        <div className='Today_stl'>
          {request=='leave'?(<>
     
         {leaveType =='sick' ?(<>
         
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        inputProps={{
          max: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
      </>):(<>
         
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        inputProps={{
          min: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
      </>)} </>):(<>
        
         {nxtleavetype =='sick' ?(<>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="End Date"
        type="date"
        value={lastday}
        onChange={event => setlastday
              (event.target.value)}
        inputProps={{
          max: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
          
          
          
          </>):(<>
           <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField
        label="End Date"
        type="date"
        value={lastday}
        onChange={event => setlastday
          (event.target.value)}
        inputProps={{
          min: today, 
        }}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Box>
         </>)} </>)}
          
                  </div>
        </div>
        <div className="form-group">
        <div className='commends_syl'> 
        {request=='leave'?(<>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
          <TextField
          label="Reason"
          variant="standard"
          value={Comments}
          onChange={handleCommentsChange}
          fullWidth
          multiline
          
          sx={{ mb: 2 }}
        />
        </Box>



          </>):(<>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
          <TextField
          label="Reason"
          variant="standard"
          value={reason}
          onChange={(e) => setreason(e.target.value)}
          fullWidth
          multiline
          
          sx={{ mb: 2 }}
        />
        </Box>  </>)}
        
           
              </div>
                 
        </div>
       {request =='leave'?(<Button type="submit" className="Requestbtn" onClick={Requestleave}>Request Leave</Button>):(<Button type="submit" className="Requestbtn" onClick={Updatedleave}>Update Leave</Button>)} 
      </form>
     {CheckDays ?(<><SweetAlert error   onConfirm={hideReject}>Invalid EndDate —Please check it out!</SweetAlert></>):(<></>)} 
     {updatealert ?(<><SweetAlert success  onConfirm={hideupdatealt}>Successfully Requested Leave Details!</SweetAlert></>):(<></>)} 

    </div>
    </div>)}
    </div>

    
  );
};

export default PermissionLeave;
