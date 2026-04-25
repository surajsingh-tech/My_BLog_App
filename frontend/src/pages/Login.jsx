import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useContext } from "react";
import { StoreContext } from "@/context/storeContext";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email Field is Require"),
  password: yup.string().required("Password Field is Require"),
});

export default function Login() {
  const { setUser } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const getInputData = async (e) => {
    const { name, value } = e.target;
    const trimedValue = value.trim();
    setFormData((pre) => ({ ...pre, [name]: trimedValue }));
    try {
      await schema.validateAt(name, { ...formData, [name]: trimedValue });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const setPostData = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const formError = {};
      error?.inner?.forEach((err) => {
        formError[err.path] = err.message;
      });
      setErrors(formError);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } },
      );

      if (res.data.success) {
        navigate("/");
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data?.accessToken);
        toast.success("Welcome back to your Blog Dashboard 🚀");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Welcome Back ✍️</h2>
          <p className="text-gray-500 mt-2">
            Sign in to continue reading, writing & managing your blogs
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-xl rounded-2xl border-none">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">
              Login to My Blog
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Access your dashboard, drafts & published stories
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={getInputData}
                  value={formData.email}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  className={`${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm text-indigo-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    onChange={getInputData}
                    value={formData.password}
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />

                  <Button
                    size="sm"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Button
              type="button"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={setPostData}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing you in...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}
