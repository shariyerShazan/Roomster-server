import express from "express";
import isAuthed from "../Middlewares/isAuthed.js";
import {
  createPost,
  deletePostById,
  getAdminPost,
  getAllPost,
  getPostById,
  updateLike,
  updatePostById,
} from "../Controllers/post.controller.js";

const router = express.Router();

router.post("/post/:id",createPost);
router.get("/get-post", getAllPost);
router.get("/get-admin-post/:id", getAdminPost);
router.get("/get-post/:id",getPostById);
router.put("/update/:id",  updatePostById);
router.put('/update-like/:id', updateLike)
router.delete("/delete/:id",  deletePostById);

export default router;
