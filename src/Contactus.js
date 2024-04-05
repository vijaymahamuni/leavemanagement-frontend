import React, { useRef ,useState,useEffect} from "react";
import emailjs from "@emailjs/browser";
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';
import "./Contactus.css";
import picture from './images/Contcat_img.jpg';
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "react-bootstrap/Button";
export default function Contactus() {
  const [Name, setName] = useState('');
  const [newName,setnewName]=useState('');
  const [mainName,setmainName]=useState('');
  const [Edit,setEdit]=useState('');
  const [Email, setEmail] = useState('');
  const [Msg, setMsg] = useState('');
  const [Subject, setSubject] = useState('');
  const [id, setid] = useState('');
  const [flag,setflag]=useState('');
  const [updateName,setupdateName]=useState('');
  const [Email_List,setEmail_List]=useState([{From_email:"",new_name:""}]);
  const [name_List,setname_List]=useState([{From_email:""}]);
  const [ticketList,setticketList]=useState([{From_email:"",newName:""}]);
  const [addNewname,setaddNewname]=useState('');
  const [emaildata_id,setemaildata_id]=useState('')

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
 
          alert("Email Sent Successfully")
        },
        (error) => {

        }
      );
     
  };
  const Reset=()=>{
    setName('');
    setEmail('');
    setSubject('');
    setMsg('');
    setEmail_List([{From_email:""}]);

  }
  const myStyle={
    backgroundImage: `url(${picture})`,
    marginTop:'65px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
const Update_ticket=async(e)=>{
  e.preventDefault();
  await axios.put(`http://localhost:5000/updateTicket/${id}`, [{
    id,
    emaildata_id,
    Name,
    Subject,
    Msg,
    Email_List,
    updateName,
    SelectRemoveid
}],).then(res => {

    alert(res.data.msg);
    if (res.data.status == 200) {
      navigate("/user/contact");
      }
  }
  )
}
const Handle_email=(e)=>{
  e.preventDefault();
  try {
  const response = axios({
      method: "post",
      url: `http://localhost:5000/ticketList`,
      data: {'name':name,'email': ticketList,'subject':subject,'Message':msg,'mainName':mainName},
      headers: { 'Content-Type': 'application/json'},

    }).then(res=> {
     
      const msg=res.data;
      const emailDataticket=res.data.tickets
  
      if (res.data.status == 200) {
        alert("Adding Tickets Successfully!")
        navigate("/user/contact");
     }
 })
} catch (error) {

  }
}

const handleAddEmail=()=>{
  setEmail_List([...Email_List,{From_email:""}]);
  setticketList([...ticketList,{From_email:""}]);
  setIsEmailDisabled(false);
}
const addingTickets=()=>{
  setticketList([...ticketList,{From_email:""}]);
}
const limit_of_name=Email_List.length;
const [SelectRemoveid,setSelectRemoveid]=useState('')
const ticketadduser=(index)=>{
  const List=[...Email_List];
  List.splice(index,1);
  setticketList(List)
}
const handleRemoveEmail=(index,e)=>{
  let final_index=[index]
  const idValues=mainValue
  const SelectedRemoveid = final_index.map(i => idValues[i]);
  setSelectRemoveid(SelectedRemoveid)
  const List=[...Email_List];
  List.splice(index,1);
  setEmail_List(List)

}
const removeEmail_data=(index)=>{
 const List=[...ticketList];
 List.splice(index,1);
 setticketList(List)
}

const handleservicechange=(e,index)=>{
  const {name,value}=e.target;
  const List=[...Email_List];
  List[index][name]=value;
  setEmail_List(List)
  setticketList(List)

}
const handleAddservice=(e,index)=>{
  const {name,value}=e.target;
  const List=[...ticketList];
  List[index][name]=value;
  setticketList(List)

}
const handleAddname=(e,index)=>{
  const {name,value}=e.target;
  const List=[...Email_List];
  List[index][name]=value;
  setnewName(List)
}

const getUserdata = async (id,myArray) => {
  const data = await axios.get(`http://localhost:5000/ticketList`).then(res => {
})

}
const handleSetfield = ()=> {
  const main_email=sessionStorage.getItem('Email_id')
  const str =main_email;
  const parts = str.split(",")

  const arr=[]
  let i
  for (i in parts){
      const key={"From_email":parts[i]}
      
      arr.push(key)
      
  }
  const new_array=arr




}
useEffect(() => {
  getUserdata();
}, [])
const [mainValue,setmainValue]=useState('')
useEffect(()=>{
  setEdit(sessionStorage.getItem('Edit'))
  setupdateName(sessionStorage.getItem('name'))
  setSubject(sessionStorage.getItem('subject'))
  setMsg(sessionStorage.getItem('message'))
  setemaildata_id(sessionStorage.getItem('email_data'))
  setflag(sessionStorage.getItem('flag'))
  const edit_newname=sessionStorage.getItem('addname')
  let main_email=sessionStorage.getItem('Email_id')

  if (main_email===null){
    main_email='viaysethu0101@gmail.com'
  }
  else{
    main_email=main_email
  }
 
  const str =main_email;
  const parts = str.split(",")

  const newData=sessionStorage.getItem('email_data')
  let myArray = newData.split(",");

  setmainValue(myArray)
  const nameArray = edit_newname.split(',');

  const arr=[]
  let i
  let j

  for (let i = 0; i < parts.length && i < nameArray.length; i++) {
    const key={"From_email":parts[i],"newName":nameArray[i]}
    arr.push(key)
  }
  

  setEmail_List(arr);
  setIsEmailDisabled(true);
  setid(sessionStorage.getItem('id'))
},[])


const[name,setname]=useState('');
const[msg,setmsg]=useState('')
const[email,setemail]=useState('')
const[subject,setsubject]=useState('')
const navigate = useNavigate();
const [refresh, setRefresh] = useState(false);

const [isEmailDisabled, setIsEmailDisabled] = useState(true);
const [trailid,settrailid]=useState('')
const location = useLocation();

return (
    <div>
    <div style={myStyle} className='Contact_Style'>
   
      <div className="controlContact">
    <form>
   
      {Edit=="new"?(<h2 className='head_contact'>Tickets</h2>):
      (<h2 className='head_contact'>Update Tickets</h2>)}
      <div className='body_con'>
    {Edit =="new" ?(<input   v-model='name'  className="name_control" placeholder='Name'  name="newName"
       onChange={event => setmainName(event.target.value)}
       value={mainName}
        required />):(<input   v-model='name'  className="name_control" placeholder='Name'  name="newName"
        onChange={event => setupdateName(event.target.value)}
        value={updateName}
       required />)}
    {Edit=="new" ? (
      <div>
      {ticketList.map((singleService,index) => (
    <div key={index}>
      {index==0 ? null: (<input   v-model='name'  className="name_control" placeholder='Name'  name="newName"
         onChange={(e) => handleAddservice(e,index)}
         value={singleService.newName} 
        required />)}
       
      <MDBValidationItem invalid feedback='Please provide your email.'>
        <input type='email' placeholder='Email' v-model='email' className="form-control"name="From_email"
        value={singleService.From_email}
        onChange={(e) => handleAddservice(e,index)}
        required />
      </MDBValidationItem>
    {ticketList.length -1 ===index  && 
      (
      <Button type='button' color='primary' block className="AddTicket" onClick={addingTickets}>
        Add
      </Button>
      )}
      
    
      {ticketList.length >1 &&  (
        
          <Button type='button' color='primary' block className="remove" value="button-value" onClick={()=>removeEmail_data(index)}>
        Remove
      </Button>

      )}
      

    </div>

   ))}
    </div>):(<div>
        {Email_List.map((singleService,index) => (
      <div key={index}>
        {index==0 ? null: (<input   v-model='name' className="name_control" placeholder='Name'  name="newName"
           onChange={(e) => handleAddname(e,index)}
           value={singleService.newName} 
          required />)}
         
        <MDBValidationItem invalid feedback='Please provide your email.'>
          <input type='email' placeholder='Email' v-model='email' className="form-control"  name="From_email"
          value={singleService.From_email}
          onChange={(e) => handleservicechange(e,index)}
         disabled={isEmailDisabled}
          
           required />
      </MDBValidationItem>
      {Email_List.length -1 ===index  && 
        (
        <Button type='button' color='primary' block className="Addmore" onClick={handleAddEmail}>
          Add
        </Button>
        )}
        {Email_List.length >1 &&  (
          
            <Button type='button' color='primary' block className="remove" value="button-value" onClick={()=>handleRemoveEmail(index)}>
          Remove
        </Button>
  
        )}
      </div>
      ))}
      </div>)}
      {Edit=="new" ?(<div>
        <MDBValidationItem invalid feedback='Please provide mail subject.'>
        <input placeholder='Subject' v-model='subject' className=" subject_control" name="from_name"
        onChange={event => setsubject(event.target.value)}
        value={subject}
        required />
      </MDBValidationItem>

      </div>):(<div>
        <MDBValidationItem invalid feedback='Please provide mail subject.'>
        <input placeholder='Subject' v-model='subject' className=" subject_control" name="from_name"
        onChange={event => setSubject(event.target.value)}
        value={Subject}
        required />
      </MDBValidationItem>
      </div>)}
     {Edit == "new"?(<div>
      <textarea  className="Message_area" placeholder='Message'  name="message" 
onChange={event => setmsg(event.target.value)}
value={msg}
 />
     </div>):(<textarea  className="Message_area" placeholder='Message'  name="message" 
onChange={event => setMsg(event.target.value)}
value={Msg}
 />)}
{Edit=="new" ? (<div><Button type='submit' color='primary' block className='Submit_tic' onClick={Handle_email} >
        Submit
      </Button></div>):(<div><Button type='submit' color='primary' block className='Update_tic' onClick={Update_ticket} >
        
        Update
      </Button></div>)}
      <Button type='submit' color='primary' block className="reset_tic" onClick={Reset} >
        Reset
      </Button>
      </div>
  </form>
  </div>
  </div>
  </div>
  );
}