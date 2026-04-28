import { useContext, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, PlusCircle, Trash2, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogSchema } from "../validation/blogSchema.js";
import axios from "axios";
import { StoreContext } from "@/context/storeContext.jsx";
import { toast } from "react-toastify";
import BlogCart from "@/components/BlogCart.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { blogData, userBlogs, setBlogData, getBlogData } =
    useContext(StoreContext);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [editBlog, setEditBlog] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [dltLoader, setDeleteLoader] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  const accessToken = localStorage.getItem("accessToken");

  //  CREATE
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    const updatedBlog = {
      ...blog,
      [name]: name === "image" ? files[0] : value,
    };

    setBlog(updatedBlog);

    try {
      await blogSchema.validateAt(name, updatedBlog);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleAddBlog = async (e) => {
    try {
      e.preventDefault();
      await blogSchema.validate(blog, { abortEarly: false });

      setLoading(true);

      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("category", blog.category);
      formData.append("description", blog.description);
      formData.append("image", blog.image);

      const res = await axios.post(
        "http://localhost:8000/api/v1/blog/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setBlogData((pre) => [res.data.blog, ...pre]);

        setBlog({
          title: "",
          category: "",
          description: "",
          image: "",
        });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const handleEdit = (blog) => {
    setEditBlog({
      ...blog,
      image: blog.image,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    const updated = {
      ...editBlog,
      [name]: name === "image" ? files[0] : value,
    };

    setEditBlog(updated);

    try {
      blogSchema.validateAt(name, updated);
      setEditErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setEditErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      await blogSchema.validate(editBlog, { abortEarly: false });

      setEditLoading(true);

      const formData = new FormData();
      formData.append("title", editBlog.title);
      formData.append("category", editBlog.category);
      formData.append("description", editBlog.description);

      if (editBlog.image instanceof File) {
        formData.append("image", editBlog.image);
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/update/${editBlog._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setBlogData((prev) =>
          prev.map((b) => (b._id === editBlog._id ? res.data.blog : b)),
        );
        setEditBlog(null);
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setEditErrors(newErrors);
      } else {
        toast.error(err.message);
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (blog_id) => {
    try {
      setDeleteLoader(true);
      setDeletingId(blog_id);
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${blog_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getBlogData();
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message);
      } else {
        toast.error(err.message);
      }
    } finally {
      setDeleteLoader(false);
    }
  };
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:to-black">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CREATE BLOG */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Create Blog
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <p className="text-red-500 text-xs">{errors.title}</p>

            <Input
              name="category"
              value={blog.category}
              onChange={handleChange}
              placeholder="Category"
            />
            <p className="text-red-500 text-xs">{errors.category}</p>

            <Textarea
              name="description"
              value={blog.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <p className="text-red-500 text-xs">{errors.description}</p>

            <Input
              type="file"
              name="image"
              ref={imageRef}
              className="hidden"
              onChange={handleChange}
            />
            <Button variant="outline" onClick={() => imageRef.current.click()}>
              Select Image
            </Button>

            {blog.image && (
              <img
                src={URL.createObjectURL(blog.image)}
                className="w-20 h-20 rounded-full"
              />
            )}

            <Button
              onClick={handleAddBlog}
              disabled={isLoading}
              className={"cursor-pointer"}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Upload Blog"}
            </Button>
          </CardContent>
        </Card>

        {/* BLOG LIST */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="allblog">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="allblog">All Blogs</TabsTrigger>
              <TabsTrigger value="userblog">My Blogs</TabsTrigger>
            </TabsList>

            <TabsContent value="allblog">
              <div className="grid gap-4 sm:grid-cols-2">
                {blogData?.map((b) => (
                  <Card
                    key={b._id}
                    className="relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/readblog/${b._id}`)}
                  >
                    <CardContent className="p-4">
                      {/* TITLE */}
                      <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">
                        {b.title}
                      </h2>

                      {/* CATEGORY + DATE */}
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {b?.category} •{" "}
                        {new Date(b?.createdAt).toLocaleDateString()}
                      </p>

                      {/* IMAGE */}
                      <img
                        src={b?.image?.url}
                        className="mt-3 w-full h-48 sm:h-52 object-cover rounded-md"
                      />

                      {/* DESCRIPTION */}
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {b.description}
                      </p>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-2 mt-3">
                        <img
                          src={b?.author?.profile?.url}
                          alt="author"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-500">
                          {b?.author?.username}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="userblog">
              <div className="grid gap-4 sm:grid-cols-2">
                {userBlogs?.map((b) => (
                  <Card
                    key={b._id}
                    className="relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/readblog/${b._id}`)}
                  >
                    <CardContent className="p-4">
                      {/* ACTIONS */}
                      <div className="absolute top-3 right-3 flex gap-2 bg-white/80 dark:bg-black/40 p-1 rounded-md">
                        <button
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(b);
                          }}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(b._id);
                          }}
                          disabled={deletingId === b._id}
                        >
                          {dltLoader ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>

                      {/* TITLE */}
                      <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">
                        {b.title}
                      </h2>

                      {/* CATEGORY + DATE */}
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {b?.category} •{" "}
                        {new Date(b?.createdAt).toLocaleDateString()}
                      </p>

                      {/* IMAGE (FIXED HEIGHT) */}
                      <img
                        src={b?.image?.url}
                        className="mt-3 w-full h-48 sm:h-52 object-cover rounded-md"
                      />

                      {/* DESCRIPTION */}
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {b.description}
                      </p>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-2 mt-3">
                        <img
                          src={b?.author?.profile?.url}
                          alt="author"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-500">
                          {b?.author?.username}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-6">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative rounded-xl">
            {/* CLOSE BTN */}
            <button
              onClick={() => setEditBlog(null)}
              className="absolute top-3 right-3 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="mb-4 text-lg sm:text-xl font-bold">Edit Blog</h2>

            {/* TITLE */}
            <Input
              name="title"
              value={editBlog.title || ""}
              onChange={handleEditChange}
              className="mb-1"
            />
            <p className="text-red-500 text-xs mb-2">{editErrors.title}</p>

            {/* CATEGORY */}
            <Input
              name="category"
              value={editBlog.category || ""}
              onChange={handleEditChange}
              className="mb-1"
            />
            <p className="text-red-500 text-xs mb-2">{editErrors.category}</p>

            {/* DESCRIPTION */}
            <Textarea
              name="description"
              value={editBlog.description || ""}
              onChange={handleEditChange}
              className="mb-1"
            />
            <p className="text-red-500 text-xs mb-2">
              {editErrors.description}
            </p>

            {/* IMAGE PREVIEW */}
            {editBlog?.image && (
              <div className="flex justify-center mt-3">
                <img
                  src={
                    editBlog.image instanceof File
                      ? URL.createObjectURL(editBlog.image)
                      : editBlog.image?.url
                  }
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                />
              </div>
            )}

            {/* FILE INPUT */}
            <Input
              type="file"
              name="image"
              onChange={handleEditChange}
              className="mt-3"
            />

            {/* BUTTON */}
            <Button
              className="mt-4 w-full cursor-pointer"
              onClick={handleUpdate}
              disabled={editLoading}
            >
              {editLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Blog"
              )}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
