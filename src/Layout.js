import { Outlet, NavLink, useNavigate, Navigate,useLocation} from "react-router-dom";
import React, { useRef ,useState,useEffect} from "react";
import "./layout.css";
import picture from './images/newlogo.png';
import backimg from "./images/backimgpage.jpg";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import axios from "axios";
import api  from "./api/axios"; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// or
 
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";








function Layout(activePage) {
  const [profile,setprofile]=useState();
  const [profileid, setProfileid] = useState('');
  const [update, setUpdate] = useState('')
  const [Buffer,setBuffer]=useState(false);
  const history = useNavigate();
  const [logout, setLogout] = React.useState(false)
  React.useEffect(() => {
 
if (!sessionStorage.getItem('login_email')) history('/login')

}, [logout])
let activeStatus='InActive';

  const logoutHandler = async(event) => {
    event.preventDefault();
    sessionStorage.removeItem("login_email");
    sessionStorage.removeItem('email')
    sessionStorage.removeItem("firstname");
    sessionStorage.removeItem("lastname");
    sessionStorage.removeItem("mobileno");
    sessionStorage.removeItem("country");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("gender");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("subject");
    sessionStorage.removeItem("message");
    sessionStorage.removeItem("Email_id");
    sessionStorage.removeItem("proid");

    // api.put(`/chatActive_update/${Profileid}/${activeStatus}` )
    // await updateDoc(doc(db, "users", auth.currentUser.uid), {
    //   isOnline: false,
    // });
    // await signOut(auth);
  
    setLogout(true);
  }
let Profilename=sessionStorage.getItem("profileName",Profilename);
let Profileid=sessionStorage.getItem("proid",Profileid)
let ProfileEmailid=sessionStorage.getItem('Proemail',ProfileEmailid)
let UserMobileno=sessionStorage.getItem('mobileno',UserMobileno)
let AllowAccess=sessionStorage.getItem('Access_Level')

const navigate = useNavigate();
const location = useLocation();
const res_viewdata=location.state;

const ProfileDrop=()=>{
navigate("/user/profile", {state:res_viewdata})
}

let session_token='InActive';

// useEffect(() => {
//   const handleBeforeUnload = (e) => {
//     // Most browsers support this message
//     e.returnValue = 'Are you sure you want to leave this page?';
//   };

//   const handleCloseTab = () => {
//     console.log('Tab is being closed');
//     logoutHandler();
//   };

 

//   window.addEventListener('beforeunload', handleBeforeUnload);
//   window.addEventListener('unload', handleCloseTab);

//   return () => {
//     // Cleanup by removing the event listeners
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//     window.removeEventListener('unload', handleCloseTab);
   
//   };
// }, []);









// const stopFrontend = () => {
//   let preUserId=sessionStorage.getItem("proid");
//   if(preUserId !==null){
//     api.get(`/update_status/${preUserId}/${session_token}` )

//   }
  

  

    
//   };
// const handleTabClosure = () => {
// stopFrontend(); 
// };
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
const daily_attendance=()=>{
  setBuffer(true)
  const currentTime = getTimeIn24HourFormat();
  const currentDate = getCurrentDate();
  const Totaltime='00:00:00';
  const data = {
    Profileid,
    time: currentTime,
    date: currentDate,
    Totaltime: Totaltime,
  };

  axios.post("http://localhost:5000/main_AttendEntry", data)
    .then(response => {

      setBuffer(false)
    })
    .catch(error => {
     
  
    });
}
const handlePassword=()=>{
  
  navigate("/user/password_page")
  let change='test';
  setUpdate(sessionStorage.setItem("update",change))
}
// let loadData=[{'id': 165, 'employeeid': 10, 'leave_type': 'Work From Home', 'Active_status': 'Pending',  'HRCmds': 'None', 'firstday': '21/07/2023','lastday': '27/07/2023', 'comments': 'Leave Request demo 25', 'firstname': 'Vijay', 'lastname': 'Mahi', 'email': 'vijaysethu0101@gmail.com', 'mobileno': '9384974729', 'AccessLevel': 'L4'}, {'id': 164, 'employeeid': 10, 'leave_type': 'Privilege', 'Active_status': 'Pending','HRCmds': 'None', 'firstday': '20/07/2023',  'lastday': '27/07/2023', 'comments': 'Notification demo 22', 'firstname': 'Vijay', 'lastname': 'Mahi', 'email': 'vijaysethu0101@gmail.com', 'mobileno': '9384974729', 'AccessLevel': 'L4'}, ]
// useEffect(()=>{
//   setProfileid(sessionStorage.getItem('proid'))
//   axios.get(`http://localhost:5000/viewPage/${profileid}`).then(res => {
//     var res_Profiledata=res.data.data;

//     var Profile_Oldpassword = res_Profiledata[0].password;

//     sessionStorage.setItem("Profile_Oldpassword",Profile_Oldpassword)
// })
// })
const [L3Notification,setL3Notification]=useState();
const [loadData,setLoadData]=useState([]);
const getnotificationdata=async()=>{
  const data = await axios.get(`http://localhost:5000/notification/${AllowAccess}/${Profileid}`).then(res => {
   
    setL3Notification(res.data.L3notification)
    if(res.data.data ==''){

    }
    else{
      if(loadData ==''){
        setLoadData(res.data.data)
      }
    }
   
 
})
}
const [current_tab,setCurrent_tab]=useState('Own');
useEffect(()=>{
 getnotificationdata();
 })

const [open, setOpen] = React.useState(false);

const handleClose = () => setOpen(false);
const handleOpen = () => 
   {
      setOpen(true);

   }
const storedTabCurrent = sessionStorage.getItem('tabCurrent');
const UpdateNotification=(pageId,notification_type)=>{
  let updateStatus='1';
  
  try {
    const response = axios({
        method: "put",
        url: `http://localhost:5000/notificationUpdate/${pageId}/${AllowAccess}/${Profileid}`,
        data: {'Update_status':updateStatus},
        headers: { 'Content-Type': 'application/json'},
  
      }).then(res=> {
      
        if(res.status =='200'){
          if(notification_type =='Ticket Raising'){
            navigate(`/user/Ticketview/Own/${pageId}`)
            setOpen(false);
            setLoadData(res.data.data)
          }
          else{
            navigate(`/user/leaveview/Requested/${pageId}`)
            setOpen(false);
            setLoadData(res.data.data)
          }
          
        
        }
        
      })
  } catch (error) {
    
    }
  
}   
let tab_label=sessionStorage.getItem('permission_tab');
let permiss_tab=tab_label;
  return (
    <div>
    {Buffer ?(<div animation="border"  className="loader"/>):(
    <div className="topnav">
      <nav className="navbar">
      <ul className="nav_listing">
      <div>
      <img src="https://www.tigmatech.com/assets/img/logo.png" className="Tigma-logo"/>
      </div> 
        <div className="justnnow">
        <div className="homeStyle">
          
            <NavLink to="home" className={`nav-item ${activePage === 'home' ? 'active' : 'inactive'}`}>Home </NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
         {AllowAccess =='L1' ?(<><div>
            <NavLink to="record" className={`nav-item ${activePage === 'record' ? 'active' : 'inactive'}`}>Users</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;</>):AllowAccess == 'L2' ?(<><div>
            <NavLink to="record" className={`nav-item ${activePage === 'record' ? 'active' : 'inactive'}`}>Users</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;</>):(<></>)} 
        
          {/* <div>
          <NavLink to="summary"  className={`nav-item ${activePage === 'summary' ? 'active' : 'inactive'}`}>Summary</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp; */}
        
          <div>
            <NavLink to="attend" className={`nav-item ${activePage === 'attend' ? 'active' : 'inactive'}`}>Dashboard</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <NavLink to={`permission/${permiss_tab}`} className={`nav-item ${activePage === 'permission' ? 'active' : 'inactive'}`}>Permission</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            {/* {AllowAccess =='L4' ?(<></>):(<> <div>
            
            <NavLink to="leaveDashboard" className={`nav-item ${activePage === 'leaveDashboard' ? 'active' : 'inactive'}`}>Leave</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;</>)} 
            */}
  
          <div>
            <NavLink to={`ticket/${storedTabCurrent}`}  className={`nav-item ${activePage === 'permission' ? 'active' : 'inactive'}`}>Tickets</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
            <NavLink to="newChat" className={`nav-item ${activePage === 'attend' ? 'active' : 'inactive'}`}>Chat</NavLink>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
         
          
      
       <div className="DropStyle">
        <img src={"http://localhost:5000/images/"+ Profileid} className="imageSizeedit"></img>
          <NavDropdown title={Profilename} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={ProfileDrop}>Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handlePassword}>Change Password </NavDropdown.Item>
            <NavDropdown.Item onClick={handleOpen}>Notification </NavDropdown.Item>
            <NavDropdown.Item onClick={daily_attendance}>Daily Attendance </NavDropdown.Item>
            <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
           
          </NavDropdown>
       <div className="notification_batch">
  <NotificationBadge count={L3Notification} effect={Effect.SCALE}/>
</div>
         

      </div>  
</div>

<Modal open={open}  onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
             <Box className="Box-notification">
              <Grid container spacing={2}>
                   
                    <Grid xs={12}>
                    <TableContainer component={Paper} sx={{ maxHeight: 400 }}> {/* Set a maximum height */}
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" ><b>Notification</b></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ overflowY: 'auto' }}> {/* Add scroll to overflow */}
                            {loadData.map((row) => (
                               <TableRow style={{ backgroundColor: row.status == "0" ? "#ccffcc" : "white"}}>
                                    <TableCell onClick={() => UpdateNotification(row.pageId,row.notification_type)} className="Message-Btn"> {row.message} </TableCell>
                                    
                               </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                   </Grid>
              </Grid>
              <CloseIcon onClick={handleClose} className="Close-Icon" />
 
             </Box>
            </Modal>
          <Outlet />
          </ul>
      </nav>
    </div>
        )}
    <div className="outlet-cls">
    </div>

  </div>
  )
};
export default Layout;