import React, { useState, useEffect, props,useCallback } from "react";
import "./viewPage.css";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PrintComponent from './PrintComponent';

const ViewPage = () => {
const location = useLocation();
let  mainViewData=location.state;

let profileid = mainViewData[0].id;
let firstname=mainViewData[0].firstname;
let lastname=mainViewData[0].lastname;
let email=mainViewData[0].email;
let mobileno=mainViewData[0].mobileno;
let country=mainViewData[0].country;
let city=mainViewData[0].city;
let password=mainViewData[0].password;
let gender=mainViewData[0].gender;
let profile=mainViewData[0].profile;
let id = mainViewData[0].id;

const navigate = useNavigate();
const handleClose=()=>{
  
  navigate("/user/record", {state:profileid})
  setHidePage(false)
}
const [hidePage, setHidePage] = useState(false);
const handlePrintClick=()=>{
  window.print();
  

}
const [isPrinting, setIsPrinting] = useState(false);

function EditProfile() {
  sessionStorage.setItem('id', id)
  sessionStorage.setItem('firstname', firstname)
  sessionStorage.setItem('lastname', lastname)
  sessionStorage.setItem('email', email)
  sessionStorage.setItem('mobileno', mobileno)
  sessionStorage.setItem('country', country)
  sessionStorage.setItem('city', city)
  sessionStorage.setItem('password', password)
  sessionStorage.setItem('gender', gender)
  sessionStorage.setItem('profile', profile)
  sessionStorage.setItem('update', 'test')
  
  
  axios.get(`http://localhost:5000/viewPage/${id}`).then(res => {
    var res_formdata=res.data.data;
   
    navigate("/user/form", {state:res_formdata})

})
}

 
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
    <label className="label">Profile       <span className='centerview'> :</span>  <span className="value"><img src={"http://localhost:5000/images/"+ profileid} className='profileView'></img></span></label><br/><br/>
    <label className="label">First Name    <span className='centerview'> :</span>  <span className="value">{item.firstname}</span></label><br/><br/>
    <label className="label">Last Name      <span className='centerview'> :</span>    <span className="value">{item.lastname}</span></label><br/><br/>
    <label className="label">Email         <span className='centerview'> :</span>    <span className="value">{item.email}</span></label><br/><br/>
    <label className="label">Mobile Number <span className='centerview'> :</span>   <span className="value">{item.mobileno}</span></label><br/><br/>
    <label className="label">Country      <span className='centerview'> :</span>   <span className="value">{item.country}</span></label><br/><br/>
    <label className="label">City         <span className='centerview'> :</span>   <span className="value">{item.city}</span></label><br/><br/>
    <label className="label">Gender        <span className='centerview'> :</span>   <span className="value">{item.gender}</span></label><br/><br/>
    <label className="label">Active Status <span className='centerview'> :</span>   <span className="value">{item.Active_Status}</span></label>
    </div>
    
})}
</div>
<Button type='button'   className='closebtn' onClick={handleClose}>close</Button>
<Button type='button'  className='printbtn' onClick={handlePrintClick}>Print</Button>
<Button type='button'   className='Editingprofile' onClick={EditProfile}>Edit</Button>

    </div>
  );
};

export default ViewPage;
