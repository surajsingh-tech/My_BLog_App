import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white p-4 sticky top-0">
      <div className="flex container mx-auto justify-between items-center">
        {/* logo */}
        <div className="flex gap-2 items-center">
          <Link to={"/"}>
            <img src="" alt="logo" />
          </Link>
          <p className="hidden sm:block  text-2xl">
            Meta <span className="font-bold text-2xl"> Blog </span>
          </p>
        </div>
        {/* center content  */}
        <ul className="hidden sm:flex gap-5 text-xl font-normal justify-center items-center text-gray-700">
          <Link
            to={"/"}
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Home
          </Link>
          <Link
            to={"/blog"}
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Blog
          </Link>
          <Link
            to={"/about"}
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Contact
          </Link>
        </ul>
        <Link className="bg-orange-500 text-white px-8 py-2 rounded-full hover:cursor-pointer hover:bg-orange-600 duration-300">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
