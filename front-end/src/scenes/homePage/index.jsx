import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import UserPostWidget from "../widgets/UserPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const { _id, picturePath } = useSelector(state => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 5%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis="20%">
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis="50%">
          <UserPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        <Box flexBasis="20%">
          <AdvertWidget />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
