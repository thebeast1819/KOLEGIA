import {  useEffect } from "react";
import Input from "../Input/Input";
import "./Chat.css";
import Messages from "../Messages/Messages";
import AllChats from "../AllChats/AllChats";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { getAllChats } from "../../../redux/actions/chatActions";

const ChatRoom = () => {
  const encodedToken = localStorage.getItem("jwt");
  const decoded = jwt_decode(encodedToken);
  const user_details = {
    _id: decoded._id,
  };
  const token = decoded.auth_token;

  const chats = useSelector((state) => state.chat.chats);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChats({ user_details, token }));
  }, []);

  return (
    <div className="h12">
      <h1 className="title">Chat Container</h1>

      <div className="outerContainer2">
        <AllChats chats={chats} />
        <div className="container22">
          <Messages />

          <div className="input2">
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
