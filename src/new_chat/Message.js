import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Message.css';
import DoneIcon from '@mui/icons-material/Done';
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
import { db, auth, storage } from "../firebase";

const Message = ({ msg, user1, isPrevDateSame, markAsRead,isOnline }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const messageDate = msg.createdAt.toDate();

  const formattedDate = messageDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getDayName = (date) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()];
  };

  const comparisonResult = (() => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (messageDate >= oneWeekAgo) {
      if (messageDate.toDateString() === today.toDateString()) {
        return 'Today';
      } else {
        return getDayName(messageDate);
      }
    } else {
      return formattedDate;
    }
  })();

 
  return (
    <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
      {!isPrevDateSame && <div className="messageDate">{comparisonResult}</div>}
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        &nbsp;&nbsp;&nbsp;
        <small>
          <Moment format="h:mm a">{msg.createdAt.toDate()}</Moment>
          {msg.from===user1 ?msg.activeStatus === false ? <DoneIcon style={{ width: "17px", height: "17px", color: "gray" }} />
            : <DoneAllIcon style={{ width: "17px", height: "17px",color: msg.read===true ? "blue":"gray" }} />
          :""}
        </small>
      </p>
    </div>
  );
};

export default Message;
