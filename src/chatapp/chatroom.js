import React from "react";
import "./chatroom.css";
import userImg from "./Vijay_YNM.jpg";
import VinuImg from "./Vinu.jpg";
import Tlogo from "./Tickets_logos2.jpg";
import Jaya from "./jayaprakash.jpeg";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import classNames from "classnames"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import 'firebase/compat/firestore';
import { Link, Outlet, useNavigate, useParams,useLocation } from "react-router-dom";





function Chatroom(){
  const location = useLocation();
  
  const stateData = location.state;
  const navigate = useNavigate();

  const tosend_userid = stateData.tosend_useridvalues;
  let Profileid=sessionStorage.getItem("proid",Profileid)
  let TicketViewid = stateData.TicketViewid;
  console.log("Ticket Viewd Id Default loading data",TicketViewid)
  const TicketDetails =stateData.TicketDetails;
  let Subjects_show = TicketDetails[0].Subject;
  let toUser_name=TicketDetails[0].firstname;
  console.log("View User id ",TicketDetails)

const[message,setmessage]=useState([])

const [text, setText] = useState('');
const [chatBlocklist,setChatblocklist]=useState([])
const timestamp = firebase.firestore.Timestamp.now();
const [chatblock, setChatblock] = useState([]);
const [ticketChatList, setTicketChatList] = useState([]);
const [ticketid, setTicketid] = useState(TicketViewid);
const [sendTo_userid, setsendTo_userid] = useState(tosend_userid);
const [showsubject, setShowsubject] = useState(Subjects_show);
const [showTousername, setShowTousername] = useState(toUser_name);
useEffect(() => {
  setTicketid(TicketViewid)
  setsendTo_userid(tosend_userid)
  axios.get(`http://localhost:5000/chatTicket_list/${Profileid}/${limit}`)
    .then((res) => {
      const ticketChatList = res.data.data;
      setTicketChatList(ticketChatList);
      console.log("chatticket listing", ticketChatList);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, [Profileid]); 

useEffect(() => {

  if (ticketChatList.length > 0) {
    setChatblock(ticketChatList);
  }
}, [ticketChatList]);
const sendMessage = () => {
  const db = firebase.firestore();
const collectionName = 'Tickets';

const data = {
  text,
  createdAt: timestamp,
  userid:sendTo_userid,
  profileid:Profileid

};

const subcollectionName = 'subcollectionName'; 
  if (text.trim() !== '') {
    db.collection(collectionName).doc(ticketid).set(data)
    .then(() => {
     
  
      db.collection(collectionName).doc(ticketid).collection(subcollectionName).add(data)
        .then(() => {
        
        })
        .catch(error => {
        
        });
    })
    .catch(error => {
      console.error("Error writing main document: ", error);
    });
    setText(''); 
};
}
const [prevMessageDate, setPrevMessageDate] = useState(null);
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
};

useEffect(() => {
  
  const unsubscribe = firebase.firestore().collection('Tickets').doc(ticketid).collection('subcollectionName')
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setmessage(messages);
    });

  return () => unsubscribe();
}, []);
const chatblock_process=(id,Subject,firstname,To_Emailid)=>{
  setShowsubject(Subject)
  setsendTo_userid(To_Emailid)
  TicketViewid=id
  setTicketid(id)
  const getticdata = axios.get(`http://localhost:5000/ticketChat/${sendTo_userid}`).then(res => {
  const  myArray=('Data',res.data.data)
  console.log("get ticket data",myArray)
  let chatUsername = myArray[0].firstname;
  setShowTousername(chatUsername)
})
 const unsubscribe = firebase.firestore().collection('Tickets').doc(TicketViewid).collection('subcollectionName')
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setmessage(messages);
    });

  return () => unsubscribe();

}
const chatListItems = chatblock.map((item, index) => (
  <div className="chatItem" key={index}>
    <div className="imgbx">
      <img src={Tlogo} className="cover"  />
    </div>
    <div className="chatInfo">
      <p className="chatName" onClick={()=>chatblock_process(item.id,item.Subject,item.firstname,item.user_id)}>{item.Subject}</p>
     
      {/* <p className="lastMessage"></p> */}

      {/* <p className="time">5:49 PM</p> */}
    </div>
  </div>
));

let Limit_oflist=1;


let prevDate = null;
console.log("chatblock list",chatBlocklist)
const [limit, setLimit] = useState(2);
const loadMore = () => {
  setLimit((prevLimit) => prevLimit + 2);
};
useEffect(() => {
  Addmore_chatlist(limit);
}, [limit]);
const Addmore_chatlist=()=>{

  axios.get(`http://localhost:5000/chatTicket_list/${Profileid}/${limit}`)
  .then((res) => {
    const ticketChatList = res.data.data;
    setChatblock(ticketChatList);
    console.log("chatticket listing", ticketChatList);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}
const [username,setUsername]=useState();
useEffect(()=>{

})
    return(
      <div className="chatroom-container">
          <div className="left-side">
          <div className="header">
          <div className="backButton">
          <ArrowBackIcon className="backicon" />
          <div className="Ticket_header">
            <p>Tickets Chat</p>
            </div>
        </div>
            <div className="userImage">
              {/* <img src={userImg} className='profile_chatheader'/> */}
            </div>

          </div>

      
          <div className="search-chat">
            <div>
              <input type="text" placeholder="Search or start new chat" />
              <SearchIcon className="Search_icon"/>
            </div>
          </div>

          

          <div className="chatList">
          
          {chatListItems}
          
          <div>
        <Button className="addmore-chatitem" onClick={loadMore}>Add More<AddIcon/></Button>
        </div>
        </div>

          </div>

          <div className="right-side">
          <div className="chatHeader">
          <div className="userImage">
            <img src={Tlogo} className="cover" alt="Chat User" />
          </div>
          <div className="userInfo">
            <p className="chatName">{showsubject}</p>
            <p className="status">{showTousername}</p>
          </div>
        </div>
        <div className="chatMessages">
        {message.map((message, index) => {
  const messageDate = message.createdAt.toDate();
  const formattedDate = messageDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = messageDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });


  const showDate = prevDate !== formattedDate;
  
  prevDate = formattedDate;
  
  console.log("profileId",Profileid)
  console.log("TouserId",sendTo_userid)

  return (
    <React.Fragment key={index}>
            {showDate && <div className="messageDate">{formattedDate}</div>}
      <div
        key={index}
        className={`message ${ message.profileid === Profileid ? 'outgoing ' : 'incoming'}`}
      >
        <p>{message.text}</p>
        <span className="time">{formattedTime}</span>
      </div>
    </React.Fragment>
  );
})}

</div>

        
        <div className="messageInput">
          <input type="text"  value={text} onKeyDown={handleKeyPress} onChange={e => setText(e.target.value)} placeholder="Type a message..." />
          <SendIcon className="sendIcon"  onClick={sendMessage} />
        </div>

 
 
          

        
  
          </div>
          
      </div>
    )
}
export default Chatroom;