import React, { useState, useEffect } from "react";
import "./success.css"
import { Link, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Userimg from "./images/UserIcon01.svg";
import Dashimg from "./images/newDash.svg";
import tickeimg from "./images/ticketDemonew.png";
import AttendanceEntry from './AttendanceEntry';
import DailyAttendance_table from "./DailyAttendance_table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chatIcon from "./images/Chatdemo.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ChatIcon from '@mui/icons-material/Chat';
import api from "./api/axios";

function Success() {
  const history = useNavigate();
  const [logout, setLogout] = React.useState(false)
  React.useEffect(() => {
    if (!sessionStorage.getItem('login_email')) history('/login')
  }, [logout])
  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("login_email");
    setLogout(true);

  }
  const navigate = useNavigate();
  let label = sessionStorage.getItem('tab_label');
  function handleClick(e) {
    e.preventDefault();
    navigate("/home")
  }
  const User_list = () => {
    navigate("/user/record")
  }
  const Dashboard = () => {
    navigate("/user/attend")
  }

  const ticket_list = () => {
    navigate(`/user/ticket/Own`)
  }
  const chat_list=()=>{
    navigate(`/user/newChat`)

  }
  // let session_token='InActive';
  // const [isRunning, setIsRunning] = useState(true);

  //   useEffect(() => {
  //     // When the component mounts, start the frontend
  //     // startFrontend();

  //     // Register a beforeunload event listener to handle tab closure
  //     window.addEventListener('beforeunload', handleTabClosure);

  //     return () => {
  //       // When the component unmounts, stop the frontend
  //       stopFrontend();
  //     };
  //   }, []);
  //   const stopFrontend = () => {
  //     let preUserId=sessionStorage.getItem("proid");
  //     if(preUserId !==null){
  //       api.get(`/update_status/${preUserId}/${session_token}` )

  //     }
  //     };
  // const handleTabClosure = () => {
  //   stopFrontend(); 
  // };

  return (
    <div className="main_page">
      <div className="Overalla_success">
        {/* <div className="Home_padding">
          <div className="centered-content">
            <h4 className="user_head">Users</h4>
            <img src={Userimg} className="UserImg img-size" onClick={User_list} />
          </div>
        </div> */}
        <div className="Home_padding">
          <div className="centered-content">
            <h4 className="dash_head">Dashboard</h4>
            {/* <img src={Dashimg} className="dash_icon img-size" onClick={Dashboard} /> */}
            <DashboardIcon style={{width:"100px",height:"60px"}} onClick={Dashboard}/>
          </div>
        </div>
        <div className="Home_padding">
          <div className="centered-content">
            <h4 >Tickets</h4>
            {/* <img src={tickeimg} className="ticket_icon img-size"  /> */}
            <ConfirmationNumberIcon style={{width:"100px",height:"60px"}} onClick={ticket_list}/>
          </div>
        </div>
        <div className="Home_padding">
          <div className="centered-content">
            <h4 >Chat</h4>
            {/* <img src={chatIcon} className="chatIcon"  />  */}
            <ChatIcon style={{width:"100px",height:"60px"}} onClick={chat_list}/>
            </div>       
        </div>

      </div>
      <div style={{ width: "50%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" ,marginTop: "130px"
}}>
        <AttendanceEntry />
      </div>

    </div>

  )
}
export default Success;