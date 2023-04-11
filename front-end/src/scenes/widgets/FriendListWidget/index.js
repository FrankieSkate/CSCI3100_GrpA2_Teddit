import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../../components/Friend";
import WidgetWrapper from "../../../components/WidgetWrapper";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const friends = [
    {
      _id: "abc",
      firstName: "Jimmy",
      lastName: "Hung",
      picturePath: "adverts.jpeg",
    },
    {
      _id: "abd",
      firstName: "Frankie",
      lastName: "Kwok",
      picturePath: "adverts.jpeg",
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
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map(friend => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
