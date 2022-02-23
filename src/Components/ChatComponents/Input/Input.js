import React from 'react';



const Input = () => (
  <form className="form">
    <input
      className="message-input"
      type="text"
      placeholder="Type a message..."
      
    />
    <button className="send-btn">Send</button>
  </form>
)

export default Input;