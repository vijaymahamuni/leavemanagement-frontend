import React, { useState, useEffect } from "react";
import "./success.css"
import { Link, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Userimg from "./images/UserIcon01.svg";
import Dashimg from "./images/newDash.svg";
import tickeimg from "./images/tickets_img.svg";
import AttendanceEntry from './AttendanceEntry';
import DailyAttendance_table from "./DailyAttendance_table";
import api  from "./api/axios"; 

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
  let label=sessionStorage.getItem('tab_label');
  function handleClick(e) {
    e.preventDefault();
    navigate("/home")
  }
  const User_list=()=>{
    navigate("/user/record")
  }
  const Dashboard=()=>{
    navigate("/user/attend")
  }

  const ticket_list=()=>{
    navigate(`/user/ticket`)
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
    <div className="Home_padding">
      <h4 className="user_head">Users</h4>
      <img src={Userimg}  className="UserImg" onClick={User_list}/>
    </div>
    <div className="Dash_img">
    <h4 className="dash_head">Dashboard</h4>
      <img src={Dashimg}  className="dash_icon" onClick={Dashboard}/>
    </div>
    <div className="ticket_img">
    <h4 className="tic_head">Tickets</h4>
      <img src={tickeimg}  className="ticket_icon" onClick={ticket_list}/>
    </div>
    <div>
      <AttendanceEntry />
    </div>
    {/* <div>
      <DailyAttendance_table />
    </div> */}
    
  <div className="display-success">
   
  

  </div>
  </div>
  </div>
  )
}
export default Success;