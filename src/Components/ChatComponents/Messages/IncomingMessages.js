
import './Message.css';



const IncomingMessages = () => {

 
  return (
     
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">Other User's message</p>
            </div>
            <p className="sentText pl-10 ">User's Name</p>
          </div>
        
  );
   }

export default IncomingMessages;