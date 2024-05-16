import { useParams } from 'react-router-dom';
import React, { useState, useEffect, props, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from "react-bootstrap/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Showpage() {
  const { id } = useParams();

  const [viewpage, setViewpage] = useState([]);
  const [reqaccesslevel, setReqaccesslevel] = useState();
  const [empname, setEmpname] = useState();
  const [Leavetype, setLeavetype] = useState();
  const [firstday, setfirstday] = useState();
  const [lastday, setlastday] = useState();
  const [Buffer, setBuffer] = useState(true);
  const [ShowpageId, setShowpageId] = useState();
  const [showReason, setshowReason] = useState();
  const [UsersId, setUsersId] = useState();
  let Notification_type = 'Leave Request';
  const data = axios.get(`http://localhost:5000/viewPermission/${id}`).then(res => {


    let mainViewData = res.data.data
    let AccessLevel = mainViewData[0].AccessLevel;
    let employeeName = mainViewData[0].firstname;
    let LeaveType = mainViewData[0].leave_type;
    let leavestart = mainViewData[0].start_date;
    let UserId = mainViewData[0].employeeid;
    setUsersId(UserId)
    let Pageid = mainViewData[0].id;
    let Reason = mainViewData[0].comments;

    setShowpageId(Pageid)

    let leaveEnd = mainViewData[0].end_date;
    setReqaccesslevel(AccessLevel)
    setLeavetype(LeaveType)
    setfirstday(leavestart)
    setEmpname(employeeName)
    setlastday(leaveEnd)
    setshowReason(Reason)


    if (viewpage == '') {
      setViewpage(mainViewData)
    }

  })

  let AllowAccess = sessionStorage.getItem('Access_Level')
  let CurrentTabValue = sessionStorage.getItem('tabValue');
  let ProfileEmailid = sessionStorage.getItem('Proemail', ProfileEmailid)
  let Profilename = sessionStorage.getItem("profileName", Profilename);

  const navigate = useNavigate();
  let AcceptUpdated = AllowAccess + ' ' + 'Accepted'
  let Notification_prograss = Profilename + ' ' + 'Accepted' + ' ' + 'Leave Request';

  let employeeprofile_id = sessionStorage.getItem('proid');
  const handleRejectLeave = (response) => {
    AcceptUpdated = AllowAccess + ' ' + 'Rejected';
    Notification_prograss = Profilename + ' ' + 'Rejected' + ' ' + 'Leave Request'
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

    if (AllowAccess == 'L3') {
      try {
        const response1 = axios({
          method: "put",
          url: `http://localhost:5000/AcceptUpdate/${id}`,
          data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'Notification_type': Notification_type, 'AcceptUpdate': AcceptUpdated, 'teamlead_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {


        })
      } catch (error) {

      }
      setrejectAlert(true)
    }
    else if (AllowAccess == 'L2') {
      try {
        const response1 = axios({
          method: "put",
          url: `http://localhost:5000/AcceptUpdate/${id}`,
          data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'Notification_type': Notification_type, 'AcceptUpdate': AcceptUpdated, 'Hr_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {


        })
      } catch (error) {

      }
      setrejectAlert(true)
    }
    else {
      try {
        const response1 = axios({
          method: "put",
          url: `http://localhost:5000/AcceptUpdate/${id}`,
          data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'Notification_type': Notification_type, 'AcceptUpdate': AcceptUpdated, 'head_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {


        })
      } catch (error) {

      }
      setrejectAlert(true)
    }



  }

  const handleAcceptLeave = (response) => {

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

    if (AllowAccess == 'L3') {
      try {
        const response1 = axios({
          method: "put",
          url: `http://localhost:5000/AcceptUpdate/${id}`,
          data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'Notification_type': Notification_type, 'AcceptUpdate': AcceptUpdated, 'teamlead_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {


        })
      } catch (error) {

      }
      setAlert(true)
    }
    else if (AllowAccess == 'L2') {
      try {
        const response1 = axios({
          method: "put",
          url: `http://localhost:5000/AcceptUpdate/${id}`,
          data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'AcceptUpdate': AcceptUpdated, 'Notification_type': Notification_type, 'Hr_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {


        })
      } catch (error) {

      }

      setAlert(true)

    }
    else {
      try {
        const response1 = axios({
          method: "put",
          url: `http://localhost:5000/AcceptUpdate/${id}`,
          data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'Notification_type': Notification_type, 'AcceptUpdate': AcceptUpdated, 'head_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {


        })
      } catch (error) {

      }
      setAlert(true)
    }

  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [showAlert, setShowAlert] = useState(false);
  const [showapprove, setApprove] = useState(false);
  const [alert, setAlert] = useState(false);
  const [rejectalert, setrejectAlert] = useState(false);
  const [okalert, setokAlert] = useState(false);
  const [confirmalert, setconfirmalert] = useState(false);


  const handleButtonClick = () => {
    setShowAlert(true);
  };
  const handlecheckL1 = () => {
    setconfirmalert(true);
  }
  const handleconfirmClick = (response) => {
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
    AcceptUpdated = AllowAccess + ' ' + 'Accepted and L1 Pending';
    Notification_prograss = Profilename + ' ' + 'Accepted and L1 Pending' + ' ' + 'Leave Request'
    try {
      const response1 = axios({
        method: "put",
        url: `http://localhost:5000/AcceptUpdate/${id}`,
        data: { 'Accept_Time': currentDateTime, 'Notification_process': Notification_prograss, 'UserId': UsersId, 'ShowReason': showReason, 'ShowpageId': ShowpageId, 'AcceptUpdate': AcceptUpdated, 'Hr_comments': response, 'profilemainid': employeeprofile_id, 'levelof_emp': AllowAccess, 'Request_emplevel': reqaccesslevel, 'Notification_type': Notification_type, 'Employee_name': empname, 'sender_id': id, 'Sender_email': ProfileEmailid, 'Leavetype': Leavetype, 'Leave_start': firstday, 'Leave_end': lastday },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {


      })
    } catch (error) {

    }
    setokAlert(true)
  };
  const handleclickApprove = () => {
    setApprove(true)

  }
  const hideAlert = () => {
    setShowAlert(false)
    setAlert(false)
    navigate("/user/permission")
  }
  const handleCancel = () => {


    setShowAlert(false);
    setApprove(false)
    setconfirmalert(false)
  };
  const hideReject = () => {
    setrejectAlert(false)

    navigate("/user/permission")
  }
  const hideconfirm = () => {
    setokAlert(false)
    navigate("/user/permission")
  }
  const back_permissionLeave=()=>{
   navigate(`/user/permission/Requested`) 
  }

  return (

    <div className='leavetop'>
      <div className="viewLeave_form">
        <ArrowBackIcon className="record_backicon" onClick={back_permissionLeave}></ArrowBackIcon>
        <h4 className="SignupHead">Leave Details</h4></div>
      {viewpage.map((item, index) => {
        return <div className="container">
          <label className="label">Employee     <span className='centerview'> :</span>  <span className="value">{item.firstname}</span></label><br /><br />
          {/* <label className="label">Employee ID     <span className='centerview'> :</span>    <span className="value">{item.employeeID}</span></label><br/><br/> */}
          <label className="label">Email         <span className='centerview'> :</span>    <span className="value">{item.email}</span></label><br /><br />
          <label className="label">Mobile Number <span className='centerview'> :</span>   <span className="value">{item.mobileno}</span></label><br /><br />
          <label className="label">Leave Type      <span className='centerview'> :</span>   <span className="value">{item.leave_type}</span></label><br /><br />
          <label className="label">Start Date         <span className='centerview'> :</span>   <span className="value">{item.firstday}</span></label><br /><br />
          <label className="label">End Date        <span className='centerview'> :</span>   <span className="value">{item.lastday}</span></label><br /><br />
          <label className="label">Reason <span className='centerview'> :</span>   <span className="value">{item.comments}</span></label><br /><br />
          <label className="label">Status <span className='centerview'> :</span>   <span className="value">{item.Active_status}</span></label><br /><br />
          <label className="label">TL Comments <span className='centerview'> :</span>   <span className="value">{item.Leadcmds}</span></label><br /><br />
          <label className="label">HR Comments <span className='centerview'> :</span>   <span className="value">{item.HRCmds}</span></label><br /><br />
          <label className="label">CEO Comments <span className='centerview'> :</span>   <span className="value">{item.Headcmds}</span></label><br /><br />

        </div>

      })}

      {CurrentTabValue == 'Requested' ? (
        <>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to Rejected this Employee leave Request?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleRejectLeave} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          {AllowAccess == 'L3' ? (<> {showAlert && (
            <SweetAlert
              input
              showCancel
              cancelBtnBsStyle="light"
              confirmBtnText="Ok!"
              confirmBtnBsStyle="danger"
              inputType="textarea"
              placeHolder="Write something"
              onConfirm={(response) => handleRejectLeave(response)}
              onCancel={handleCancel}
            >
              <div className='LevelHeading'>Team Lead Comments:</div>
            </SweetAlert>
          )}</>) : AllowAccess == 'L2' ? (<> {showAlert && (
            <SweetAlert
              input
              showCancel
              cancelBtnBsStyle="light"
              confirmBtnText="Ok!"
              confirmBtnBsStyle="danger"
              inputType="textarea"
              placeHolder="Write something"
              onConfirm={(response) => handleRejectLeave(response)}
              onCancel={handleCancel}
            >
              <div className='LevelHeading'> HR Comments:</div>
            </SweetAlert>
          )}</>) : (<> {showAlert && (
            <SweetAlert
              input
              showCancel
              cancelBtnBsStyle="light"
              confirmBtnText="Ok!"
              confirmBtnBsStyle="danger"
              inputType="textarea"
              placeHolder="Write something"
              onConfirm={(response) => handleRejectLeave(response)}
              onCancel={handleCancel}
            >
              <div className='LevelHeading'>Head Comments:</div>
            </SweetAlert>
          )}</>)}
          {/* {showapprove && (
        <SweetAlert
          success
          showCancel
          confirmBtnText="Yes!"
          confirmBtnBsStyle="success"
          title="Are you sure Approve?"
          onConfirm={handleAcceptLeave}
          onCancel={handleCancel}
          focusCancelBtn
        />
        
      )} */}

          {AllowAccess == 'L3' ? (<> {showapprove && (
            <SweetAlert
              input
              showCancel
              cancelBtnBsStyle="light"
              inputType="textarea"
              placeHolder="Write something"
              onConfirm={(response) => handleAcceptLeave(response)}
              onCancel={handleCancel}
            >
              <div className='LevelHeading'>Team Lead Comments:</div>
            </SweetAlert>
          )}</>) : AllowAccess == 'L2' ? (<> {showapprove && (
            <SweetAlert
              input
              showCancel
              cancelBtnBsStyle="light"
              inputType="textarea"
              placeHolder="Write something"
              onConfirm={(response) => handleAcceptLeave(response)}
              onCancel={handleCancel}
            >
              <div className='LevelHeading'>HR Comments:</div>
            </SweetAlert>
          )}</>) : (<> {showapprove && (
            <SweetAlert
              input
              showCancel
              cancelBtnBsStyle="light"
              inputType="textarea"
              placeHolder="Write something"
              onConfirm={(response) => handleAcceptLeave(response)}
              onCancel={handleCancel}
            >
              <div className='LevelHeading'>Head Comments:</div>
            </SweetAlert>
          )}</>)}
          {/*     
      {confirmalert && (
        <SweetAlert
        input
        showCancel
        confirmBtnText="Yes!"
        confirmBtnBsStyle="success"
        placeHolder="Write something"
        inputType="textarea" 
        onConfirm={(response) => handleconfirmClick(response)}
        onCancel={handleCancel}
   
        >HR Comments</SweetAlert>

      
      )} */}
          {AllowAccess == 'L3' ? (<> {confirmalert && (
            <SweetAlert
              input
              showCancel
              confirmBtnText="Yes!"
              confirmBtnBsStyle="success"
              placeHolder="Write something"
              inputType="textarea"
              onConfirm={(response) => handleconfirmClick(response)}
              onCancel={handleCancel}

            >
              <div className='LevelHeading'>Team Lead Comments:</div>
            </SweetAlert>
          )}</>) : AllowAccess == 'L2' ? (<> {confirmalert && (
            <SweetAlert
              input
              showCancel
              confirmBtnText="Ok!"
              confirmBtnBsStyle="success"
              placeHolder="Write something"
              inputType="textarea"
              onConfirm={(response) => handleconfirmClick(response)}
              onCancel={handleCancel}

            >
              <div className='LevelHeading'>HR Comments:</div>
            </SweetAlert>
          )}</>) : (<> {confirmalert && (
            <SweetAlert
              input
              showCancel
              confirmBtnText="Yes!"
              confirmBtnBsStyle="success"
              placeHolder="Write something"
              inputType="textarea"
              onConfirm={(response) => handleconfirmClick(response)}
              onCancel={handleCancel}

            >
              <div className='LevelHeading'>Head Comments:</div>
            </SweetAlert>
          )}</>)}
          <div className='ApproveBts'>
            <Button type='button' className='approvebtn' onClick={handleclickApprove}>Approve</Button>
            <Button type='button' className='rejectbtn' onClick={handleButtonClick}>Reject</Button>
          </div>

          {AllowAccess == 'L2' ? (<><Button type='button' className='confirmbtn' onClick={handlecheckL1}>Pass to L1</Button></>) : (<></>)}
        </>
      ) : (<></>)}

      {alert ? (<><SweetAlert
        success
        title="Approved!"
        onConfirm={hideAlert}
      >

      </SweetAlert></>) : (<></>)}
      {rejectalert ? (<><SweetAlert
        danger
        title="Rejected!"
        onConfirm={hideReject}
      >

      </SweetAlert></>) : (<></>)}
      {okalert ? (<><SweetAlert
        success
        title="Passed to L1!"
        onConfirm={hideconfirm}
      >

      </SweetAlert></>) : (<></>)}


    </div>
  )
}

export default Showpage;