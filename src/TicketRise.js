import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Chip } from '@material-ui/core';
import axios from 'axios';
import "./TicketRise.css";
import { useNavigate ,useLocation} from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
function TicketRise() {
  const [to, setTo] = useState('');
  const [cc, setCC] = useState([]);
  const [ccInput, setCCInput] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmalert,setconfirmalert]=useState(false);
  const [recipients, setrecipients] = useState([]);
  const getUserdata = async (id,myArray) => {
    const data = await axios.get(`http://localhost:5000/ShowUsers_ticket`).then(res => {
     
        if(recipient==''){
            setrecipients(res.data.data)
        }
      
  })}


useEffect(()=>{
    getUserdata()
})
let Profileid=sessionStorage.getItem("proid",Profileid)
let ProfileEmailid=sessionStorage.getItem('Proemail',ProfileEmailid)
  // const handleAddCC = () => {
  //   if (ccInput.trim() !== '') {
  //     setCC([...cc, ccInput]);
  //     setCCInput('');
  //   }
  // };

  // const handleRemoveCC = (ccItem) => {
  //   setCC(cc.filter(item => item !== ccItem));
  //   if (ccInput === ccItem) {
  //     setCCInput('');
  //   }
  // };
  const handleAddCC = () => {
    if (ccInput.trim() !== '') {
      const selectedRecipient = recipients.find(option => option.id === ccInput);
      if (selectedRecipient) {
        setCC([...cc, selectedRecipient.id]);
        setCCInput('');
      }
    }
  };
  
  
  const handleRemoveCC = (ccItemId) => {
    setCC(cc.filter(item => item !== ccItemId));
    if (ccInput === ccItemId) {
      setCCInput('');
    }
  };
  
  const validateFields = () => {
    const errors = {};

    if (!to) {
      errors.to = 'To field is required.';
    }

    if (!subject) {
      errors.subject = 'Subject field is required.';
    }

    if (!message) {
      errors.message = 'Message field is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const navigate = useNavigate();
  let Notification_type='Ticket Raising'
  
  const handleSendEmail = () => {
    if (validateFields()) {
        setLoading(true)
    
        const data = { to, cc, subject, message,Profileid,ProfileEmailid,Notification_type};
        axios.post('http://localhost:5000/ShowUsers_ticket', data)
          .then(response => {
           
          
            if(response.data.status =='200'){
              setLoading(false)
              setconfirmalert(true)
            }
          })
          .catch(error => {
       
            alert('Error sending email. Please check the console for details.');
          });
      }
  };


  const recipient =recipients;

  const options = [
    { value: 'Privilege', label: 'Privilege' },
    { value: 'Sick', label: 'Sick' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Maternity', label: 'Maternity' },
    { value: 'Paternity', label: 'Paternity' },
    { value: 'Work From Home', label: 'Work From Home' },
  ];
  //   const handleCCInputChange = (e) => {
  //   const selectedCC = e.target.value;
  //   setCCInput(selectedCC);
  //   // Automatically add CC recipient when selected from the dropdown
  //   if (selectedCC.trim() !== '' && !cc.includes(selectedCC)) {
  //     setCC([...cc, selectedCC]);
  //   }
  // };
  const handleCCInputChange = (e) => {
    const selectedCCId = e.target.value;
    setCCInput(selectedCCId.toString()); 
    if (selectedCCId !== '' && !cc.includes(selectedCCId)) {
      setCC([...cc, selectedCCId]);
    }
  };
  
  
  const hideAlert=()=>{
    setconfirmalert(false)
    navigate("/user/ticket/Own")
  }
  const [Loading,setLoading]=useState(false);
  return (
    <div>{Loading ?(<div animation="border"  className="loader_ticketRaise"/>):(

    
    <div className='Ticket-Rise'>
    <div >
    <h2 className='Ticket-heading'>Tickets</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="to">To</InputLabel>
        <Select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          inputProps={{ id: 'to' }}
        >
          {recipient.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.firstname} ({option.email})
            </MenuItem>
          ))}
     
        </Select>
        {errors.to && <span style={{ color: 'red' }}>{errors.to}</span>}
      </FormControl>

      <div style={{ marginTop: '20px' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="cc">CC</InputLabel>
          <Select
            value={ccInput}
            onChange={handleCCInputChange}
            inputProps={{ id: 'cc' }}
          >
             {recipient.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.firstname} ({option.email})
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <div>
  {cc.map(ccItem => {
    const selectedCCRecipient = recipients.find(option => option.id === ccItem);
    if (selectedCCRecipient) {
      return (
        <div key={ccItem}>
          <Chip
            label={`${selectedCCRecipient.firstname}`}
            onDelete={() => handleRemoveCC(ccItem)}
            style={{ margin: '5px' }}
          />
        </div>
      );
    }
    return null;
  })}
</div>
      </div>

      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        fullWidth
        margin="normal"
      />
       {errors.subject && <span style={{ color: 'red' }}>{errors.subject}</span>}
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
       {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSendEmail}
        className='Sending_ticketbtn'
      >
        Send
      </Button>
    </div>
 
{confirmalert ?<SweetAlert
  success
  title="Successfully Sending Your Request!"
  onConfirm={hideAlert}
>

</SweetAlert>:<></> }
    </div>)}
    </div>
  );
}

export default TicketRise;
