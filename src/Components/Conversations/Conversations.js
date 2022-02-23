import axios from "axios";
import React from "react";
import "./Conversations.css";

function Conversations({ conversation }) {
  return (
    <div className="conversation">
      <div className="conversation_details">
        <img
          src={conversation.chatting_with.profile_picture}
          className="conversationImage"
        />
        <p className="conversationName">
          {conversation.chatting_with.name}
        </p>
      </div>
    </div>
  );
}

export default Conversations;
