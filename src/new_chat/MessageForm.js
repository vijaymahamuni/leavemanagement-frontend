import React from "react";
import Attachment from "./Attachment";
import './MessageForm.css';
import SendIcon from '@mui/icons-material/Send';


const MessageForm=({ sendMessage, text, setText, setImg })=>{

    return(
        <form className="message_form" onSubmit={sendMessage} >
            <div className="attachment_upload">
          <label htmlFor="img">
          <Attachment />
        </label>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="img"
          accept="image/*"
          style={{ display: "none" }}
        />
     </div>
        <div>
          <input
            type="text"
            placeholder="Type Something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
           <div>
          {/* <button className="btn">Send</button> */}
          <SendIcon className="sendIcon" onClick={sendMessage}  />

        </div>

      
      </form>
    )


}
export default MessageForm;