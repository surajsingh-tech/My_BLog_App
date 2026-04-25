import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-10 ">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold tracking-tight">MyBlog</h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            A modern blog platform where you can read, write and explore amazing
            tech content daily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-foreground transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-foreground cursor-pointer">Technology</li>
            <li className="hover:text-foreground cursor-pointer">
              Programming
            </li>
            <li className="hover:text-foreground cursor-pointer">Design</li>
            <li className="hover:text-foreground cursor-pointer">AI & ML</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Contact</h3>
          <p className="text-sm text-muted-foreground">support@myblog.com</p>
          <p className="text-sm text-muted-foreground mt-1">+91 98765 40010</p>
          <p className="text-sm text-muted-foreground mt-3">Delhi, India</p>
        </div>
      </div>

      {/* Divider */}
      <div className="px-6">
        <Separator />
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>

        <div className="flex gap-6 mt-3 sm:mt-0">
          <Link to="/" className="hover:text-foreground transition">
            Privacy
          </Link>
          <Link to="/" className="hover:text-foreground transition">
            Terms
          </Link>
          <Link to="/" className="hover:text-foreground transition">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
