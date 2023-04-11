import { Box } from "@mui/material";
import Navbar from "../navbar";
import UserPostWidget from "../widgets/UserPostWidget";
import UserWidget from "../widgets/UserWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import FriendListChat from "../widgets/FriendListChat";
import Chatroom from "../widgets/Chatroom";
import { useState } from "react";
const ChatroomPage = () => {
  const user = { _id: "1a", picturePath: "adverts.jpeg" };
  const [loginStatus, setLoginStatus] = useState("true");
  const [ChatroomStatus, setIsChatroom] = useState("true");
  return (
    <Box>
      <Navbar loginStatus={loginStatus} chatrooom = {ChatroomStatus} />

        <Box
          width="100%"
          padding="2rem 6%"
          display="flex"
          gap="2rem"
          justifyContent="center"
        >
          {/* left */}
          <Box flexBasis="26%">
            <FriendListChat />
          </Box>
          

          {/* middle */}
          <Box flexBasis="42%">
          <Chatroom picturePath={user.picturePath} />
          </Box>
          {/* right */}

        </Box>

    </Box>
  );
};

export default ChatroomPage;
