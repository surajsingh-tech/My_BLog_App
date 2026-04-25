import React from "react";
import aboutImg from "../assets/about.jpg";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={aboutImg}
            alt="About"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">About Our Blog</h1>

          <p className="text-gray-600 leading-relaxed">
            Welcome to our blog app! 🚀 Here you will find the latest tech
            articles, tutorials, and web development tips. We provide simple and
            easy-to-understand content so that beginners can learn easily.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            The goal of this platform is to share knowledge and help developers
            grow. Whether it's React, JavaScript, or backend development —
            everything is available here.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          To provide a simple and powerful platform where developers can learn,
          grow, and share their knowledge with others.
        </p>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="font-semibold text-xl mb-2">Easy Learning</h3>
          <p className="text-gray-600 text-sm">
            Simple and beginner-friendly tutorials and guides.
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="font-semibold text-xl mb-2">Latest Blogs</h3>
          <p className="text-gray-600 text-sm">
            Regularly updated technical content for developers.
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="font-semibold text-xl mb-2">
            Clean & Practical Content
          </h3>
          <p className="text-gray-600 text-sm">
            Articles are written in a simple, practical, and easy-to-follow
            format.
          </p>
        </div>
      </div>
    </div>
  );
}
