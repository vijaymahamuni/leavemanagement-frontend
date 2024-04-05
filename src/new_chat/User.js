import React, { useEffect, useState } from "react";
import './User.css';
import { onSnapshot,doc } from "firebase/firestore";
import { db, auth, storage } from "../firebase";

const User = ({ user1, user, selectUser, chat }) => {

  const user2 = user ? user.uid : null;

 


  const [data,setData]=useState("");

  useEffect(()=>{
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log("user1 ids printed is",user1)

    // console.log("user1 ids printed is",ids)
    // const id='MlpqE6L8yPZuCC0QryHeykpUTnu275fKdWIIhMfgA1veGRTC1UJ2Wdk1';

    let unsub=onSnapshot(doc(db,"lastMsg",id),(doc)=>{
      setData(doc.data());
    });
    return ()=>unsub();
  },[]);


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
  <small className="unread">New</small>
)}

            
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>

        {data && (
          <p className="truncate">
           {data.text}
          </p>
        )}
    </div>
    </div>
  )  
}
export default User;