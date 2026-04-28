import React from "react";
import { useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state.email;
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center border-none">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800">
            Verify Your Email 📩
          </h1>

          {/* Description */}
          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            We’ve sent a verification link to your email {email} .
            <br />
            Please open your inbox and confirm your account.
          </p>

          {/* Icon */}
          <div className="flex justify-center my-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
              alt="email verification"
              className="w-24 h-24 sm:w-28 sm:h-28"
            />
          </div>

          {/* Info box */}
          <div className="bg-indigo-50 text-indigo-700 text-sm rounded-lg p-3">
            Didn’t receive email? Check spam or try again after few seconds.
          </div>
        </div>
      </div>
    </div>
  );
}
