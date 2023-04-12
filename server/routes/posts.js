import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getGuestPosts,
  deletePost,
  addComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/getAll", getGuestPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

router.post("/comment", verifyToken, addComment);
/* DELETE */
router.post("/delete", verifyToken, deletePost);

export default router;
