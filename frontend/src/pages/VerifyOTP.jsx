import { Alert, AlertDescription } from "@/components/ui/alert";
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
import axios from "axios";
import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleInput = (indx, value) => {
    const cleanValue = value.replace(/[^0-9]/g, "").slice(0, 1);
    const updatedOTP = [...OTP];
    updatedOTP[indx] = cleanValue;
    setOTP(updatedOTP);

    if (cleanValue && indx < 5) {
      inputRef.current[indx + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = OTP.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `http://localhost:8000/api/v1/user/verify-otp/${email}`,
        { otp: finalOtp },
      );

      if (res.data.success) {
        setIsVerified(true);
        setSuccessMessage(res.data.message);
        setOTP(["", "", "", "", "", ""]);

        setTimeout(() => {
          navigate(`/change-password/${email}`);
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOTP = () => {
    setOTP(["", "", "", "", "", ""]);
    setError("");
    inputRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            OTP Verification 🔐
          </h1>
          <p className="text-gray-500 mt-2">Enter the 6-digit code sent to</p>
          <p className="text-indigo-600 font-medium">{email}</p>
        </div>

        {/* Card */}
        <Card className="shadow-xl rounded-2xl border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verify Code</CardTitle>
            <CardDescription>
              Enter OTP to continue password reset
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success */}
            {successMessage && (
              <p className="text-green-600 text-center font-medium">
                {successMessage}
              </p>
            )}

            {/* Success State */}
            {isVerified ? (
              <div className="text-center space-y-4 py-6">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <h3 className="text-xl font-semibold text-green-600">
                  Verified Successfully
                </h3>
                <p className="text-gray-500 text-sm">
                  Redirecting to reset password page...
                </p>
                <Loader2 className="mx-auto h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : (
              <>
                {/* OTP Inputs */}
                <div className="flex justify-center gap-2">
                  {OTP.map((digit, indx) => (
                    <Input
                      key={indx}
                      value={digit}
                      type="text"
                      maxLength={1}
                      ref={(el) => (inputRef.current[indx] = el)}
                      onChange={(e) => handleInput(indx, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-lg border focus:ring-2 focus:ring-indigo-500"
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || OTP.includes("")}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearOTP}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="justify-center text-sm text-gray-500">
            Wrong email?{" "}
            <Link
              to="/forgot-password"
              className="text-indigo-600 font-medium ml-1 hover:underline"
            >
              Go back
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
