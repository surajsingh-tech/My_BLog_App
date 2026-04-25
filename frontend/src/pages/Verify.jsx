import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("Email Verified Successfully 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("Invalid or Expired Token ❌");
      }
    } catch (error) {
      setStatus("Verification Failed. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50">

      <div className="w-full max-w-md sm:max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Email Verification
          </h1>
          <p className="text-gray-500 mt-2">
            We are verifying your account for My Blog
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-xl rounded-2xl border-none">

          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Verification Status
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">

            {/* Loader / Icon */}
            {loading ? (
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-indigo-600" />
            ) : status.includes("Successfully") ? (
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            ) : (
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
            )}

            {/* Status Text */}
            <h2
              className={`text-xl font-semibold ${
                status.includes("Successfully")
                  ? "text-green-600"
                  : status.includes("Failed") || status.includes("Invalid")
                  ? "text-red-500"
                  : "text-gray-700"
              }`}
            >
              {status}
            </h2>

            {/* Helper text */}
            <p className="text-sm text-gray-500">
              {loading
                ? "Please wait while we verify your email..."
                : status.includes("Successfully")
                ? "Redirecting you to login page..."
                : "Please check your link or try again"}
            </p>

          </CardContent>

        </Card>

      </div>
    </div>
  );
}