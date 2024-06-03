import React, { useEffect, useState } from "react";
import './User.css';
import { db} from "../firebase";
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
const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user ? user.uid : null;
  const [data,setData]=useState("");
  const [unreadCount,setUnreadCount]=useState('')
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log("user1 ids printed is", user1);

    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
        setData(doc.data());
    });

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let msgs = [];

        querySnapshot.forEach((docSnapshot) => {
            const msgData = docSnapshot.data();
            console.log("get read coutn",msgData.read)

            msgs.push(msgData);
        });
        const getunreadCount = msgs.filter(msgs => !msgs.read).length;
        console.log("unreadCount get printed:", getunreadCount);
        setUnreadCount(getunreadCount)


    });

    return () => {
        unsub();
        unsubscribe();
    };
}, []);


  return(
    <div>
     <div         
     className={`user_wrapper ${chat.newfirstname === user.newfirstname && "selected_user"}`}
     onClick={()=>selectUser(user)}>
        <div className="user_info">
          <div className="user_detail">
          <div className="imgbx">
                  <img src={user.imageUrl} className="cover"  />
                </div>     
          <p className="chatName">{user.newfirstname}</p>
          {data && user1 && data.from !== user1 && data.unread && (
  <small className="unread">New&nbsp;{unreadCount}</small>
)}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>
              {data.from ===user1 ?"Me:":null}
            </strong>
           {data.text}
          </p>
        )}
    </div>
    </div>
  )  
}
export default User;