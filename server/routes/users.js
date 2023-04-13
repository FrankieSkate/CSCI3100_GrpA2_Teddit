import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  searchUserByUnique,
  deleteUser,
  getAllUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/getAll", verifyToken, getAllUser);
router.get("/:id", verifyToken, getUser);
router.get("/search/:firstName/:lastName", searchUserByUnique);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* DELETE */
router.post("/delete", verifyToken, deleteUser);

export default router;
