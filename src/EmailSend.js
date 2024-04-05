
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Contactus.css";
import picture_contact from './images/wallpapersden.jpg';
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";



export default function Contactus() {
  const SendContact=()=>{
 

  }
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    emailjs
      .sendForm(
        "service_5jydapm",
        "template_diicbrn",
        form.current,
        "1w1-VlggNq99FNz6n"
      )
      .then(
        (result) => {

        },
        (error) => {
        
        }
      );
  };
  return (

    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>

);
};
