"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../app/reduxAuth/slice/AuthSlice";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useRouter();
  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        navigate.push("/");
      })
      .catch((error) => {
        toast.error("Login Error:", error);
        navigate.push("/login");
      });
  };

  const handleClick = () => {
    navigate.push("/signup");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate.replace("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-[#1D1B30] flex items-center justify-center">
      <div className="max-w-md w-full bg-[#0C0A20] p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-100">
            Login in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none bg-[#1D1B30] rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none bg-[#1D1B30] rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="text-center font-medium text-red-500 text-[15px] w-full">
            {error && typeof error === "object" ? error.message : error}
          </div>
        </form>
        <div className="-mt-0">
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              onClick={handleClick}
              className="font-medium text-white underline hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
