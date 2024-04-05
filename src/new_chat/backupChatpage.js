import React from "react";
import "./newChat.css";
import userImg from "./Vijay_YNM.jpg";
import VinuImg from "./Vinu.jpg";
import Tlogo from "./Vijay_logo.jpg";
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
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, Outlet, useNavigate, useParams,useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import defaultchatRoomimg from "./default_chtappimg2.png";
import Tigmalog from "./TigmaVj.jpg";
import DotButton from "./DotButton ";

function ChatingApp(){
  let Profileid=sessionStorage.getItem("proid",Profileid)
  const generatedID = uuidv4();
  var ChatViewid=Profileid;
  // let tosend_userid='10';
  
  var Docu_ChatViewid;

  const[message,setmessage]=useState([])
  const [text, setText] = useState('');
  const [chatBlocklist,setChatblocklist]=useState([])
  const timestamp = firebase.firestore.Timestamp.now();
  const [chatblock, setChatblock] = useState([]);
  const [ticketChatList, setTicketChatList] = useState([]);
  const [sendTo_userid, setsendTo_userid] = useState('');
  const [default_loading, setdefault_loading] = useState(false);
  const [now_activeuser,setNow_activeuser]=useState([]);

  useEffect(() => {
    // setsendTo_userid(tosend_userid)
    let activeStatus='Active';
    let currentlyActive_user=sessionStorage.getItem('proid')
    axios.get(`http://localhost:5000/Chating_employeelist`)
      .then((res) => {
        const ticketChatList = res.data.data;
        console.log("Active status user:", ticketChatList);


        setTicketChatList(ticketChatList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      // axios.put(`http://localhost:5000/chatActive_update/${Profileid}/${activeStatus}` )
    }, []); 
  
  useEffect(() => {
  if (ticketChatList.length > 0) {
      setChatblock(ticketChatList);
    }
  }, [ticketChatList]);

  const [existingConversations, setExistingConversations] = useState([]);
  const [newUserChatID, setNewUserChatID] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const sendMessage = () => {
    const db = firebase.firestore();
    const collectionName = 'chats';
    const subcollectionName = 'SubChat';
    const data = {
      text,
      createdAt: timestamp,
      from_uid: Profileid,
      to_uid: sendmsgId,
    };
  
    if (text.trim() !== '') {
      // Use newUserChatID after it's set in the condition
      const mainDocRef = db.collection(collectionName).doc(newUserChatID);
  
      mainDocRef
        .set(data)
        .then(() => {
          // Once the main document is successfully updated, add the message to the subcollection
          mainDocRef
            .collection(subcollectionName)
            .add(data)
            .then(() => {
              // Message sent successfully
            })
            .catch((error) => {
              // Handle error
            });
        })
        .catch((error) => {
          console.error('Error writing main document: ', error);
        });
  
      setText('');
  
      // To immediately update the message state, you can manually add the sent message to the message state.
      setmessage((prevMessages) => [...prevMessages, data]);
    }
  };
  


const chatListItems = searchInput
  ? searchResults.map((item, index) => (
    <div className="chatItem" key={index}>
    <div className="imgbx">
      <img src={"http://localhost:5000/images/"+ item.id}  className="cover"  />
    </div>
    <div className="chatInfo">
      <p className="chatName" onClick={()=>chatblock_process(item.id,item.firstname)}>{item.firstname}</p>
    </div>
  </div>
  
    )): chatblock.map((item, index) => (
    <div className="chatItem" key={index}>
    <div className="imgbx">
      <img src={"http://localhost:5000/images/"+ item.id}  className="cover"  />
    </div>
    <div className="chatInfo">
      <p className="chatName" onClick={()=>chatblock_process(item.id,item.firstname)}>{item.firstname}</p>
      </div>
  </div>
    ));
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
const [selectedChatMessages, setSelectedChatMessages] = useState([]);

useEffect(() => {
  const unsubscribe =firebase.firestore().collection('chats')
  .orderBy('createdAt')
  .get()
  .then((querySnapshot) => {
    const allChats = [];
    querySnapshot.forEach((doc) => {
      allChats.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setmessage(allChats);
    setExistingConversations(allChats)
    
  })
  .catch((error) => {
    console.error('Error getting documents: ', error);
  });
  
  }, []);


let Profilename=sessionStorage.getItem("profileName",Profilename);

const [ticketid, setTicketid] = useState(ChatViewid);
const [chatuser_name,setChatuser_name] = useState(Profilename);
const [sendmsgId,setSendmsgId ] = useState('');
const [chat_active,setChatactive]=useState()
const chatblock_process = (id, firstname,chatActive) => {
  // Update state variables directly
  setdefault_loading(true)
  setChatuser_name(firstname);
  setActiveUser(id);
  setChatactive(chatActive)
  const convtStrId = id.toString();
  setSendmsgId(convtStrId);

  const existingChat = existingConversations.find(
    (chat) =>
      (chat.from_uid === Profileid && chat.to_uid === convtStrId) ||
      (chat.from_uid === convtStrId && chat.to_uid === Profileid)
  );

  // Initialize newUserChatID with the existing chat ID or a new one
  const newUserChatID = existingChat ? existingChat.id : uuidv4();
  setNewUserChatID(newUserChatID);

  setsendTo_userid(convtStrId);

  const duplicate_docid = id.toString();
  setTicketid(duplicate_docid);

  // Fetch and display messages for the selected chat
  fetchMessagesForChat(newUserChatID);
};

const fetchMessagesForChat = (chatID) => {
  const unsubscribe = firebase.firestore().collection('chats').doc(chatID).collection('SubChat')
  .orderBy('createdAt')
  .onSnapshot(snapshot => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setmessage(messages);
  });

return () => unsubscribe();
};

let prevDate = null;  
const [searchInput, setSearchInput] = useState('');
const [searchResults, setSearchResults] = useState([]);
const handleSearch = (query) => {
  setSearchInput(query);

  // Perform search logic (e.g., filter chatblock based on the query)
  const results = chatblock.filter((item) =>
    item.firstname.toLowerCase().includes(query.toLowerCase())
  );
  setSearchResults(results);
};

const [activeUser, setActiveUser] = useState(null);

function formatDate(formattedDate) {



}
  return(
    <div className="chatroom-container">
          <div className="left-side">
          <div className="header">
         
          <div className="backButton">
          <ArrowBackIcon className="backicon" />
          <div className="chat_heading">
            <p>Chat</p>
            </div>
        </div>
           

          </div>

      
          <div className="search-chat">
            <div>
              <input
      type="text"
      placeholder="Search or start new chat"
      value={searchInput}
      onChange={(e) => handleSearch(e.target.value)}
    />
              <SearchIcon className="Search_icon"/>
            </div>
          </div>

          

          <div className="chatList">
          {ticketChatList
            .filter(item =>
              item.firstname.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((item, index) => (
                   <div
      className={classNames("chatItem", { active: item.id === activeUser })}
      key={index}
      onClick={() => chatblock_process(item.id, item.firstname,item.chatActive)}
    >
                <div className="imgbx">
                  <img src={`http://localhost:5000/images/${item.id}`} className="cover" alt={`Profile of ${item.firstname}`} />
                </div>
                <div className="chatInfo">
                  <p className="chatName" >{item.firstname}</p>
                  {/* <p className="lastMsg_side" >Hi</p>s */}

                  {/* <DotButton active={isActive} /> */}

                </div>
                <div key={index} className="activeDot">
          {item.chatActive === 'Active' ? (<DotButton active={isActive} />):(<></>)}
        </div>
         
                

              </div>
            ))}
            
        </div>

          </div>
         {default_loading ?(<>

          <div className="right-side">
          <div className="chatHeader">
          <div className="userImage">
            <img src={"http://localhost:5000/images/"+ ticketid}  className="cover" alt="Chat User" />
          </div>
          <div className="userInfo">
            <p className="chatName">{chatuser_name}</p>
            <p className="status">{chat_active}</p>
          </div>
        </div>


        <div className="chatMessages">
  {message.map((message, index) => {
    const messageDate = message.createdAt.toDate();
    const formattedDate = messageDate.toLocaleDateString('en-US', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit',
 
    });

    const date1 = new Date(formattedDate);
    const today = new Date();
    const formatDate = (date) => {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };
    const getDayName = (date) => {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return dayNames[date.getDay()];
    };
    // const formattedDate1 = formatDate(date1);
    // const formattedDate2 = formatDate(today);
    let comparisonResult;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date1 >= oneWeekAgo) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date1.toDateString() === today.toDateString()) {
        comparisonResult = 'Today';
      } else {
        const dayName = getDayName(date1);
        const formattedDate = formatDate(date1);
        comparisonResult = `${dayName}`;
      }
    } else {
      comparisonResult = `${formattedDate}`;
    }

  
    console.log("Changed date format for demo printed", comparisonResult);

    
    
    
    const formattedTime = messageDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const lowercaseTime = formattedTime.replace(/\s/g, '').toLowerCase();
    const showDate = prevDate !== formattedDate;
    prevDate = formattedDate;

    

    const isSentByCurrentUser = message.from_uid === Profileid && message.to_uid === sendTo_userid;
    const isReceivedByCurrentUser = message.from_uid === sendTo_userid && message.to_uid === Profileid;
 


                                                 //  8===8 && 10===10
    if (isSentByCurrentUser || isReceivedByCurrentUser) {
      return (
        <React.Fragment key={index}>
          {showDate && <p className="messageDate_show">{comparisonResult}</p>}
          <div
            key={index}
            className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}
          >
 <p className="chat_msgstl">
      {message.text}
      <span className="chating_time">{lowercaseTime}</span>
    </p>
          </div>
        </React.Fragment>
      );
    }
  })}
</div>



        
<div className="messageInput">
          <input type="text"  value={text} onKeyDown={handleKeyPress} onChange={e => setText(e.target.value)} placeholder="Type a message..." />
          <SendIcon className="sendIcon"  onClick={sendMessage} />
</div>
         
</div> 
         
         </>):(<>
         
          <div className="chatRoom_loadingimg">
  <div>
  <img src={defaultchatRoomimg} className="imgdeafult-chat"/>
 </div>
 {/* <div>
  <img src={Tigmalog} className="imgdeafult-logo"/>
 </div> */}
  <div class="company-info">
    <h2>Welcome to Tigma Technology Chat</h2>
</div>
</div>
         
         </>)}
         

</div>
  )
}
export default ChatingApp;
  