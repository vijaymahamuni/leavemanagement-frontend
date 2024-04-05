import React, { useState, useEffect, props,useCallback } from "react";
import "./ProfileView.css";
import { useNavigate ,useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PrintComponent from './PrintComponent';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import axios, { Axios } from "axios";
const ProfileView = () => {
const navigate = useNavigate();

const handleClose=()=>{
  navigate("/user/home")
  setHidePage(false)
}
const [hidePage, setHidePage] = useState(false);
const handlePrintClick=()=>{
  window.print();
}
const [isPrinting, setIsPrinting] = useState(false);
let Profilename=sessionStorage.getItem("profileName",Profilename)
let Profileid=sessionStorage.getItem("proid",Profileid)
let Prolastname=sessionStorage.getItem("Prolastname",Prolastname)
let Proemail=sessionStorage.getItem("email",email)
let Promobileno=sessionStorage.getItem("Promobileno",Promobileno)
let Procountry=sessionStorage.getItem("Procountry",Procountry)
let Procity=sessionStorage.getItem("Procity",Procity)
let Progender=sessionStorage.getItem("Progender",Progender)
let ProActive=sessionStorage.getItem("ProActive",ProActive)
let Propassword=sessionStorage.getItem("Propassword",Propassword)
let Proprofile=sessionStorage.getItem("Proprofile",Proprofile)
let firstname=Profilename;
let lastname=Prolastname;
let email=Proemail;
let mobileno=Promobileno;
let country=Procountry;
let city=Procity;
let gender=Progender;
let password=Propassword;
let profile=Proprofile;
let id=Profileid;

function handleProfile() {
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
    <div className='ComponentHide'>
    <PrintComponent/>
    </div>
  <div className="container">
    <label className="label">Profile       <span className='centerview'> :</span>  <span className="value"><img src={"http://localhost:5000/images/"+ Profileid} className='profileView'></img></span></label><br/><br/><br/>
    <label className="label">First Name    <span className='centerview'> :</span>  <span className="value">{Profilename}</span></label><br/><br/>
    <label className="label">Last Name      <span className='centerview'> :</span>    <span className="value">{Prolastname}</span></label><br/><br/>
    <label className="label">Email         <span className='centerview'> :</span>    <span className="value">{Proemail}</span></label><br/><br/>
    <label className="label">Mobile Number <span className='centerview'> :</span>   <span className="value">{Promobileno}</span></label><br/><br/>
    <label className="label">Country      <span className='centerview'> :</span>   <span className="value">{Procountry}</span></label><br/><br/>
    <label className="label">City         <span className='centerview'> :</span>   <span className="value">{Procity}</span></label><br/><br/>
    <label className="label">Gender        <span className='centerview'> :</span>   <span className="value">{Progender}</span></label><br/><br/>
    <label className="label">Active Status <span className='centerview'> :</span>   <span className="value">{ProActive}</span></label>
    </div>
  </div>

<Button type='button' color='primary' block className='close-btn' onClick={handleClose}>close</Button>
<Button type='button' color='primary' block className='print-btn' onClick={handlePrintClick}>Print</Button>
</div>
  );
};

export default ProfileView;
