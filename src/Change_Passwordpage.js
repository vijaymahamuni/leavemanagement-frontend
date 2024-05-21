import React, { useState, useEffect, props,useCallback } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Change_Passwordpage.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate ,useLocation} from "react-router-dom";
import ChangeImg from './images/changePassword.jpg';
function Change_Passwordpage() {
 const [oldPassword, setOldPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [profileid, setProfileid] = useState('');
 const [proPassword, setProPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [profileEmail, setprofileEmail] = useState('');
 const [resetOtp,setResetOtp]=useState('');
 const [update, setUpdate] = useState('');
 const [resetNewpass, setresetNewpass] = useState('');
 const [resetconfirmpass, setresetconfirmpass] = useState('');
 const navigate = useNavigate();
 const handleOldPasswordChange = (e) => {
  setOldPassword(e.target.value);

};
const handleResetOtp=(e)=>{
  setResetOtp(e.target.value)
}
useEffect(()=>{
  setProfileid(sessionStorage.getItem('proid'))
  setProPassword(sessionStorage.getItem('Propassword'))
  setprofileEmail(sessionStorage.getItem('Proemail'))
  setUpdate(sessionStorage.getItem('update'))
})
const handleNewPasswordChange = (e) => {
  setNewPassword(e.target.value);
};
const resetnewpass=(e)=>{
  setresetNewpass(e.target.value);
}
const resetConfirmpass=(e)=>{
  setresetconfirmpass(e.target.value);
}
const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
};
const HandleUpdatepass=(e)=>{
  e.preventDefault();
}
const handleSubmit = (e) => {
  e.preventDefault();
  if (oldPassword.length < 6 || newPassword.length < 6) {
    alert('Passwords should be at least 6 characters long.');
    return;
  }
  if (newPassword != confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;
  if (!strongPasswordRegex.test(newPassword)) {
    alert(
      'New password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    return;
  }

  if(oldPassword != proPassword){
    alert("The Old Password is incorrect.Try again.")
  }
 else{
  try {
    const response = axios({
      method: "post",
      url: `http://localhost:5000/changePassword`,
      data: {'newpassword':newPassword,'Profileid': profileid,'ProfileEmail':profileEmail},
      headers: { 'Content-Type': 'application/json'},

    }).then(res=> {
     
      if(res.status ==200){
        alert("Your password updated successfully")
        sessionStorage.removeItem("email");
        navigate("/login")
      }
     
    })

} catch (error) {
   
  }
 
 }
};

const handleClose=()=>{
    navigate("/user/home")
}
const location = useLocation();
let Otp_transfer=(location.state);
const handleUpdate=async(e)=>{
  e.preventDefault();
  if (resetNewpass.length < 6 || resetconfirmpass.length < 6) {
    alert('Passwords should be at least 6 characters long.');
    return;
  }
  if (resetNewpass != resetconfirmpass) {
    alert('Passwords do not match');
    return;
  }
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;
  if (!strongPasswordRegex.test(resetNewpass)) {
    alert(
      'New password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    return;
  }
  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:5000/changePassword`,
      data: { 'resetOtp': resetOtp,'forgotnewpass':resetNewpass,'forgotconfirmpass':resetconfirmpass },
      headers: { 'Content-Type': 'application/json'},

    }).then(res=> {
     
        if(resetOtp !=Otp_transfer){
          alert("Wrong OTP entered")
        }
        else if(res.status ==200){
          alert("Your password updated successfully")
          navigate("/user/home")
        }
      }

    )
   
  } catch (error) {

  }
}
const forgot_Close=()=>{
  navigate("/login")
}
const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const handleToggleOldPassword = () => {
  setShowOldPassword((prev) => !prev);
};
const handleToggleConfirmPassword = () => {
  setShowConfirmPassword((prev) => !prev);
};
const handleToggleNewPassword = () => {
  setShowNewPassword((prev) => !prev);
};

  return (
    <div className='Overallpage'>
      {(update == "new") ? (  <h3 className="change_headingtop">Create new Password</h3>):( 
         <h3 className="change_headingtop">Change Password</h3>)}
    
    {(update == "new") ? ( <div className='password_change'>
     
     {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
     {/* <p className='heading_old'>Reset Otp</p> */}
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
    <TextField
        type="text"
        label="Reset Otp"
        name="rest_otp"
        value={resetOtp}
        className="oldpassword_control"
        onChange={handleResetOtp}
        variant="standard">

    </TextField>
      </Box>
     {/* <input 
      v-model='name'
          type="text"
          name="rest_otp"
          value={resetOtp}
          className="oldpassword_control"
          onChange={handleResetOtp}
   /> */}

 </div>):(
      <div className='password_change'>
     
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                  {/* <p className='heading_old'>Old Password</p> */}
                  
                  <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
                  <TextField
        label="Old Password"
        type={showOldPassword  ? 'text' : 'password'}
        value={oldPassword}
        className="oldpassword_control"
        onChange={handleOldPasswordChange}
        fullWidth
        variant="standard"
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleOldPassword} edge="end">
                {showOldPassword  ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      </Box>
                  {/* <input 
                   v-model='name'
                       type="password"
                       name="password"
                       value={oldPassword}
                       className="oldpassword_control"
                       onChange={handleOldPasswordChange}
                />
   */}
              </div>
    )}
    {(update == "new") ? (
       <div className='newpassword_change'>
             
       {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
                <TextField
        label="New Password"
        className="newpassword_control"
        type={showNewPassword ? 'text' : 'password'}
        value={resetNewpass}
        onChange={resetnewpass}
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleNewPassword} edge="end">
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
</Box>

       {/* <p className='heading_newpass'>New Password</p>
       <input id="standard-basic" 
         className="newpassword_control"
         type="password"
         name="password"
         value={resetNewpass}
         onChange={resetnewpass}
       /> */}
   
     </div>
    ):(
              <div className='newpassword_change'>
             
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
                <TextField
        label="New Password"
        className="newpassword_control"
        type={showNewPassword ? 'text' : 'password'}
        value={newPassword}
        variant="standard"
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleNewPassword} edge="end">
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
</Box>



                {/* <p className='heading_newpass'>New Password</p>
                <input id="standard-basic" 
                  className="newpassword_control"
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                /> */}
            
              </div>)}
        {(update == "new") ? (<div> 


          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
        <TextField
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        className="Confirm_control" 
        value={resetconfirmpass}
        onChange={resetConfirmpass} 
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleToggleConfirmPassword}
                onMouseDown={(e) => e.preventDefault()} 
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
       
      /></Box>
              {/* <p className='heading_confirmpass'>Confirm Password</p>
              <input 
              type="password"
              name="password"
              className="Confirm_control" 
              value={resetconfirmpass}
              onChange={resetConfirmpass} 
         
          
           required /> */}
              
              </div>):(<div> 
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
                <TextField
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        className="Confirm_control" 
        value={confirmPassword}
        variant="standard"
        onChange={handleConfirmPasswordChange} 
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleToggleConfirmPassword}
                onMouseDown={(e) => e.preventDefault()} // Prevent the focus change when clicking the icon
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
       
      /></Box>
              {/* <p className='heading_confirmpass'>Confirm Password</p>
              <input 
              type="password"
              name="password"
              className="Confirm_control" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange} 
         
          
           required /> */}
              
              </div>)}
             
              {(update == "new") ? (
                <Button as="input" type="submit" value="Update" onClick={handleUpdate}  className="Change_button"/>
              ):(<Button as="input" type="submit" value="Submit" onClick={handleSubmit}  className="Change_button"/>)}
              {(update =="new")?(
                      <Button as="input" type="submit" value="Close" onClick={forgot_Close}  className="close_button"/>
              ):(
                <Button as="input" type="submit" value="Close" onClick={handleClose}  className="close_button"/>
              )}
              
              
              <img src={ChangeImg} className="Change_backimg"></img>
    </div>
  )
}

export default Change_Passwordpage