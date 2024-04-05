import React, { useState, useEffect, props,useCallback } from "react";
import "./viewPage.css";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PrintComponent from './PrintComponent';
import "./ViewLeavepage.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useParams } from 'react-router-dom';

const UserView = async() => {
  const [viewpage,setViewpage]=useState([]); 
  const { id } = useParams();
  
  const data = await axios.get(`http://localhost:5000/viewPermission/${id}`).then(res => {
    
    
        let mainViewData=res.data.data
        
        setViewpage(mainViewData)
})

let AllowAccess=sessionStorage.getItem('Access_Level') 
let CurrentTabValue=sessionStorage.getItem('tabValue');


  return (
    <div>
         
{viewpage.map((item,index) => {
    return <div className="container">
    <label className="label">Employee     <span className='centerview'> :</span>  <span className="value">{item.firstname}</span></label><br/><br/>
    {/* <label className="label">Employee ID     <span className='centerview'> :</span>    <span className="value">{item.employeeID}</span></label><br/><br/> */}
    <label className="label">Email         <span className='centerview'> :</span>    <span className="value">{item.email}</span></label><br/><br/>
    <label className="label">Mobile Number <span className='centerview'> :</span>   <span className="value">{item.mobileno}</span></label><br/><br/>
    <label className="label">Leave Type      <span className='centerview'> :</span>   <span className="value">{item.leave_type}</span></label><br/><br/>
    <label className="label">Start Date         <span className='centerview'> :</span>   <span className="value">{item.firstday}</span></label><br/><br/>
    <label className="label">End Date        <span className='centerview'> :</span>   <span className="value">{item.lastday}</span></label><br/><br/>
    <label className="label">Reason <span className='centerview'> :</span>   <span className="value">{item.comments}</span></label><br/><br/>
    <label className="label">Status <span className='centerview'> :</span>   <span className="value">{item.Active_status}</span></label>

    </div>
    
})}
   
    </div>
  );
};

export default UserView;
