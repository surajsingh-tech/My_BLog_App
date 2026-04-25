import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white p-4 sticky top-0 shadow-sm z-50">
      <div className="flex container mx-auto justify-between items-center">

        {/* logo */}
        <div className="flex gap-2 items-center">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
          <p className="hidden sm:block text-2xl">
            My<span className="font-bold"> Blog</span>
          </p>
        </div>

        {/* desktop menu */}
        <ul className="hidden sm:flex gap-5 text-xl text-gray-700">
          <Link to="/" className="hover:text-orange-500 duration-300">Home</Link>
          <Link to="/blog" className="hover:text-orange-500 duration-300">Blog</Link>
          <Link to="/about" className="hover:text-orange-500 duration-300">About</Link>
          <Link to="/contact" className="hover:text-orange-500 duration-300">Contact</Link>
        </ul>

        {/* sign in */}
        <Link className="hidden sm:block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 duration-300">
          Sign in
        </Link>

        {/* mobile button */}
        <button
          className="sm:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 text-lg text-gray-700">
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/blog">Blog</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>

          <Link
            onClick={() => setMenuOpen(false)}
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-center"
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
}