import React, { useState, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import "./login.css";
import axios from "axios";
import api  from "./api/axios"; 
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { baseURL } from "./api/axios";
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { updateDoc, doc } from "firebase/firestore";






const Login = () => {
  sessionStorage.setItem('update', 'new')
  sessionStorage.setItem('Edit', 'new')
  
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const navigate = useNavigate();
  function handleClick() {
    navigate("/form")
  }
  const Forgotpassword=()=>{
    navigate("/forgotPassword")
  }
  const history = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
  const ProfileData=()=>{
    
  }
  let activeStatus='Active';
  const newemail=values.email;
  const newpass=values.password;
  api.post('/pagelogin', { values })
      .then(res => {
   
        let Data=("ProfileSet_Monday",res.data.data);
      
    
      
        if (res.data.status == 200) {
          var Profilename = Data[0].firstname;
   
          var Profileid = Data[0].id;
          var Prolastname = Data[0].lastname;
          var Proemail= Data[0].email;
          var Promobileno = Data[0].mobileno;
          var Procountry = Data[0].country;
          var Procity = Data[0].city;
          var Progender= Data[0].gender;
          var ProActive = Data[0].Active_Status;
          var Propassword = Data[0].password;
          var proprofile=Data[0].profile;
          var Access_Level=Data[0].AccessLevel;
         
          sessionStorage.setItem("profileName",Profilename)
          sessionStorage.setItem("proid",Profileid)
          sessionStorage.setItem("Prolastname",Prolastname)
          sessionStorage.setItem("Proemail",Proemail)
          sessionStorage.setItem("login_email",email)
          sessionStorage.setItem("Promobileno",Promobileno)
          sessionStorage.setItem("Procountry",Procountry)
          sessionStorage.setItem("Procity",Procity)
          sessionStorage.setItem("Progender",Progender)
          sessionStorage.setItem("ProActive",ProActive)
          sessionStorage.setItem("Propassword",Propassword)
          sessionStorage.setItem("proprofile",proprofile)
          sessionStorage.setItem("Access_Level",Access_Level)
          sessionStorage.setItem('email', email)
          // alert('Successfully Login');
          api.put(`/chatActive_update/${Profileid}/${activeStatus}` )
          Swal.fire({
            title: 'Login Successfully',
            text: 'Welcome to Tigma!',
            icon: 'success'
          })

          history("/user/home", {state:Data});
    
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Incorrect email / password!',
            icon: 'error'
          });
        }
       
      })
      const result = await signInWithEmailAndPassword(auth, newemail, newpass);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setloggedOut(true)
  }
  React.useEffect(() => {
    if (sessionStorage.getItem('login_email')) history('/user')
  }, [])
  const { email, password } = values;

  const[loggedInstate,setloggedOut]=useState(false);
  
console.log("baseURL api",baseURL)
const SSO_Login_func=(credentialResponse)=>{
  var decoded = jwt_decode(credentialResponse.credential);
  console.log(decoded);
  try {
    const response1 = axios({
         method: "post",
         url: "http://localhost:5000/sso_login",
         data: {'token':decoded},
         headers: { 'Content-Type': 'application/json'},
   
       }).then(res=> {
       console.log(res.data.status)
       if(res.data.status =='200'){
        let loginDatas=res.data.data;
        var Profilename = loginDatas[0].firstname;
   
        var Profileid = loginDatas[0].id;
        var Prolastname = loginDatas[0].lastname;
        var Proemail= loginDatas[0].email;
        var Promobileno = loginDatas[0].mobileno;
        var Procountry = loginDatas[0].country;
        var Procity = loginDatas[0].city;
        var Progender= loginDatas[0].gender;
        var ProActive = loginDatas[0].Active_Status;
        var Propassword = loginDatas[0].password;
        var proprofile=loginDatas[0].profile;
        var Access_Level=loginDatas[0].AccessLevel;
 
        sessionStorage.setItem("profileName",Profilename)
        sessionStorage.setItem("proid",Profileid)
        sessionStorage.setItem("Prolastname",Prolastname)
        sessionStorage.setItem("Proemail",Proemail)
        sessionStorage.setItem("login_email",Proemail)
        sessionStorage.setItem("Promobileno",Promobileno)
        sessionStorage.setItem("Procountry",Procountry)
        sessionStorage.setItem("Procity",Procity)
        sessionStorage.setItem("Progender",Progender)
        sessionStorage.setItem("ProActive",ProActive)
        sessionStorage.setItem("Propassword",Propassword)
        sessionStorage.setItem("proprofile",proprofile)
        sessionStorage.setItem("Access_Level",Access_Level)
        sessionStorage.setItem('email', email)
        Swal.fire('Success', 'Admin action performed!', 'success');
        history("/user/home", {state:loginDatas});

       }
      else if(res.data.status =='401'){
        Swal.fire('Unauthorized email', 'Please use a valid email address.', 'error');

       }
       })
       
      
   
     } catch (error) {
      
     }
  
}
  return (
    <div className="login-page">
      
      <div className="left-section">
        {/* <img src="https://www.tigmatech.com/assets/img/logo.png" alt="Logo" className="logo" /> */}
        <h1 className="welcome-heading">Welcome TO <br/>Tigma Technology <br/> Leave System</h1>
      </div>
      
      <div className="right-section">
        <h1 className="login-text">Login to Tigma</h1>
        <form className="login-form">
       <div className="control-container">
       <input
              type="email"
              name="email"
              className="login-input"
              onChange={handleChange}
              placeholder="Email"
              required
            /> 

       </div>
       <div className="control-container">
       <input
              type="password"
              name="password"
              className="login-input"
              onChange={handleChange}
              placeholder="Password"
              required
            />
       </div>
          
          <button type="submit" className="login-button" onClick={handleSubmit}>Login</button>
          <div className="button-container"></div>
        
        </form>
        <div>
        <div >
          <a onClick={Forgotpassword} className="Signup-link">Forgot password</a>
          <GoogleOAuthProvider clientId="110628976023-kc71sg2s7p9jhlcaefgvq7ip3d11fs7o.apps.googleusercontent.com">
            <GoogleLogin
  onSuccess={credentialResponse => {

    SSO_Login_func(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  
  }}
/>;
            </GoogleOAuthProvider>;
        </div>{/* <a onClick={handleClick} className="Signup-link">Don't have an account? Sign up</a> */}

        </div>
      </div>
    </div>
  );
};

export default Login;
