import { Box, Divider, InputBase, useTheme, Typography, IconButton } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import UserImage from "../../../components/UserImage";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Dropzone from "react-dropzone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Grid } from "@mui/material";

const Chatroom = ({ picturePath, isOnline }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
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
          <UserImage image={picturePath} />
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
  <form onSubmit={handleMessageSubmit} sx={{ flexGrow: 1 }}>
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item xs={10}>
      <InputBase
  placeholder="Type a message..."
  onChange={(e) => setMessage(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (message.trim() !== "") {
        const now = new Date();
        setMessages([
          ...messages,
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
    backgroundColor: palette.neutral.light,
    borderRadius: "1rem",
    padding: "0.5rem 10rem",
    flexGrow: 1,
  }}
/>
      </Grid>
      <Grid item xs={1}>
      <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
  {({ getRootProps, getInputProps }) => (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <IconButton>
        <PhotoCameraIcon />
      </IconButton>
    </div>
  )}
</Dropzone>
      </Grid>
      <Grid item xs={1}>
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  </form>
</Box>



      
    </WidgetWrapper>
    
  );
};

export default Chatroom;
