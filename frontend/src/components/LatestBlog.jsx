import { StoreContext } from "@/context/storeContext.jsx";
import BlogCart from "./BlogCart.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function LatestBlog() {
  const { blogData } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10" onClick={() => navigate("")}>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center sm:text-left mb-8">
        Latest Blogs
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData
          ?.slice(-6)
          .reverse()
          .map((blog, indx) => (
            <div
              key={blog.id || indx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border p-2"
            >
              <BlogCart blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
}
