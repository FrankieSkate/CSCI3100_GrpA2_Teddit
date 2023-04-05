import PostWidget from "../PostWidget";

const PostsWidget = () => {
  const posts = [
    {
      _Id: "1",
      userId: "abc",
      firstName: "Jimmy",
      lastName: "Hung",
      description: "I am so unhappy",
      picturePath: "adverts.jpeg",
      userPicturePath: "adverts.jpeg",
      likes: "10",
      comments: "come on",
    },
    {
      _Id: "2",
      userId: "abd",
      firstName: "Frankie",
      lastName: "Kwok",
      description: "I am so unhappy",
      picturePath: "adverts.jpeg",
      userPicturePath: "adverts.jpeg",
      likes: "10",
      comments: "come on",
    },
    {
      _Id: "3",
      userId: "abe",
      firstName: "Anthony",
      lastName: "Leung",
      description: "I am so unhappy",
      picturePath: "adverts.jpeg",
      userPicturePath: "adverts.jpeg",
      likes: "10",
      comments: "",
    },
  ];

  return (
    <>
      {posts.map(
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
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
