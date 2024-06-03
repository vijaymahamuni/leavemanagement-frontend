import React from "react";
import Attachment from "./Attachment";
import './MessageForm.css';
import SendIcon from '@mui/icons-material/Send';
import CollectionsIcon from '@mui/icons-material/Collections';

const MessageForm=({ sendMessage, text, setText, setImg ,handleFileupdate})=>{

    return(
        <form className="message_form" onSubmit={sendMessage} >
            <div className="attachment_upload">
          <label htmlFor="img">
          <CollectionsIcon style={{color:"#5e5b8e",cursor:"pointer"}}/>
          
        </label>
        <input
          onChange={handleFileupdate}
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