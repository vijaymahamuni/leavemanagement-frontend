import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
const YourComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobileNo: false,
    password: false,
    city: false,
    gender: false,
    country: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the corresponding state
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobileNo':
        setMobileNo(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'country':
        setCountry(value);
        break;
      default:
        break;
    }

    // Perform validation
    const newErrors = { ...errors };
    if (value.trim() === '') {
      newErrors[name] = true;
    } else {
      newErrors[name] = false;
    }
    setErrors(newErrors);
  };

  return (
    <div>
             <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           >
            <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        error={errors.firstName}
        helperText={errors.firstName ? 'First Name is required' : ''}
      />
           </Box>
      
          <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           >
             <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={handleChange}
        error={errors.lastName}
        helperText={errors.lastName ? 'Last Name is required' : ''}
      />
           </Box>
          <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           >
             <TextField
        label="Email"
        name="email"
        value={email}
        onChange={handleChange}
        error={errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />
           </Box>
          <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           >
             <TextField
        label="Mobile No"
        name="mobileNo"
        value={mobileNo}
        onChange={handleChange}
        error={errors.mobileNo}
        helperText={errors.mobileNo ? 'Mobile No is required' : ''}
      />
           </Box>
          <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           ><TextField
           label="Password"
           name="password"
           type="password"
           value={password}
           onChange={handleChange}
           error={errors.password}
           helperText={errors.password ? 'Password is required' : ''}
         /></Box> 
         <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           ><TextField
           label="City"
           name="city"
           value={city}
           onChange={handleChange}
           error={errors.city}
           helperText={errors.city ? 'City is required' : ''}
         /></Box>  
           <Box
             component="form"
             sx={{
               '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off"
           ><TextField
           label="Gender"
           name="gender"
           value={gender}
           onChange={handleChange}
           error={errors.gender}
           helperText={errors.gender ? 'Gender is required' : ''}
         /></Box>
          
    </div>
  );
};

export default YourComponent;
