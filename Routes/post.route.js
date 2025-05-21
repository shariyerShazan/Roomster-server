import express from "express";
import isAuthed from "../Middlewares/isAuthed.js";
import {
  createPost,
  deletePostById,
  getAdminPost,
  getAllPost,
  getPostById,
  updatePostById,
} from "../Controllers/post.controller.js";

const router = express.Router();

router.post("/post", isAuthed, createPost);
router.get("/get-post", isAuthed, getAllPost);
router.get("/get-admin-post", isAuthed, getAdminPost);
router.get("/get-post/:id", isAuthed, getPostById);
router.put("/get-post/:id", isAuthed, updatePostById);
router.delete("/get-post/:id", isAuthed, deletePostById);

export default router;
