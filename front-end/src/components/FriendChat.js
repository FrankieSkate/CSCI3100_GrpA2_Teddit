import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const FriendChat = ({ friendId, name, subtitle, userPicturePath, isOnline }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const friends = [{ _id: "abc" }, { _id: "abd" }];
  const isFriend = friends.find(friend => friend._id === friendId);

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            //navigate(`/chatroom/${friendId}`);
            navigate(`/chatroom`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isOnline ? (
  <IconButton sx={{ color: palette.success.main }}>
    <FiberManualRecordIcon fontSize="small" />
  </IconButton>
) : (
  <IconButton sx={{ color: palette.grey[500] }}>
    <FiberManualRecordIcon fontSize="small" />
  </IconButton>
)}

    </FlexBetween>
  );
};

export default FriendChat;
