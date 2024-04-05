import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, RouterLink, Link } from "react-router-dom";
import "./form.css";
import Form from "./Form";
import Login from "./login";
import Success from "./success";
import Home from "./home";
import Update from "./Update";
import Layout from "./Layout";
import "./layout.css";
import "./App.css";
import Listtable from "./listTable";
import Attendance from "./Attendance";
import Contactus from "./Contactus";
import SampleTickets_list from "./sampleTickets_list";
import ViewPage from "./viewPage";
import DropdownMenu from "./ProfileView";
import ProfileView from "./ProfileView";
import ExcelExportButton from "./ExcelExportButton";
import Change_Passwordpage from "./Change_Passwordpage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ReportPage from "./ReportPage";
import SummaryPage from "./SummaryPage";
import PermissionLeave from "./PermissionLeave";
import LeaveRequestlisting from "./LeaveRequestlisting";
import ViewLeavePage from "./ViewLeavePage";
import UserView from './ViewLeavePage';
import Showpage from "./components/Showpage";
import YourComponent from "./Signup";
import LeaveSection from "./components/LeaveSection";
import axios from "axios";
import api  from "./api/axios"; 
import TicketsRise from "./TicketRise";
import TicketsViewpage from "./TicketsViewpage";
import AttendanceEntry from './AttendanceEntry';
import DailyAttendance_table from "./DailyAttendance_table";
import DropdownComponent from "./ActionsDropdown";
import Norecord_component from "./Norecords_component";
import Chatroom from "./chatapp/chatroom";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 
import ChatingApp from './new_chat/new_chatingroom';
import Cloud_webpage from "./cloudWebpage_design/cloud_webpage";
const firebaseConfig = {
  apiKey: "AIzaSyCfrqJMozKcGM9cCM6Wq90OKSywbPsg7pc",
  authDomain: "clean-skill-396906.firebaseapp.com",
  projectId: "clean-skill-396906",
  storageBucket: "clean-skill-396906.appspot.com",
  messagingSenderId: "110628976023",
  appId: "1:110628976023:web:edb65815c31b4c1de280d2",
  measurementId: "G-YBP12DJFVG"
};


firebase.initializeApp(firebaseConfig);



function App() {
  let session_token='InActive';
  const [isRunning, setIsRunning] = useState(true);

  // useEffect(() => {
  //   // When the component mounts, start the frontend
  //   // startFrontend();
    
  //   // Register a beforeunload event listener to handle tab closure
  //   window.addEventListener('beforeunload', handleTabClosure);

  //   return () => {
  //     // When the component unmounts, stop the frontend
  //     stopFrontend();
  //   };
  // }, []);
  // const startFrontend = async () => {
  //   try {
  //     const response = await axios.put('http://localhost:5000/stop_frontend', {
  //       session_token: Math.random().toString(36).substring(7), // Generate a random session token
  //     });
  //     setSessionToken(response.data.session_token);
  //     setIsRunning(true);
  //   } catch (error) {
  //     console.error('Failed to start frontend:', error);
  //   }
  // };

  // const stopFrontend = () => {
  //     let preUserId=sessionStorage.getItem("proid");
  //     if(preUserId !==null){
  //       api.put(`/update_status/${preUserId}`, { session_token})
  //       .then(response => {
  //         // Handle the response from the server
  //       })
  //       .catch(error => {
  //         // Handle any errors
  //       }); 
  //     }
  //     };
  // const handleTabClosure = () => {
  //   stopFrontend(); 
  // };
  return (
    <div>
      <BrowserRouter>

        <Routes >
          <Route path='login' element={<Login />} />
          <Route path='cloud' element={< Cloud_webpage/>} />

          <Route path='/form' element={<Form />} />
          <Route path='/signup' element={<YourComponent />} />
          <Route path='/drop' element={<DropdownMenu />} />
          <Route path='/export' element={<ExcelExportButton />} />
          <Route path='/password_page' element={<Change_Passwordpage />} />
          <Route path='/forgotPassword' element={<ForgotPasswordPage />}/>
         <Route path='/user' element={<Layout  />}>
            <Route path="home" element={<Success />} />
            <Route path='record' element={<Home />} />
            <Route path='norecord' element={<Norecord_component />} />
            <Route path='redux' element={<Listtable />} />
            <Route  exact path="ticket/:tabCurrent"  element={<SampleTickets_list />} />
            <Route path="attend" element={<Attendance />} />
            <Route path='form' element={<Form />} />
            <Route path='view' element={<ViewPage />} />
            <Route path='Dropdown' element={<DropdownComponent />} />
            <Route path='daily_attendance' element={<DailyAttendance_table/>} />
            <Route path='contact_us' element={<TicketsRise />} />
            <Route path='profile' element={<ProfileView />} />
            <Route exact path='chat/:typeofView/:id' element={<Chatroom />} />
            <Route exact path='newChat' element={<ChatingApp />} />

            <Route exact path='permission/:Current_tab' element={<LeaveRequestlisting />} />
        
            <Route path='leaveForm' element={<PermissionLeave />} />
            <Route path='leaveDashboard' element={<LeaveSection />} />
            {/* <Route path="/user/leaveview/:postId" element={<ViewLeavePage />} > */}
            <Route exact path="leaveview/:tab/:id" element={<Showpage/>} />
            <Route exact path="Ticketview/:tab/:id" element={<TicketsViewpage/>} />
          <Route path='report' element={<ReportPage />} />
            <Route path='summary' element={<SummaryPage />} />
            <Route path="logout" element={<Login />} />
            <Route path='password_page' element={<Change_Passwordpage />} />
          </Route>
          <Route path='Update' element={<Update />} />
         
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;










