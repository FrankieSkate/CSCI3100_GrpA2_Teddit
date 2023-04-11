import { Box } from "@mui/material";
import Navbar from "../navbar";
import UserPostWidget from "../widgets/UserPostWidget";
import UserWidget from "../widgets/UserWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import Chatroom from "../widgets/Chatroom";
import { useState } from "react";
const HomePage = () => {
  const user = { _id: "1a", picturePath: "adverts.jpeg" };
  const [loginStatus, setLoginStatus] = useState("true");
  const [ChatroomStatus, setIsChatroom] = useState("true");
  const isLogin = loginStatus === "true";
  const isChatroom = ChatroomStatus === "false";
  return (
    <Box>
      <Navbar loginStatus={loginStatus} chatrooom = {ChatroomStatus} />
      {isLogin ? (
        <Box
          width="100%"
          padding="2rem 5%"
          display="flex"
          gap="0.5rem"
          justifyContent="space-between"
        >
          {/* left */}
          <Box flexBasis="25%">
            <UserWidget userId={user._id} picturePath={user.picturePath} />
          </Box>

          {/* middle */}
          <Box flexBasis="45%">
          {isChatroom ? (<Chatroom picturePath={user.picturePath} />) : (
            <>
            <UserPostWidget picturePath={user.picturePath} isOnline={true}/>
            <PostsWidget />
            </>
          )}
          </Box>
          {/* right */}
          <Box flexBasis="25%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget />
          </Box>
        </Box>
      ) : (
        <Box flexBasis="45%" m="2rem 25%">
          <PostsWidget />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
