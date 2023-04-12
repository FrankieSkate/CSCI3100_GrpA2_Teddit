import { Box, Divider, InputBase, useTheme, Typography, IconButton } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import { useEffect } from "react";

const Chatroom = ({userId}) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hey, what's up?",
      sentByCurrentUser: false,
      timestamp: "10:30 AM",
      photo: null,
    },
    {
      text: "Not much, just chilling. You?",
      sentByCurrentUser: true,
      timestamp: "10:31 AM",
      photo: null,
    },
    {
      text: "Same here. Have you seen the latest movie?",
      sentByCurrentUser: false,
      timestamp: "10:32 AM",
      photo: null,
    },
  ]);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const { palette } = useTheme();

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const now = new Date();
      setMessages([
        ...messages,
        {
          text: message,
          sentByCurrentUser: true,
          timestamp: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
          photo: selectedFile ? selectedFile.name : null, // add photo property to message object
        }
      ]);
      setMessage("");
      setSelectedFile(null); // clear selected file after submitting message
    }
  };

  const user = {
    firstName: "Jimmy",
    lastName: "Hung",
    viewedProfile: "frankie",
    friends: "frankie",
  };


  

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          borderBottom: `1px solid ${palette.divider}`,
        }}
      >
        <Box sx={{ marginRight: "1rem" }}>
          <UserImage image={user.picturePath} />
        </Box>
        <Typography variant="h6">{user.firstName + " " + user.lastName}</Typography>
      </Box>
      
      <Box
        sx={{
          height: "30rem",
          overflowY: "auto",
          padding: "1rem",
          borderBottom: `1px solid ${palette.divider}`,
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            mb={1}
            sx={{
              display: "flex",
              flexDirection: message.sentByCurrentUser ? "row-reverse" : "row",
            }}
          >
            <Box
              sx={{
                backgroundColor: message.sentByCurrentUser
                  ? palette.primary.main
                  : palette.neutral.light,
                color: message.sentByCurrentUser ? "white" : "inherit",
                borderRadius: "1rem",
                padding: "1rem",
                maxWidth: "70%",
              }}
            >
              <Typography variant="subtitle2">{message.text}</Typography>
              {message.photo && <Typography variant="caption">{message.photo}</Typography>} {/* add photo to message display */}
              <Typography variant="caption">{message.timestamp}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider />

      <Box m="0.5rem 0" />
      <Box
        flexBasis="26%"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleMessageSubmit} sx={{ flexGrow: 1 }}>
            <FlexBetween
                backgroundColor={neutralLight}
                borderRadius="0.5rem"
                gap="3rem"
                padding="0.1rem 1.5rem"
            >
                <InputBase
                    placeholder="Type here ..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (message.trim() !== "") {
                                const now = new Date();
                                setMessages([...messages,
                                    {
                                    text: selectedFile ? selectedFile.name : message,
                                    sentByCurrentUser: true,
                                    timestamp: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
                                    photo: selectedFile ? URL.createObjectURL(selectedFile) : null,
                                    }
                                ]);
                                setMessage("");
                                setSelectedFile(null);
                            }
                        }
                    }}
                    value={message}
                    sx={{
                        width: 500
                    }}
                    InputProps={{ sx: { height: 80 } }}
                    
                />
                <IconButton type="submit">
                    <SendIcon />
                </IconButton> 
                </FlexBetween>
            </form>
        </Box>
    </WidgetWrapper>
  );
};

export default Chatroom;
