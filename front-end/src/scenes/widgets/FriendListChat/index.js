import { Box, Typography, useTheme } from "@mui/material";
import FriendChat from "../../../components/FriendChat";
import WidgetWrapper from "../../../components/WidgetWrapper";

const FriendListChat = ({ userId }) => {
  const { palette } = useTheme();
  const friends = [
    {
      _id: "abc",
      firstName: "Jimmy",
      lastName: "Hung",
      picturePath: "adverts.jpeg",
      isOnline: true,
      subtitle: "hello"
    },
    {
      _id: "abd",
      firstName: "Frankie",
      lastName: "Kwok",
      picturePath: "adverts.jpeg",
      isOnline: false,
      subtitle: "byebye"
    },
  ];
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Chatroom Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map(friend => (
          <FriendChat
          key={friend._id}
          friendId={friend._id}
          name={`${friend.firstName} ${friend.lastName}`}
          userPicturePath={friend.picturePath}
          subtitle={friend.subtitle}
          isOnline={friend.isOnline}
        />        
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListChat;
