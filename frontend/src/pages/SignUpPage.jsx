import {
  Eye,
  EyeOff,
  Image,
  Lock,
  MessageSquareIcon,
  MessagesSquareIcon,
  User,
  Loader,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthSkeleton from "../components/AuthSkeleton";
import useAuthHook from "../hooks/useAuthhook";
import toast from "react-hot-toast";

function SignUpPage() {
  const { signUp, isSigningUp } = useAuthHook();
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUpSuccess, setIsSignUpSuccess] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (isSigningUpSuccess) {
      toast.success("Signup successful");
      Navigate("/signin");
    }
  }, [isSigningUpSuccess, Navigate]);

  const handleUserDataSubmit = (e) => {
    e.preventDefault();
    const success = signUp(userData);
  };

  if (isSigningUp) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader size={30} className="animate-spin text-green-800" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="grid md:grid-cols-2 shadow-lg bg-white rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="w-full flex flex-col items-center p-8">
          <MessagesSquareIcon className="text-green-800 mb-2" size={40} />
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-gray-500 mb-4">Create a new account</p>

          <form className="w-full space-y-4" onSubmit={handleUserDataSubmit}>
            <div className="relative flex w-full items-center">
              <User className="absolute left-2 top-3 size-5 opacity-30" />
              <input
                type="text"
                id="username"
                placeholder="sahadev"
                className="border rounded p-2 w-full border-gray-500/45 pl-9"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div>

            <div className="relative flex w-full items-center">
              <MessageSquareIcon className="absolute left-2 top-3 size-5 opacity-30" />
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="border rounded p-2 w-full border-gray-500/45 pl-9"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div className="relative flex w-full items-center">
              <Lock className="absolute left-2 top-3 size-5 opacity-30" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••••"
                className="border rounded p-2 w-full border-gray-500/45 pl-9 pr-10"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className="absolute right-2 top-3 size-5 opacity-30 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-2 top-3 size-5 opacity-30 cursor-pointer"
                />
              )}
            </div>

            <div className="relative flex w-full items-center">
              <Image className="absolute left-2 top-3 size-5 opacity-30" />
              <input
                type="url"
                id="avatar"
                placeholder="Enter your avatar URL"
                className="border rounded p-2 w-full border-gray-500/45 pl-9"
                value={userData.avatar}
                onChange={(e) =>
                  setUserData({ ...userData, avatar: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-green-800 text-white rounded hover:bg-green-700 transition"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Creating Account..." : "Create an account"}
            </button>
          </form>

          <div className="flex mt-4 space-x-2">
            <p className="text-gray-600">Have an account?</p>
            <Link to="/signin" className="text-green-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="w-full hidden md:block">
          <AuthSkeleton
            title={"Welcome to HackChat"}
            text={
              "Join our community of hackers to learn how to build the next web"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
