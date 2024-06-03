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
import _ from 'lodash';
import firebase from 'firebase/compat/app';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import 'firebase/compat/firestore';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import defaultchatRoomimg from "./default_chtappimg2.png";
import Tigmalog from "./TigmaVj.jpg";
import DotButton from "./DotButton ";
import { db, auth, storage } from "../firebase";
import Message from "./Message";
import CancelIcon from '@mui/icons-material/Cancel';
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
  limit,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import Attachment from "./Attachment";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Upload } from "@mui/icons-material";
import User from "./User";
import MessageForm from "./MessageForm";
function ChatingApp() {
  let Profileid = sessionStorage.getItem("proid", Profileid)
  const generatedID = uuidv4();
  const [text, setText] = useState('');
  const timestamp = firebase.firestore.Timestamp.now();
  const [chatblock, setChatblock] = useState([]);
  const [ticketChatList, setTicketChatList] = useState([]);
  const [default_loading, setDefaultLoading] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [display, setDisplay] = React.useState([]);
  const [showSeltimg, setShowSeltimg] = useState(false);
  const [existingConversations, setExistingConversations] = useState([]);
  const [chatbox_users, setNewUserChatID] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatuser_name, setChatUserName] = useState(Profilename);
  const [chat, setChat] = useState('');
  const [curtactUser, setCurTactUser] = useState();
  const [img, setImg] = useState("");
  const [isOnline, setIsOnline] = useState();
  const [searchInput, setSearchInput] = useState('');
  const [activeUser, setActiveUser] = useState();
  const [initialOrder, setInitialOrder] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [curSelectuser, setCurSelectUser] = useState(null);
  useEffect(() => {
    // setsendTo_userid(tosend_userid)
    let currentlyActive_user = sessionStorage.getItem('proid')
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


  // const user1 = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt", "desc"));
    // const q = query(usersRef, where("uid", "!=", user1));
    //   const q = query(usersRef, where("uid", "not-in", [user1]));

    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setActiveUser(users);
      console.log("setActiveUser", users)
      setUpdateData(users)

    });
    return () => unsub();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    setShowSeltimg(false); // Example action: removing the image

    const user2 = chat.uid;
    const user1 = auth.currentUser.uid;
    let lastmsg_img = 'photo';

    // Determine the chat ID based on user IDs
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log("Selecting user", id);

    // Initialize upurl to an empty string
    let upurl = "";

    // Check if an image is selected for upload
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
      try {
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        upurl = dlUrl;
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    }

    // Get the online status of the selected user
    const UpdatedisOnline = getOnlineStatus(curSelectuser);
    console.log("UpdatedisOnline", UpdatedisOnline);

    try {
      if (text.trim() !== '') {
        // If there's text, add the message with text
        await addDoc(collection(db, "messages", id, "chat"), {
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: upurl || "",
          read: false,
          activeStatus: UpdatedisOnline
        });
        setText(''); // Clear the text input
        setImg(''); 
        await setDoc(doc(db, "lastMsg", id), {
          text,
          from: user1,
          to: user2,
          lastmsg_time: Timestamp.fromDate(new Date()),
          media: upurl || "",
          unread: true,
        });
      } else {
        // If there's no text, add the message without text
        await addDoc(collection(db, "messages", id, "chat"), {
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: upurl || "",
          read: false,
          activeStatus: UpdatedisOnline
        });
        setText(''); // Clear the text input
        setImg('');  
        await setDoc(doc(db, "lastMsg", id), {
          text: lastmsg_img,
          from: user1,
          to: user2,
          lastmsg_time: Timestamp.fromDate(new Date()),
          media: upurl || "",
          unread: true,
        });
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  let Profilename = sessionStorage.getItem("profileName", Profilename);



  const user1 = auth.currentUser ? auth.currentUser.uid : null;

  const getOnlineStatus = (uid) => {
    const user = activeUser.find(user => user.uid === uid);
    console.log("get user online or not", user)
    return user ? user.isOnline : null;
  };

  const selectUser = async (user) => {
    const user1 = auth.currentUser.uid;
    const user2 = user.uid;

    // Set initial states
    setCurSelectUser( user.uid);
    setChat(user);
    setDefaultLoading(true);
    setChatUserName(user.newfirstname);
    setCurTactUser(user1);

    // Get online status
    const isOnline = await getOnlineStatus(user2);
    setIsOnline(isOnline);

    // Generate chat ID based on user IDs
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log("read messages: usersid", id);

    setNewUserChatID();

    // Get reference to messages collection
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    // Subscribe to changes in the chat messages
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let msgs = [];
      let promises = [];

      querySnapshot.forEach((docSnapshot) => {
        const msgData = docSnapshot.data();
        // msgData.activeStatus = isOnline ? true : msgData.activeStatus;

        // if (isOnline) {
        //   const docRef = doc(msgsRef, docSnapshot.id);
        //   promises.push(updateDoc(docRef, { activeStatus: true }));
        // }

        msgs.push(msgData);
      });

      //       if (isOnline) {
      //           const docRef = doc(msgsRef, docSnapshot.id);
      //           promises.push(updateDoc(docRef, { activeStatus: true}));
      //           msgs.push(msgData);
      //       } else {
      //           // If offline, just add msgData to msgs
      //           msgs.push(msgData);
      //       }
      // Wait for all updateDoc operations to complete
      await Promise.all(promises);

      setMsgs(msgs);
    });

    // Get the last message document and update unread status if needed
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });

      // Update all messages in the chat to read: true
      const msgDocs = await getDocs(msgsRef);
      msgDocs.forEach(async (msgDoc) => {
        await updateDoc(doc(db, "messages", id, "chat", msgDoc.id), { read: true });
      });
    }

    // Return the unsubscribe function to clean up the listener
    return unsubscribe;
  };


  let prevDate = null;





  useEffect(() => {
    const collection1Ref = collection(db, 'users');
    const collection2Ref = collection(db, 'lastMsg');

    const unsub1 = onSnapshot(collection1Ref, (querySnapshot1) => {
      const dataFromCollection1 = querySnapshot1.docs.map((doc) => doc.data());

      const unsub2 = onSnapshot(collection2Ref, (querySnapshot2) => {
        const dataFromCollection2 = querySnapshot2.docs.map((doc) => doc.data());

        const combinedData = mergeCollections(dataFromCollection1, dataFromCollection2);


        setUsers(combinedData);
      });

      return () => unsub2();
    });

    return () => unsub1();
  }, []);

  const mergeCollections = (collection1Data, collection2Data) => {

    const mergedData = collection1Data.map((item1) => {
      const matchingItem = collection2Data.find((item2) => item2.from === item1.uid || item2.to === item1.uid);
      return { ...item1, ...matchingItem };
    });
    return mergedData;
  };
  let filteredUsers = users.filter(user => user.uid !== user1);

  useEffect(() => {
    if (users && users.length > 0) {
      setInitialOrder([...users]);
    }
  }, [users]);




  // If there are users available, apply sorting
  if (filteredUsers.length > 0) {
    filteredUsers = filteredUsers.sort((a, b) => {
      const timeA = a.lastmsg_time ? (a.lastmsg_time.seconds * 1000 + (a.lastmsg_time.nanoseconds || 0) / 1000000) : 0;
      const timeB = b.lastmsg_time ? (b.lastmsg_time.seconds * 1000 + (b.lastmsg_time.nanoseconds || 0) / 1000000) : 0;

      // If last message times are the same, maintain the initial order
      if (timeA === timeB && initialOrder.length > 0) {
        const indexA = initialOrder.findIndex(user => user.uid === a.uid);
        const indexB = initialOrder.findIndex(user => user.uid === b.uid);
        return indexA - indexB;
      }

      return timeB - timeA;
    });
  }

  filteredUsers = filteredUsers.filter(user => {
    return searchInput.toLowerCase() === ''
      ? true
      : (user.newfirstname || '').toLowerCase().includes(searchInput.toLowerCase());
  });

  const handleFileupdate = (event) => {
    setImg(event.target.files[0]);
    setDisplay(URL.createObjectURL(event.target.files[0]))
    setShowSeltimg(true)
  }
  const cancelImgupload = () => {
    setShowSeltimg(false); // Example action: removing the image
  };
  const markAsRead = async (messageId) => {
    await setDoc(doc(db, "messages", messageId, "chat"), {
      read: true,

    });
  };
  const handleMarkAsRead = () => {
    console.log("read messages")

  };
  return (
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
        {filteredUsers
          .map(user => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              chat={chat}
              user1={user1}
            />
          ))}

      </div>
      <div className="messages_container" >
        {chat ? (
          <>
            <div className="messages_user">
              <img src={chat.imageUrl} />
              <p>{chat.newfirstname}</p>
              <small>{chat.isOnline ? 'Online' : 'Offline'}</small>
            </div>
            <div className="messages" onClick={handleMarkAsRead}>
              {msgs.length ? (
                msgs.map((msg, i) => {
                  const currentDate = msg.createdAt.toDate();
                  const isPrevDateSame = prevDate && prevDate.toDateString() === currentDate.toDateString();
                  prevDate = currentDate;
                  return (
                    <Message
                      key={i}
                      msg={msg}
                      isPrevDateSame={isPrevDateSame}
                      user1={user1}
                      markAsRead={markAsRead}
                      isOnline={isOnline}
                    />
                  );
                })
              ) : null}
              {showSeltimg && <>
                <div className="previewImg">

                  <img src={img ? display : ''} className="stylePreviewimg" />
                  <CancelIcon className="cancel_img" onClick={cancelImgupload} />

                </div>
              </>
              }
            </div>
            <MessageForm
              sendMessage={sendMessage}
              text={text}
              setText={setText}
              setImg={setImg}
              handleFileupdate={handleFileupdate}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  )
}
export default ChatingApp;
















