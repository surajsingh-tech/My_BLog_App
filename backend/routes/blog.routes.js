import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenitcated";
import {
  allBlog,
  createBlog,
  deleteBlog,
  updatePost,
} from "../controller/blog.controller";
const router = express.router();

router.get("/all-blogs", isAuthenticated, allBlog);
router.post("/create", isAuthenticated, createBlog);
router.post("/delete", isAuthenticated, deleteBlog);
router.post("/update", isAuthenticated, updatePost);

export default router;
