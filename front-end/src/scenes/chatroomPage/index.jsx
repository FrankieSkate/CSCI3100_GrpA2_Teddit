import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import FriendListWidget from "../widgets/FriendListWidget";
import Chatroom from "../widgets/Chatroom";
import Navbar from "../navbar";
import { Box, InputBase, useTheme, IconButton} from "@mui/material";
import { Search} from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import FlexBetween from "../../components/FlexBetween";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const { _id } = useSelector(state => state.user);
  const friends = useSelector(state => state.user.friends);
  const socket = useRef();
  const scrollRef = useRef();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", _id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(friends.filter(f => users.some(u => u._id === f)));
    });
  }, [_id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(`http://localhost:8002/conversations/${_id}`, {
          method: "GET",
        });
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [_id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8002/messages/${currentChat?._id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async e => {
    e.preventDefault();
    const message = {
      sender: _id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== _id);

    socket.current.emit("sendMessage", {
      senderId: _id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await fetch(`http://localhost:8002/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      const data = await res.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box>
      <Navbar />
      <Box
          width="100%"
          padding="2rem 6%"
          display="flex"
          gap="2rem"
          justifyContent="center"
      >
      
      <Box flexBasis="26%">
        
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
          <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="0.5rem"
              gap="3rem"
              padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search for friends" className="chatMenuInput" />

            <IconButton>
            <Search />
            </IconButton>

          </FlexBetween >
          <Box m="1rem 0"/>
          {conversations.map((c, index) => (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUserId={_id} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={m} own={m.sender === _id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write somthing..."
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
              </span>
            )}
          </div>
        </div>
        
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <FriendListWidget userId={_id} />
          </div>
        </div>
      </div>
      </Box>

      <Box flexBasis="42%">
          <Chatroom  />
      </Box>

      </Box>
    </Box>
  );
}
