import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* repost*/
export const repost = async (req, res) => {
  try {
    const { userId, description, postId } = req.body;
    const user = await User.findById(userId);
    const re_post = await Post.findById(postId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: "",
      likes: {},
      comments: [],
      repost: [re_post],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getGuestPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const ret = await Post.findByIdAndDelete(postId);
    if (ret) res.status(200).json(ret);
    else res.status(400).json({ message: "Fail to delete" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* COMMENT */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId } = req.body;
    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: { comment } },
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* EDIT COMMENT */
export const editComment = async (req, res) => {
  try {
    const { comment, postId, userId } = req.body;
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: { "comments.$[elem].comment": comment },
      },
      {
        arrayFilters: [{ "elem.user_id": userId }],
        new: true,
      }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE COMMENT */
export const deleteComment = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      {
        // $pull: { comments: { userId } },
        $push: { comments: { comment, userId } },
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
