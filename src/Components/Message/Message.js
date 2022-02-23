import React from "react";
import "./message.css";
import { format } from "timeago.js";

function Message({ message, own }) {
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message?.message}</p>
      </div>
      <div className="messageBottom">{format(message?.message_datetime)}</div>
    </div>
  );
}

export default Message;
