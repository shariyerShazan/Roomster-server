
import express from "express";
import { register, login, logout, updateUserProfile } from "../Controllers/user.controller.js";
import isAuthed from "../Middlewares/isAuthed.js";
// import isAuthed from "../Middlewares/isAuthed.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",  logout);
router.put("/update-profile", isAuthed, updateUserProfile);

export default router;
