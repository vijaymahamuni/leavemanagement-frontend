import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import './Message.css';
const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  const messageDate = msg.createdAt.toDate();
  const compareDates=messageDate.getTime();
  console.log("messageDate",messageDate)
  
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
  let prevDate = null;  

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

  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
        {/* <p>{comparisonResult}</p> */}

      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        <br />
        <small>
          <Moment format="h:mm A">{msg.createdAt.toDate()}</Moment>


        </small> 
      </p>
    </div>
  );
};

export default Message;
