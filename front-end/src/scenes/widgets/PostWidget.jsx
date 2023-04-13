import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setComment } from "../../state";

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
  const theme = useTheme();
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const { _id } = useSelector(state => state.user);
  const loggedInUserId = useSelector(state => state.user._id);
  const neutralLight = theme.palette.neutral.light;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const isRepost = true;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:8002/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const [addComment, setAddComment] = useState("");

  const handleComment = async () => {
    const response = await fetch(
      `http://localhost:8002/posts/${postId}/comment`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comment: addComment }),
      }
    );
    console.log("new comment", addComment);
    const updatedComment = await response.json();
    console.log("new comment2", updatedComment);
    dispatch(setComment({ comment: updatedComment }));
    setAddComment("");
  };

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
          style={{ borderRadius: "0.2rem", marginTop: "1rem" }}
          src={`http://localhost:8002/assets/${picturePath}`}
        />
      )}

      {!isRepost && (
        <WidgetWrapper
          m="2rem 0"
          sx={{ ml: "4.5rem", border: "1px solid gray" }}
        >
          <Friend
            friendId={postUserId}
            name={name}
            userPicturePath={userPicturePath}
          />
          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
        </WidgetWrapper>
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
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

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((items, index) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {items.comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="0.5rem"
            gap="3rem"
            mt="1rem"
            padding="0.1rem 1.5rem"
            flexBasis="2 1"
          >
            <InputBase
              sx={{ flexGrow: 1 }}
              onChange={e => setAddComment(e.target.value)}
              placeholder="Add your comments here..."
            />
            <IconButton onClick={handleComment}>
              <SendIcon />
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
