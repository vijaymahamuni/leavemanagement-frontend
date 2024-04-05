import React, { useState } from 'react';
import "./ForgotPasswordpage.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate ,useLocation} from "react-router-dom";
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/forgotPassword', { email })
      .then(res => {
 
        let Otp_mainRefer=res.data.Otp_code
        if(res.data.status===200){
            navigate("/password_page",{state:Otp_mainRefer})
        }
        else{
            alert("No Users found")
        }
  })
  }
  return (
    <div>
      <h2 className='forgot_head'>Forgot Password</h2>
      <form >
   
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                <input id="standard-basic" label="Email" variant="standard"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='Email_id'
                  placeholder='Email'
                

                />
          

        <Button type="submit" className='resetPassword_btn' onClick={handleSubmit}>Reset Password</Button>
      </form>
    </div>
  );
}
export default ForgotPasswordPage;
