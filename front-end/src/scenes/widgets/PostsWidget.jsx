import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const token = useSelector(state => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8002/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8002/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            picturePath,
            userPicturePath,
            likes,
            comments,
            createdAt,
            repost,
          }) =>{ 
            console.log("re",repost);
            if (repost.length === 1) {
              const post = repost[0];
              console.log(post);
              return (<PostWidget
                key={_id}
                postId={post._id}
                postUserId={post.userId}
                name={`${post.firstName} ${post.lastName}`}
                description={post.description}
                picturePath={post.picturePath}
                userPicturePath={post.userPicturePath}
                likes={post.likes}
                comments={post.comments}
                createdAt={post.createdAt}
                re_post = {true}
                re_post_by = {`${firstName} ${lastName}`}
              />)
            }else{
              return (<PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                createdAt={createdAt}
              />)
            }
          }
        )}
    </>
  );
};

export default PostsWidget;
