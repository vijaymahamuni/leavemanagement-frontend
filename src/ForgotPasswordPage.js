import React, { useState } from 'react';
import "./ForgotPasswordpage.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from "react-router-dom";
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/forgotPassword', { email })
      .then(res => {

        let Otp_mainRefer = res.data.Otp_code
        if (res.data.status === 200) {
          navigate("/password_page", { state: Otp_mainRefer })
        }
        else {
          alert("No Users found")
        }
      })
  }
  const backto_Login=()=>{
    navigate(`/login`)
  }
  return (
    // <div>
    //   <h2 className='forgot_head'>Forgot Password</h2>
    //   <form >

    //             {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

    //             <input id="standard-basic" label="Email" variant="standard"
    //               type="email"
    //               name="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className='Email_id'
    //               placeholder='Email'


    //             />


    //     <Button type="submit" className='resetPassword_btn' onClick={handleSubmit}>Reset Password</Button>
    //   </form>
    // </div>
    <div className='forgot_passpage'>
      <div className="card text-center" style={{ width: 725, height: 430 }}>
        <div className="card-header h5 text-white bg-resetpass">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with instructions to
            reset your password.
          </p>&nbsp;
          <div data-mdb-input-init="" className="form-outline">


            <input id="standard-basic" label="Email" variant="standard"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control my-3"
              placeholder='Email'


            />
          </div>&nbsp;&nbsp;
          <a  data-mdb-ripple-init="" className="btn btn-back_logbtn w-100" onClick={handleSubmit}>
            Reset password
          </a>&nbsp;&nbsp;&nbsp;
          <div className="d-flex justify-content-end mt-4">
            
          <a  className="btn btn-back_logbtn" onClick={backto_Login}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>


  );
}
export default ForgotPasswordPage;
