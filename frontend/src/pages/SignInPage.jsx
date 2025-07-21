import {
  Eye,
  EyeOff,
  Image,
  Lock,
  MessageSquareIcon,
  MessagesSquareIcon,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthSkeleton from "../components/AuthSkeleton";

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen items-center">
      <div className="grid md:grid-cols-2">
        <div className="w-full flex flex-col items-center">
          <MessagesSquareIcon />
          <h2>Welcome Back</h2>
          <p>Sign into your account</p>

          <form className="w-full relative p-8 space-y-4">
          
            <div className="relative flex w-full items-center">
              <MessageSquareIcon className="absolute insert-y-0 left-0 ml-1 size-5 opacity-30" />
              <label htmlFor="email" className="w-full">
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="border rounded p-1 w-full border-gray-500/45 pl-7"
                />
              </label>
            </div>

            <div className="relative flex w-full items-center">
              <Lock className="absolute insert-y-0 left-0 ml-1 size-5 opacity-30" />
              <label htmlFor="email" className="w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••••"
                  className="border rounded p-1 w-full border-gray-500/45 pl-7"
                />
              </label>
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute insert-y-0 right-0 mr-1 size-5 opacity-30"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute insert-y-0 right-0 mr-1 size-5 opacity-30"
                />
              )}
            </div>


            <div>
              <button type="submit" className="w-full p-3 bg-green-800 text-gray-300 rounded">
                Sign in 
              </button>
            </div>
          </form>
          <div className="flex flex-wrap items-center space-x-2">
            <p>Don't have an account?</p>
            <Link to="/signup" className="underline cursor-pointer">
            Sign Up
            </Link>
           </div>
        </div>
        <div className="w-full">
          <AuthSkeleton title={"Welcome to HackChat"} text={"Join our community of hackers to learn how to build the next web"}/>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
