import React, { useState, useEffect, props,useCallback } from "react";
import "./viewPage.css";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PrintComponent from './PrintComponent';

const ViewLeaveDetails = () => {
const location = useLocation();
let  mainViewData=location.state;


// let profileid = mainViewData[0].id;
// let firstname=mainViewData[0].firstname;
// let lastname=mainViewData[0].lastname;
// let email=mainViewData[0].email;
// let mobileno=mainViewData[0].mobileno;
// let country=mainViewData[0].country;
// let city=mainViewData[0].city;
// let password=mainViewData[0].password;
// let gender=mainViewData[0].gender;
// let profile=mainViewData[0].profile;
// let id = mainViewData[0].id;





 
  return (
    <div className='ViewTop'>
    <div className="printable">
    <div  className='view_head'>  <h4 className="insideViewhead">User Details</h4></div>
    <div className="Linestyle"></div>
    <div className='ComponentHide'>
    <PrintComponent/>
    </div>
   
{mainViewData.map((item,index) => {
    return <div className="container">
    <label className="label">Employee Name    <span className='centerview'> :</span>  <span className="value">{item.employee}</span></label><br/><br/>
    <label className="label">Employee ID     <span className='centerview'> :</span>    <span className="value">{item.employeeID}</span></label><br/><br/>
    <label className="label">Email         <span className='centerview'> :</span>    <span className="value">{item.email}</span></label><br/><br/>
    <label className="label">Mobile Number <span className='centerview'> :</span>   <span className="value">{item.mobileno}</span></label><br/><br/>
    <label className="label">Leave Type      <span className='centerview'> :</span>   <span className="value">{item.leave_type}</span></label><br/><br/>
    <label className="label">Start Date         <span className='centerview'> :</span>   <span className="value">{item.start_date}</span></label><br/><br/>
    <label className="label">End Date        <span className='centerview'> :</span>   <span className="value">{item.end_date}</span></label><br/><br/>
    <label className="label">Comments <span className='centerview'> :</span>   <span className="value">{item.comments}</span></label>
    </div>
    
})}
</div>


    </div>
  );
};

export default ViewLeaveDetails;
