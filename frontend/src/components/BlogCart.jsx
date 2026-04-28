import React from "react";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function BlogCart({ blog }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/readblog/${blog._id}`)}
      className="shadow-md hover:shadow-xl transition duration-300 rounded-xl cursor-pointer relative"
    >
      <CardContent className="p-4 sm:p-5">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold">{blog?.title}</h2>

        {/* Category + Date */}
        <p className="text-xs sm:text-sm text-muted-foreground">
          {blog?.category} • {new Date(blog?.createdAt).toLocaleDateString()}
        </p>

        {/* Image */}
        <img
          src={blog?.image?.url}
          alt="blog"
          className="mt-3 rounded-md w-full h-40 sm:h-48 object-cover"
        />

        {/* Description */}
        <p className="mt-3 text-sm line-clamp-2">{blog?.description}</p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-3">
          <img
            src={blog?.author?.profile?.url}
            alt="author"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs text-gray-500">
            {blog?.author?.username}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
