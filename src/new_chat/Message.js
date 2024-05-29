import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import './Message.css';

const Message = ({ msg, user1, isPrevDateSame }) => {
  const scrollRef = useRef();
  console.log("isPrevDateSame",isPrevDateSame)

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
        <br />
        <small>
          <Moment format="h:mm A">{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
