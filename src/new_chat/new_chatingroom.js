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
import { db, auth, storage } from "../firebase";
import Message from "./Message";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Attachment from "./Attachment";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Upload } from "@mui/icons-material";
import User from "./User"; 
import MessageForm from "./MessageForm";
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
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    // setsendTo_userid(tosend_userid)
    let activeStatus='Active';
    let currentlyActive_user=sessionStorage.getItem('proid')
    axios.get(`http://localhost:5000/Chating_employeelist`)
      .then((res) => {
        const ticketChatList = res.data.data;


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
  const [users, setUsers] = useState([]);
  // const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt","desc"));
    // const q = query(usersRef, where("uid", "!=", user1));
//   const q = query(usersRef, where("uid", "not-in", [user1]));

    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      // setUsers(users);

    });
    return () => unsub();
  }, []);
  const sendMessage = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const user1 = auth.currentUser.uid;
  
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  
    // ----Images Upload ChatMessages----
  
    let upurl = ""; // Initialize upurl to an empty string
  
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
      const snap = await uploadBytes(imgRef, img);
  
      try {
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        upurl = dlUrl;
      } catch (error) {
        console.error("Error getting download URL:", error);
        // Handle the error appropriately (e.g., show a message to the user)
      }
    }
    if (text.trim() !== '') {
    try {
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: upurl || "",
      });
  
      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: upurl || "",
        unread: true,
      });
      // await updateDoc(doc(db, "users", user2), {createdAt: Timestamp.fromDate(new Date()),
      // });

      setText('');
      setImg('');
    } catch (error) {
      console.error("Error adding document:", error);
      // Handle the error appropriately (e.g., show a message to the user)
    }
  }
  };
  


// const chatListItems = searchInput
//   ? searchResults.map((item, index) => (
//     <div className="chatItem" key={index}>
//     <div className="imgbx">
//       <img src={"http://localhost:5000/images/"+ item.id}  className="cover"  />
//     </div>
//     <div className="chatInfo">
//       <p className="chatName" onClick={()=>selectUserchat(item.id,item.firstname)}>{item.firstname}</p>
//     </div>
//   </div>
  
//     )): chatblock.map((item, index) => (
//     <div className="chatItem" key={index}>
//     <div className="imgbx">
//       <img src={"http://localhost:5000/images/"+ item.id}  className="cover"  />
//     </div>
//     <div className="chatInfo">
//       <p className="chatName" onClick={()=>selectUserchat(item.id,item.firstname)}>{item.firstname}</p>
//       </div>
//   </div>
//     ));
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
const [selectedChatMessages, setSelectedChatMessages] = useState([]);
const [img,setImg]=useState("");
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
const [chat_active,setChatactive]=useState();
const [chat,setChat]=useState('');
const [curtactUser,setCurtactUser]=useState();

const user1 = auth.currentUser ? auth.currentUser.uid : null;
// useEffect(() => {
//   const usersRef = collection(db, "users");
//   // create query object
//   const q = query(usersRef, where("uid", "not-in", [user1]));
//   // execute query
//   const unsub = onSnapshot(q, (querySnapshot) => {
//     let users = [];
//     querySnapshot.forEach((doc) => {
//       users.push(doc.data());
//     });
//     setUsers(users);
//   });
//   return () => unsub();
// }, []);

const selectUser = async(user) => {
  setChat(user)
  setdefault_loading(true)
  setChatuser_name(user.newfirstname);
  const user2 = user.uid;
  setCurtactUser(user1)
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  const msgsRef = collection(db, "messages", id, "chat");
  const q = query(msgsRef, orderBy("createdAt", "asc"));
  onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
};

let prevDate = null;  
const [searchInput, setSearchInput] = useState('');
const [searchResults, setSearchResults] = useState([]);
// const handleSearch = (query) => {
//   setSearchInput(query);

//   // Perform search logic (e.g., filter chatblock based on the query)
 
//   const filteredData = query ?users.filter(item => item.newfirstname.toLowerCase().includes(query.toLowerCase())):users;
//   setUsers(filteredData)
// };
  console.log("filter searchInput",searchInput)

const [activeUser, setActiveUser] = useState(null);


const [combinedData, setCombinedData] = useState([]);

useEffect(() => {
  const collection1Ref = collection(db, 'users');
  const collection2Ref = collection(db, 'lastMsg');

  const unsub1 = onSnapshot(collection1Ref, (querySnapshot1) => {
    const dataFromCollection1 = querySnapshot1.docs.map((doc) => doc.data());

    const unsub2 = onSnapshot(collection2Ref, (querySnapshot2) => {
      const dataFromCollection2 = querySnapshot2.docs.map((doc) => doc.data());

      // Combine data based on some condition
      
      const combinedData = mergeCollections(dataFromCollection1, dataFromCollection2);
      console.log("combined two user and lastmeg colloection printed is",combinedData)

      setUsers(combinedData);
      
    });

    return () => unsub2();
  });

  return () => unsub1();
}, []);

// Example function to merge data based on a condition
const mergeCollections = (collection1Data, collection2Data) => {
  // Your merging logic here, e.g., combining data based on some condition
  // For example, assuming there is a common field 'id' in both collections
  const mergedData = collection1Data.map((item1) => {
    const matchingItem = collection2Data.find((item2) => item2.from === item1.uid || item2.to === item1.uid);
    return { ...item1, ...matchingItem };
  });
  return mergedData;
};


return(
    <div className="home_container">
    <div className="users_container">
    <div className="leftside_heading">
      <p>Chat</p>

      </div>
      <div className="search-chat1">
      <input
      type="text"
      placeholder="Search or start new chat"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
              {/* <SearchIcon className="Search_icon"/> */}
            
          </div>
    {users.filter((item)=>{
      return searchInput.toLowerCase()===''? item:item.newfirstname.toLowerCase().includes(searchInput)
    }).map(user =><User 
    key={user.uid}
    user={user} 
    selectUser={selectUser} 
    chat={chat}
    user1={user1}


    /> )}

    </div>
    <div className="messages_container">
      {chat ? (
        <>
         <div className="messages_user">
            <img src={chat.imageUrl} />
            <p>{chat.newfirstname}</p>
            <small>{chat.isOnline ?'Online':'Offline'}</small>

        
          </div>

           <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              sendMessage={sendMessage}
              text={text}
              setText={setText}
              setImg={setImg}
            />
        
        
        </>
       
         

      ) : (
        <h3 className="no_conv">Select a user to start conversation</h3>
      )}
    </div>
  </div>
  )}


export default ChatingApp;  
















    