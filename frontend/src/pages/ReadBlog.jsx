import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "@/context/storeContext.jsx";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, ArrowLeft } from "lucide-react";

export default function ReadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogData } = useContext(StoreContext);

  const [showFull, setShowFull] = useState(false);

  const blog = blogData?.find((b) => b._id === id);

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-500">Blog not found 😢</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card className="p-5 sm:p-8 shadow-lg rounded-2xl">
        <div className="flex justify-between items-start gap-4">
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            {blog.title}
          </h1>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Author + Date */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={blog?.author?.profile?.url}
            alt="author"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{blog?.author?.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Category */}
        <span className="inline-block mt-4 text-xs bg-gray-100 px-3 py-1 rounded-full">
          {blog.category}
        </span>

        {/* Image */}
        <img
          src={blog?.image?.url}
          alt="blog"
          className="w-full mt-6 rounded-xl max-h-[400px] object-cover"
        />

        {/* Description */}
        <div className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg">
          <p className={`${!showFull ? "line-clamp-5" : ""}`}>
            {blog.description}
          </p>

          <button
            onClick={() => setShowFull(!showFull)}
            className="mt-3 flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-800 transition"
          >
            {showFull ? (
              <>
                Show Less <ArrowUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read More <ArrowDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </Card>
    </div>
  );
}
