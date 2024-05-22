import React, { useState, useEffect, props } from "react";
import { Link, Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import "./form.css";
import axios, { Axios } from "axios";
import picture from './images/Pro_profile.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';

import dhanushimg from './images/Vijay_YNM.jpg';

function Form() {
  const [id, setId] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setemail] = useState('')
  const [mobileno, setmobileno] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [password, setpassword] = useState('')
  const [gender, setgender] = useState('')
  const [profile, setProfile] = useState()
  const [update, setUpdate] = useState('')
  const [button, setButton] = useState('')
  const [msg, setmsg] = useState();
  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileno: '',
    city: '',
    password: '',
    gender: '',
    profile: '',

  })
  const [bucket, setBucket] = React.useState(false)
  const location = useLocation();
  const newuseremail = values.email;
  const newPassword = values.password;
  const newfirstname = values.firstname;
  const mainformData = location.state;
  const generatedID = uuidv4();




  const updateUser = async (event, currentPage) => {
    const isValid = ValidateCheck()

    if (!isValid) {
      return false
    }
    const newprofile = mainformData[0].profile;


    await axios.put(`http://localhost:5000/userslist/${id}/${1}`, {
      id,
      firstname,
      lastname,
      email,
      mobileno,
      country,
      city,
      password,
      gender,
      newprofile,
      selectedLevel,
      employeeId

    }).then(res => {
      Swal.fire({
        title: 'Success',
        text: 'Successfully updated!',
        icon: 'success'
      });
      if (res.data.status == 100) {
        setmsg('Already exist email id!')
      }
      if (res.data.status == 200) {
        history("/user/record");

      }
    }
    )

    if (selectedFile) {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);

      setSelectedFile(formData)
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/images/${id}`,
          data: { 'file': selectedFile },
          headers: { 'Content-Type': "multipart/form-data" },

        });

      } catch (error) {

      }
    }
  }
  const imgedit = async () => {
    const data = await axios.get(`http://localhost:5000/images`).then(res => {
      const ticket_data = (res.data.data)
    })

  }
  let AllowAccess = sessionStorage.getItem('Access_Level')
  useEffect(() => {
    setId(sessionStorage.getItem('id'))
    setFirstName(sessionStorage.getItem('firstname'))
    setLastName(sessionStorage.getItem('lastname'))
    setemail(sessionStorage.getItem('email'))
    setmobileno(sessionStorage.getItem('mobileno'))
    setcountry(sessionStorage.getItem('country'))
    setcity(sessionStorage.getItem('city'))
    setpassword(sessionStorage.getItem('password'))
    setgender(sessionStorage.getItem('gender'))
    setProfile(sessionStorage.getItem('profile'))
    setUpdate(sessionStorage.getItem('update'))
    setButton(sessionStorage.getItem('button'))
    setEmployeeId(sessionStorage.getItem('employeeId'))
    setSelectedLevel(sessionStorage.getItem('AccessLevel'))
    // alert(EmpDeptlevel)
    // if(EmpDeptlevel == 'L4'){
    //   setSelectedLevel('Employee')
    // }
    // else if(EmpDeptlevel =='L3'){
    //   setSelectedLevel('Team Lead')

    // }
    // else if(EmpDeptlevel =='L2'){
    //   setSelectedLevel('HR')

    // }
    // else{
    //   setSelectedLevel('CEO')
    // }
    // setSelectedLevel(sessionStorage.getItem('employee_level'))
    var radios = document.getElementsByName("gender");
    var val = sessionStorage.getItem('gender');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value == val) {
        radios[i].checked = true;
      }
    }
  }, [])
  const [validations, setValidations] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileno: '',
    password: '',
    city: '',
    gender: '',
    setmsg: ''
  })
  var radios = document.getElementsByName("profile");
  var val = sessionStorage.getItem('profile');

  const validateAll = () => {
    const { firstname, lastname, email, mobileno, password, city, gender } = values
    const validations = { firstname: '', lastname: '', email: '', mobileno: '', password: '', city: '', gender: '', setmsg: '' }
    let isValid = true

    if (!firstname) {
      validations.firstname = 'Firstname is required'
      isValid = false
    }

    if (firstname && firstname.length < 3 || firstname.length > 25) {
      validations.firstname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }
    if (!lastname) {
      validations.lastname = <div >Lastname is required</div>
      isValid = false
    }

    if (lastname && lastname.length < 3 || lastname.length > 25) {
      validations.lastname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }

    if (!email) {
      validations.email = 'Email is required'
      isValid = false
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@gmail.com'
      isValid = false
    }
    if (!mobileno) {
      validations.mobileno = 'Mobile no is required'
      isValid = false
    }
    if (mobileno && mobileno.length < 10 || mobileno.length > 10) {
      validations.mobileno = 'Invalid Mobile no'
      isValid = false
    }
    if (!password) {
      validations.password = <div>Password is required</div>
      isValid = false
    }
    if (password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
      validations.password = 'Atleast 8 char password'
      isValid = false
    }
    if (!gender) {
      validations.gender = 'Gender is required'
      isValid = false
    }
    if (!city) {
      validations.city = <div >City is required</div>
      isValid = false
    }
    // if (!country) {
    //   validations.country = <div>Country is required</div>
    //   isValid = false
    // }
    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }
  const ValidateCheck = () => {
    const validations = { firstname: '', lastname: '', email: '', mobileno: '', password: '', city: '', gender: '', profile: '', setmsg: '' }
    let isValid = true
    if (!firstname) {
      validations.firstname = 'Firstname is required'
      isValid = false
    }
    if (firstname && firstname.length < 3 || firstname.length > 25) {
      validations.firstname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }
    if (!lastname) {
      validations.lastname = 'Lastname is required'
      isValid = false
    }

    if (lastname && lastname.length < 3 || lastname.length > 25) {
      validations.lastname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }
    if (!email) {
      validations.email = 'Email is required'
      isValid = false
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@gmail.com'
      isValid = false
    }
    if (!mobileno) {
      validations.mobileno = 'Mobile no is required'
      isValid = false
    }
    if (mobileno && mobileno.length < 10 || mobileno.length > 10) {
      validations.mobileno = 'Invalid Mobile no'
      isValid = false
    }
    if (!password) {
      validations.password = 'Password is required'
      isValid = false
    }
    if (password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
      validations.password = 'Atleast 8 char password'
      isValid = false
    }
    if (!gender) {
      validations.gender = 'Gender is required'
      isValid = false
    }
    if (!city) {
      validations.city = 'City is required'
      isValid = false
    }
    // if (!country) {
    //   validations.country = 'Country is required'
    //   isValid = false
    // }
    if (!isValid) {
      setValidations(validations)
    }
    return isValid
  }
  const validateTwo = (e) => {
    const { name } = e.target
    const value = [name]
    let message = ''
    if (!value) {
      message = `${name} is required`
    }

    if (value && name === 'firstname' && (value.length < 3 || value.length > 25)) {
      Swal.fire({
        title: 'Alert',
        text: 'Name must contain between 3 and 25 characters',
        icon: 'info'
      });
    }
    if (value && name === 'lastname' && (value.length < 3 || value.length > 25)) {
      Swal.fire({
        title: 'Alert',
        text: 'Name must contain 3to 20char',
        icon: 'info'
      });
    }

    if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text: 'Email format must be as example@mail.com',
        icon: 'info'
      });
    }
    if (value && name === 'mobileno' && !/^[0-9]{10}$/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text: 'invalid mobile number',
        icon: 'info'
      });

    }
    if (value && name === 'password' && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text: 'invalid password and Weak',
        icon: 'info'
      });
    }
    if (value && name === 'city' && !/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text: 'invalid city',
        icon: 'info'
      });
    }
  }
  const validateOne = (e) => {

    const { name } = e.target
    const value = values[name]
    let message = ''
    if (!value) {
      message = `${name} is required`
    }

    if (value && name === 'firstname' && (value.length < 3 || value.length > 25)) {
      Swal.fire({
        title: 'Alert',
        text:'Name must contain between 3 and 25 characters',
        icon: 'info'
      });
    }
    if (value && name === 'lastname' && (value.length < 3 || value.length > 25)) {
      Swal.fire({
        title: 'Alert',
        text:'Name must contain 3to 20char',
        icon: 'info'
      });
    }

    if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text:'Email format must be as example@mail.com',
        icon: 'info'
      });
    }
    if (value && name === 'mobileno' && !/^[0-9]{10}$/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text:'invalid mobile number',
        icon: 'info'
      });

    }
    if (value && name === 'password' && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text:'invalid password and Weak',
        icon: 'info'
      });
    }
    if (value && name === 'city' && !/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value)) {
      Swal.fire({
        title: 'Alert',
        text:'invalid city',
        icon: 'info'
      });
    }
  }
  const handleChange = (e) => {

    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    console.log("printed values ", values)


  }
  const [error, setError] = useState(false);
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateAll()
    if (!isValid) {
      return false
    }
    let message = ''
    axios.post('http://localhost:5000/data', { values, country, selectedLevel, employeeId })
      .then(res => {

        // alert(res.data.msg);
        Swal.fire({
          title: 'Success',
          text: 'Successfully Added User!',
          icon: 'success'
        });
        if (res.data.status == 400) {
          setmsg('Already exist email id!')
        }
        else {
          setmsg('')
        }
        if (res.data.status == 200) {
          const formData = new FormData();
          formData.append("selectedFile", selectedFile);


          setSelectedFile(formData)
          try {
            const response = axios({
              method: "post",
              url: `http://localhost:5000/photo`,
              data: { 'file': selectedFile },
              headers: { 'Content-Type': "multipart/form-data" },

            });


          } catch (error) {

          }
          history("/login");

        }
      })
    try {
      const db = firebase.firestore();

      const result = await createUserWithEmailAndPassword(
        auth,
        newuseremail,
        newPassword,
      );
      console.log("Selected file printed is", dpimg)
      const imageRef = ref(storage, `userImages/${result.user.uid}/${dpimg.name}`);
      const metadata = {
        contentType: 'image/jpeg',
      };

      await uploadBytes(imageRef, dpimg, metadata);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl)
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        newfirstname,
        newuseremail,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
        imageUrl: imageUrl
      });
    } catch (err) { }
  }
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [display, setDisplay] = React.useState([]);

  const handleImage = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);

    setSelectedFile(formData)
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/images/${id}`,
        data: { 'file': selectedFile },
        headers: { 'Content-Type': "multipart/form-data" },

      });

    } catch (error) {

    }
  }
  const [dpimg, setDpimg] = useState("");
  const handleFileupdate = (event) => {

    setSelectedFile(event.target.files[0]);
    setDisplay(URL.createObjectURL(event.target.files[0]))
    setDpimg(event.target.files[0])
    setValues({ profile: event.target.files[0].name, firstname: values.firstname, lastname: values.lastname, email: values.email, mobileno: values.mobileno, city: values.city, password: values.password, gender: values.gender },
    )
  }
  const handleFileSelect = (event) => {

    setSelectedFile((event.target.files[0]));
    setValues({ profile: event.target.files[0].name, firstname: values.firstname, lastname: values.lastname, email: values.email, mobileno: values.mobileno, city: values.city, password: values.password, gender: values.gender },
    )
  }
  const {
    firstname: firstnameVal,
    lastname: lastnameVal,
    email: emailVal,
    mobileno: mobilenoVal,
    password: passwordval,
    city: cityval,
    gender: genderVal
  } = validations
  const navigate = useNavigate();
  function Login() {
    navigate("/login")
  }
  sessionStorage.setItem('button', 'edit')

  useEffect(() => {

  })
  const options = [
    { value: 'India', label: 'India' },
    { value: 'America', label: 'America' },
    { value: 'Afghanistan', label: 'Afghanistan' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Japan', label: 'Japan' },
    { value: 'New Zealand', label: 'New Zealand' },
  ];
  const handleDrop = (event) => {
    setcountry(event.target.value);
  };
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  let employeeLevels = [];
  if (AllowAccess === 'L1') {
    employeeLevels = [
      { label: 'Team Lead', value: 'L3' },
      { label: 'Employee', value: 'L4' },
      { label: 'HR', value: 'L2' },
      { label: 'CEO', value: 'L1' },
    ];
  } else {
    employeeLevels = [
      { label: 'Team Lead', value: 'L3' },
      { label: 'Employee', value: 'L4' },

    ];
  }
  const [employeeId, setEmployeeId] = useState('');
  const [newEmailid, setnewEmailid] = useState('');
  const [errors, setErrors] = useState({
    firstname: false,
    lastName: false,
    email: false,
    mobileNo: false,
    password: false,
    city: false,
    gender: false,
  });

  const handleEmployeeid = (event) => {
    const { value } = event.target;
    setEmployeeId(value);

    // Validate the employeeId
    if (value.length < 5) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const goback_home = () => {
    navigate(`/user/record`)
  }
  return (

    <div className="container1">

      <div className={update == 'new' ? "signup-wrap" : "form-wrap"}>


        <form className="Latest-regis" >
          {(update == "new") ? (<div className="formfill_head">
            <ArrowBackIcon className="record_backicon" onClick={goback_home}></ArrowBackIcon>
            <h4 className="SignupHead">Add User</h4></div>) : (
            <div className="formfill_head">
              <ArrowBackIcon className="record_backicon" onClick={goback_home} ></ArrowBackIcon>
              <h4 className="SignupHead">Update Users</h4></div>)}
          <div className="updatepage_edit">
            <div className="split_two">
              <div>
                <div >

                  <label>
                    {(update == "new") ? (

                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        {/* <TextField
                          label="First Name"
                          type="text"
                          variant="standard"
                          value={firstname}
                          onChange={handleChange}
                          onBlur={validateOne}

                          sx={{ mb: 2 }}
                        /> */}


                        <TextField
                          id="outlined-basic"
                          label="First Name"
                          variant="outlined"
                          type="text"
                          name="firstname"
                          value={firstname}
                          onChange={handleChange}
                          onBlur={validateOne}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }}
                        />

                      </Box>
                    )
                      : (
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
                            variant="standard"
                            name="firstname"

                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{ mb: 2 }}
                          />
                        </Box>)}
                  </label>
                  <div>{firstnameVal}</div>
                </div>
                <div>
                  <label>
                    {(update == "new") ? (
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField type="text" id="outlined-basic" label="Last Name" name="lastname"
                          variant="outlined" value={lastname}
                          onChange={handleChange}
                          onBlur={validateOne}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }} />
                      </Box>
                    )
                      : (
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
                            value={lastname}
                            variant="standard"
                            name="lastname"

                            onChange={event => setLastName
                              (event.target.value)}
                            onBlur={validateOne}
                          />
                        </Box>)}
                  </label>
                  <div className="lastName_valid">{lastnameVal}</div>
                </div>





                <div >

                  <label>
                    {(update == "new") ? (
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField type="text" id="outlined-basic" label="Email" name="email" variant="outlined" value={email}
                          onChange={handleChange}
                          onBlur={validateOne}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }} />
                      </Box>
                    )
                      : (
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
                            value={email}
                            name="email"
                            variant="standard"
                            onChange={event => email
                              (event.target.value)}
                            onBlur={validateOne}
                          />
                        </Box>)}
                    <div >{msg}</div>

                  </label>
                  <div>{emailVal}</div>
                </div>
                <div >
                  <label>
                    {(update == "new") ? (

                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                          onBlur={validateOne}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }}
                        />
                      </Box>

                    ) : (<Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >

                      <TextField
                        label="Password" variant="standard"
                        type="password"
                        name="password"
                        value={password}
                        onChange={event => setpassword
                          (event.target.value)}
                        onBlur={validateOne}
                      />
                    </Box>
                    )}
                    <div>{passwordval}</div>
                  </label>
                </div>

                <div >
                  <label htmlFor="country" ></label>
                  {(update == "new") ? (
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="dropdown-stl"
                        select
                        label="Select an Country"
                        variant="outlined"
                        value={country}
                        name="country"
                        onChange={event => setcountry
                          (event.target.value)}
                        onBlur={validateOne}
                        sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }}

                      >
                        {options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>) : (
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="dropdown-stl"
                        select
                        label="Select an Country"
                        variant="standard"
                        value={country}
                        name="country"
                        onChange={event => setcountry
                          (event.target.value)}
                        onBlur={validateOne}>
                        {options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  )}

                </div>
                <div >
                  <label>
                    {(update == "new") ? (

                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField id="outlined-basic" label="City" variant="outlined" type="text"
                          name="city"
                          value={city}
                          onChange={handleChange}
                          onBlur={validateOne}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }} />
                      </Box>) : (
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField label="City" variant="standard"
                          type="text"
                          name="city"
                          value={city}
                          onChange={event => setcity
                            (event.target.value)}
                        />
                      </Box>
                    )}

                  </label>
                  <div>{cityval}</div>
                </div>
              </div>
              <div style={{ marginTop: "-24px" }}>
                <div >
                  <label ></label>
                  {(update == "new") ? (
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="dropdown-stl"
                        select
                        label="Select an Department"
                        variant="outlined"
                        value={selectedLevel}
                        onChange={event => setSelectedLevel
                          (event.target.value)}
                        onBlur={validateOne}
                        sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }}
                      >
                        {employeeLevels.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>


                  ) : (
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="dropdown-stl"
                        select
                        label="Select an Department"
                        variant="standard"
                        value={selectedLevel}
                        onChange={event => setSelectedLevel
                          (event.target.value)}
                        onBlur={validateOne}
                      >
                        {employeeLevels.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  )}
                </div>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                </Box>
                <div >
                  <label>
                    {(update == "new") ? (

                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField id="outlined-basic" label="Employee ID" value={employeeId}
                          variant="outlined"
                          onChange={handleEmployeeid}
                          error={error}
                          helperText={error ? 'Employee ID must be at least 5 characters long' : ''}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }}
                        />

                        {/* <TextField
                      placeholder="Employee ID"
                      value={employeeId}
                      variant="standard"
                      onChange={handleEmployeeid}
                      error={error}
                      helperText={error ? 'Employee ID must be at least 5 characters long' : ''}
                    /> */}
                      </Box>


                    ) : (<Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                      <TextField
                        label="Employee ID"
                        value={employeeId}
                        variant="standard"
                        onChange={handleEmployeeid}
                        error={error}
                        helperText={error ? 'Employee ID must be at least 5 characters long' : ''}
                      />
                    </Box>
                    )}

                  </label>
                  {/* <div>{employeeId}</div> */}
                </div>



                <div >
                  <label>
                    {(update == "new") ? (
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Mobile no"
                          variant="outlined"
                          type="tel"
                          name="mobileno"
                          value={mobileno}
                          onChange={handleChange}
                          onBlur={validateOne}
                          sx={{ width: '300px', '& .MuiOutlinedInput-root': { height: '50px' } }}

                        />


                      </Box>

                    ) : (
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >


                        <TextField label="Mobile no" variant="standard"


                          type="tel"
                          name="mobileno"
                          value={mobileno}
                          onChange={event => setmobileno
                            (event.target.value)}
                          onBlur={validateOne}

                        />
                      </Box>
                    )}
                    <div>{mobilenoVal}</div>
                  </label>
                </div>
                <div className="gender-radio">
                  Gender
                  <br />
                  <label className="custom-radio">
                    {(update == "new") ? (<input
                      type="radio"
                      name="gender"
                      className="form-inputs"
                      value="Female"
                      onChange={handleChange}
                      onBlur={validateOne} />) : (<input
                        type="radio"
                        name="gender"
                        className="form-inputs"
                        value="Female"
                        onChange={event => setgender
                          (event.target.value)}
                        onBlur={validateOne} />)}
                    <span>Female</span>
                    <span className="radio-dot"></span>
                  </label>&nbsp;&nbsp;
                  <label className="custom-radio">
                    {(update == "new") ? (
                      <input
                        type="radio"
                        name="gender"
                        className="form-inputs"
                        value="Male"
                        onChange={handleChange}
                        onBlur={validateOne}
                      ></input>) : (<input
                        type="radio"
                        name="gender"
                        className="form-inputs"
                        value="Male"
                        onChange={event => setgender
                          (event.target.value)}
                        onBlur={validateOne}
                      ></input>)}
                    <span>Male</span>
                    <span className="radio-dot"></span>
                  </label>&nbsp;&nbsp;
                  <label className="custom-radio">
                    {(update == "new") ? (
                      <input
                        type="radio"
                        name="gender"
                        className="form-inputs"
                        value="others"
                        onChange={handleChange}
                        onBlur={validateOne}
                      ></input>) : (<input
                        type="radio"
                        name="gender"
                        className="form-inputs"
                        value="others"
                        onChange={event => setgender
                          (event.target.value)}
                        onBlur={validateOne}
                      ></input>)}
                    <span>Others</span>
                    <span className="radio-dot"></span>
                  </label>
                </div>
                <div>{genderVal}</div>

                <label className="ProEdit" for="img">Upload Your Profile</label>

                <div className="imgstl">
                  {(update !== "new") ? (
                    <div> <label className="picture">
                      Change
                      <input type="file" id="edit" onChange={handleFileupdate} />
                    </label>
                      <img src={selectedFile ? display : "http://localhost:5000/images/" + id} height="78px" width="78px" id="show_img" /></div>) : (<div> <label className="picture">
                        {selectedFile ? 'Change' : 'Upload'}
                        <input type="file" id="edit" onChange={handleFileupdate} />
                      </label>
                        <img src={selectedFile ? display : picture + id} height="78px" width="78px" id="show_img" /></div>)}


                </div>

              </div>
            </div>

          </div>
          `
        </form>
        <Outlet />
        {(update !== "new") ? (<button type="submit" className="updatebtn" onClick={updateUser}>Update</button>) : (<button type="submit" className="registerbtn" onClick={handleSubmit}>Register</button>)}

      </div>

    </div>

  )
}
export default Form;

