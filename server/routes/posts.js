import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getGuestPosts,
  deletePost,
  addComment,
  editComment,
  deleteComment
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/getAll", getGuestPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.post("/delete", verifyToken, deletePost);

/* Comments */
router.post("/:id/comment", verifyToken, addComment);


export default router;
