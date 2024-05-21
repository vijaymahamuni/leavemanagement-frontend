import { useParams } from 'react-router-dom';
import React, { useState, useEffect, props, useCallback } from "react";
import axios from "axios";
import "./TicketViewpage.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WordLimitedText from './WrodLimit_component/WordLimitedText';
import { Link } from 'react-router-dom';
function TicketsViewpage() {
  const { id } = useParams();
  const [viewpage, setViewpage] = useState([]);
  const [ccEmails, setCCEmails] = useState('');
  const [CC_sendemail, setCC_sendemail] = useState([]);
  const [sendCC_emailid, setsendCC_emailid] = useState([]);
  const [Email_To, setEmail_To] = useState('');
  const [subject, setsubject] = useState('');
  const [profileId, setprofileId] = useState('');
  const [tosend_userid, setTosend_userid] = useState('')
  let Profileid = sessionStorage.getItem("proid", Profileid)
  const data = axios.get(`http://localhost:5000/viewTickets/${id}`).then(res => {

    const Ticketdata = res.data.data;
    let To_Emails = Ticketdata[0].firstname;
    let Subjects = Ticketdata[0].Subject;
    let empid = Ticketdata[0].user_id;
    let Send_Userid = Ticketdata[0].To_Email;
    console.log("Ticket View Toid", Send_Userid)
    setTosend_userid(empid)
    setprofileId(empid)
    setsubject(Subjects)
    setEmail_To(To_Emails)

    if (viewpage == '') {
      setViewpage(res.data.data)
    }
    let responce_CCemail = res.data.ccemail

    const ccEmailsArray = responce_CCemail.map(item => item.firstname);
    const CC_emailids = responce_CCemail.map(item => item.id);
    if (sendCC_emailid == '') {
      setsendCC_emailid(CC_emailids)
    }

    const formattedCCEmails = JSON.stringify(ccEmailsArray);
    if (CC_sendemail == '') {
      setCC_sendemail(ccEmailsArray)
    }

    const cleanedString = formattedCCEmails.replace(/[\[\]']+/g, '').trim();
    const emailArray = cleanedString.split(',');
    const trimmedEmailArray = emailArray.map(email => email.trim());
    const outputString = trimmedEmailArray.join(', ');

    const unquotedEmail = outputString.replace(/"/g, '');
    if (ccEmails == '') {
      setCCEmails(unquotedEmail)
    }


  })
  const [reply, setReply] = useState(false);
  const stateData = {
    tosend_useridvalues: tosend_userid,
    TicketViewid: id,
    TicketDetails: viewpage
  };
  const handleChating_app = () => {
    navigate(`/user/chat/ticket/${id}`, { state: stateData })
  }
  const handleclickApprove = () => {
    setReply(true)
  }
  const handleCancel = () => {
    setReply(false)
  };
  const [reply_status, setreply_status] = useState();
  const navigate = useNavigate();
  const handleReplyEmail = (response) => {
    try {
      const response1 = axios({
        method: "put",
        url: `http://localhost:5000/TicketReply_update/${id}`,
        data: { 'reply_status': response, 'To_Emails': Email_To, 'userid': profileId, 'CC_Emails': sendCC_emailid, 'Subject': subject },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {

        if (res.status == '200') {
          setReply(false)
          navigate("/user/ticket/Own")

        }

      })
    } catch (error) {

    }
  }
  const back_ticketview = () => {
    navigate(`/user/ticket/Own`)
  }
  const wordLimit = 5; // Set your desired word limit here

  return (
    <div className='TicketViewpage'>
      <div className="TicketViewHead">
        <h4 style={{ marginLeft: "40px", color: "white" }}>Ticket Details</h4>
        <ArrowBackIcon className="record_backicon" onClick={back_ticketview} ></ArrowBackIcon>
      </div>
      {viewpage.map((item, index) => {
        return <div className="container">

          {/* <label className="label_01">Name <span className='centerview1'> :</span>   <span className="value01">{'Vijay'}</span></label><br/><br/> */}
          <label className="label_01">To <span className='centerview1'> :</span>   <span className="value01">{item.firstname}</span></label><br /><br />
          <label className="label_01">CC <span className='centerview1'> :</span>   <span className="value01">{ccEmails}</span></label><br /><br />
          <label className="label_01">Subject <span className='centerview1'> :</span>   <span className="value01">{item.Subject}</span></label><br /><br />
          <label className="label_01">Message <span className='centerview1'> :</span>   <span className="value01">
          <WordLimitedText text={item.Message} wordLimit={wordLimit} />

          </span></label><br /><br />

        </div>
      })}
      {reply && (
        <SweetAlert
          input
          showCancel
          cancelBtnBsStyle="light"
          inputType="textarea"
          placeHolder="Write something"
          onConfirm={(response) => handleReplyEmail(response)}
          onCancel={handleCancel}
        >
          <div className='LevelHeading'>Reply Message:</div>
        </SweetAlert>
      )}
      <Button type='button' className='Reply-Btn' onClick={handleclickApprove}>Reply</Button>
      <Button type='button' className='chat-btn' onClick={handleChating_app}  >Chat</Button>
      {/* <div className="back-button">
      <Link to="/user/ticket" className="btn btn-primary">
        Back
      </Link>
    </div> */}
    </div>
  )
}

export default TicketsViewpage