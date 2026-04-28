import React, { useRef, useState } from "react";
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
import { signupSchema } from "@/validation/signupSchema.js";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const fileRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    profile: "",
  });

  const passwordChecks = {
    length: formData.password.length >= 6,
    upper: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[@$!%*?&#]/.test(formData.password),
  };

  const getInputData = async (e) => {
    const { name, value, files } = e.target;
    const inputValue = name === "profile" ? files[0] : value.trim();

    setFormData((pre) => ({ ...pre, [name]: inputValue }));

    try {
      await signupSchema.validateAt(name, {
        ...formData,
        [name]: inputValue,
      });
      setErrors((prev) => ({ ...prev, [name]: null }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: [err.message] }));
    }
  };

  const setPostData = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(formData, { abortEarly: false });

      setLoading(true);

      const registerData = new FormData();
      registerData.append("username", formData.username);
      registerData.append("email", formData.email);
      registerData.append("password", formData.password);
      registerData.append("image", formData?.profile);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        registerData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (res.data.success) {
        navigate("/verify", { state: { email: formData.email } });
        toast.success("Account created successfully ✅");
      }
    } catch (error) {
      console.log("error is ", error);

      if (error.name === "ValidationError") {
        const validationErrors = {};

        error.inner.forEach((err) => {
          if (!validationErrors[err.path]) {
            validationErrors[err.path] = err.message;
          }
        });

        setErrors(validationErrors);
      } else {
        toast.error(error.response?.data?.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Join My Blog ✨</h2>
          <p className="text-gray-500 mt-2">
            Create account and start sharing your thoughts
          </p>
        </div>

        {/* Card */}
        <form onSubmit={setPostData}>
          <Card className="shadow-xl rounded-2xl border-none">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-center">
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Sign up to start writing blogs
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Username */}
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input
                    onChange={getInputData}
                    value={formData.username}
                    name="username"
                    type="text"
                    placeholder="your username"
                    className={`${errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    onChange={getInputData}
                    value={formData.email}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <div>
                    <Label className={"mb-3"}>Password</Label>

                    <div className="relative">
                      <Input
                        onChange={getInputData}
                        value={formData.password}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="create strong password"
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
                      <p className="text-red-500 text-sm my-2">
                        {errors.password}
                      </p>
                    )}

                    {/* PASSWORD CHECKLIST (GREEN UI FIXED) */}
                    <ul className="text-sm mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <li
                        className={
                          passwordChecks.length
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {passwordChecks.length ? "✓" : "•"} At least 6
                        characters
                      </li>

                      <li
                        className={
                          passwordChecks.upper
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {passwordChecks.upper ? "✓" : "•"} One uppercase letter
                      </li>

                      <li
                        className={
                          passwordChecks.number
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {passwordChecks.number ? "✓" : "•"} One number
                      </li>

                      <li
                        className={
                          passwordChecks.special
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {passwordChecks.special ? "✓" : "•"} One special
                        character
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div>
                    <input
                      onChange={getInputData}
                      name="profile"
                      ref={fileRef}
                      type="file"
                      className={"hidden"}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileRef.current.click()}
                    >
                      Profile Picture
                    </Button>

                    {formData.profile && (
                      <div className="mt-3 flex flex-col gap-2">
                        <p className="text-green-600 text-sm">
                          ✓ {formData.profile.name}
                        </p>

                        <img
                          src={URL.createObjectURL(formData.profile)}
                          alt="preview"
                          className="w-20 h-20 mt-2 rounded-full object-cover border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
