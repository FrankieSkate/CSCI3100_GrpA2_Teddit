import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin === 1 ? true : false;
    },
    setLogout: state => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setComment: (state, action) => {
      const updatedComments = state.posts.map(comment => {
        if (comment._id === action.payload.comment._id)
          return action.payload.comment;
        return comment;
      });
      state.comments = updatedComments;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUsers,
  setComment,
} = authSlice.actions;
export default authSlice.reducer;
