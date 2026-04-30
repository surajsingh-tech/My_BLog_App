import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import ReadBlog from "./pages/ReadBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "readblog/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ReadBlog />{" "}
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <VerifyEmail />,
    },
    {
      path: "/verify/:token",
      element: <Verify />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/verify-otp/:email",
      element: <VerifyOTP />,
    },
    {
      path: "/change-password/:email",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}
