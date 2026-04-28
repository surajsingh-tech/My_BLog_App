import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenitcated.js";
import {
  allBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  userBlogs,
} from "../controller/blog.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.get("/all",  allBlog);
router.post("/create", isAuthenticated, singleUpload, createBlog);
router.delete("/delete/:blogId", isAuthenticated, deleteBlog);
router.put("/update/:blogId", isAuthenticated, singleUpload, updateBlog);
router.get("/singleBlog/:blogId", isAuthenticated, getSingleBlog);
router.get("/userblogs", isAuthenticated, userBlogs);
export default router;
