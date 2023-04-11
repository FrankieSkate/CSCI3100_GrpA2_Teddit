import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Friend from "../../../components/Friend";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { useState } from "react";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const isLiked = false;
  const likeCount = 10;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="user's post"
          style={{ borderRadius: "0.5rem", marginTop: "1rem" }}
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.2rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.2rem">
            <IconButton>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {/* {comments.map((comment, i) => ( */}
          <Box>
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              {`${name} : ${comments}`}
            </Typography>
          </Box>
          {/* ))} */}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
