import React from "react";

export default function BlogCart({ blog }) {
  return (
    <div>
      {/* Image */}
      <img
        src={blog?.image}
        alt={blog?.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-xs font-semibold px-3 py-1 mb-5 bg-blue-100 text-blue-600 rounded-full">
          {blog?.category}
        </span>

        {/* Title */}
        <h2 className="text-lg font-bold leading-snug">{blog?.title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {blog?.description}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <img
              src={blog?.author?.image}
              alt={blog?.author?.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <span className="text-sm font-medium">{blog?.author?.name}</span>
          </div>

          <span className="text-xs text-gray-500">{blog?.date}</span>
        </div>
      </div>
    </div>
  );
}
