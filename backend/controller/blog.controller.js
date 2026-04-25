import cloudinary from "../config/cloudinary";
import Blog from "../models/blog.model";
import getDataUri from "../config/dataUri.js";

export const createBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, category, discription } = req.body;
    const postImage = req.file;
    if (!title || !category || !discription || !postImage) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }

    const fileURI = getDataUri(postImage);
    const cloudResponse = await cloudinary.uploader.upload(fileURI, {
      folder: "Posts",
    });
    const imageUrl = cloudResponse.secure_url;
    const imagePublicId = cloudResponse.public_id;

    const post = await Blog.create({
      title,
      category,
      discription,
      image: { url: imageUrl, publicId: imagePublicId },
      author: userId,
    });
    const populatedata = await post.populate("author", "username profile");
    return res.status(201).json({
      success: true,
      message: "Blog Post Successfullly",
      blog: populatedata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const allBlog = async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      allBlogs: allBlogs || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.userId;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Post are require",
      });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      author: userId,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or unauthorized",
      });
    }

    if (blog?.image?.publicId) {
      await cloudinary.uploader.destroy(blog.image.publicId);
    }

    const deleted = await Blog.deleteOne({ _id: blogId });

    if (deleted.deletedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete blog",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, category, discription } = req.body;
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "BlogId is required",
      });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      author: userId,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or unauthorized",
      });
    }

    //Check blog image
    const newImage = req.file;
    if (newImage) {
      //delete old img
      if (blog?.image?.publicId) {
        const deletedImage = await cloudinary.uploader.destroy(
          blog.image.publicId,
        );

        if (
          deletedImage.result !== "ok" &&
          deletedImage.result !== "not found"
        ) {
          return res.status(500).json({
            success: false,
            message: "Failed to delete old image",
          });
        }
      }

      // upload new image
      const fileURI = getDataUri(newImage);
      const uploaded = await cloudinary.uploader.upload(fileURI, {
        folder: "posts",
      });

      blog.image = {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      };
    }

    if (title) blog.title = title;
    if (category) blog.category = category;
    if (discription) blog.discription = discription;

    await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
