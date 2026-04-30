import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { StoreContext } from "@/context/storeContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(StoreContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // active style function
  const activeClass = ({ isActive }) =>
    isActive ? "text-orange-500 " : "text-gray-700 hover:text-orange-500";

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
        <ul className="hidden sm:flex gap-5 text-xl">
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/blog" className={activeClass}>
            Blog
          </NavLink>
          <NavLink to="/about" className={activeClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={activeClass}>
            Contact
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={activeClass}>
              Dashboard
            </NavLink>
          )}
        </ul>

        {/* right side */}
        <div className="flex items-center gap-3">
          {/* 👤 USER AVATAR */}
          {user && (
            <img
              src={user?.profile?.url || ""}
              alt="user"
              onClick={() => navigate("/profile")}
              className="h-10 w-10 rounded-full object-cover border-2 border-orange-500 cursor-pointer hover:scale-105 transition"
            />
          )}

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Button
                onClick={logout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* mobile button */}
          <button
            className="sm:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 text-lg text-gray-700">
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/"
            className={activeClass}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/blog"
            className={activeClass}
          >
            Blog
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/about"
            className={activeClass}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/contact"
            className={activeClass}
          >
            Contact
          </NavLink>

          {user && (
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/dashboard"
              className={activeClass}
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <Button
              onClick={logout}
              className="bg-orange-500 text-white px-2 py-2 rounded-full"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-orange-500 w-[40%] text-white px-2 py-2 text-center rounded-full"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="bg-orange-500 w-[40%] text-white px-2 py-2 text-center rounded-full"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
