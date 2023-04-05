import { Box } from "@mui/material";
import Navbar from "../navbar";
import UserPostWidget from "../widgets/UserPostWidget";
import UserWidget from "../widgets/UserWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
const HomePage = () => {
  const user = { _id: "1a", picturePath: "adverts.jpeg" };

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
        {/* left */}
        <Box flexBasis="25%">
          <UserWidget userId={user._id} picturePath={user.picturePath} />
        </Box>
        {/* middle */}
        <Box flexBasis="45%">
          <UserPostWidget picturePath={user.picturePath} />
          <PostsWidget />
        </Box>
        {/* right */}
        <Box flexBasis="25%">
          <AdvertWidget />
          <Box m="2rem 0" />
          <FriendListWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
