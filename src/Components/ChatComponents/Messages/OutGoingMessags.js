import React from 'react';

import './Message.css';



const OutGoingMessages = () => {

  return (
   
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">User's Name</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">My Message</p>
          </div>
        </div>
        
  )
   }

export default OutGoingMessages;