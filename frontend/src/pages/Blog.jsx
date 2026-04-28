import Hero from "@/components/Hero";
import React, { useContext } from "react";
import BlogCart from "@/components/BlogCart";
import { StoreContext } from "@/context/storeContext";

export default function Blog() {
  const { blogData } = useContext(StoreContext);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            All Blogs
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover insightful articles, tutorials, and stories from our blog.
            Stay updated with the latest trends, tips, and development knowledge
            shared by our community.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData?.length > 0 &&
            blogData.map((blog, indx) => (
              <div
                key={blog._id || indx}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
              >
                <BlogCart blog={blog} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
