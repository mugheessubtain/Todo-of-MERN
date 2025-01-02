"use client";

import { apiRoutes } from "@/constant/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCookie } from "cookies-next/client";
import { logIn } from "@/store/features/userSlice";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUserToApi = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); 
    const obj = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    axios
      .post(apiRoutes.login, obj)
      .then((res) => {
        console.log("res.data=>", res.data);
        setCookie("token", res.data?.data?.token);
        dispatch(logIn(res.data?.data?.user));
        setIsLoading(false);
        route.push("/task");
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.msg || "Something went wrong. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Sign in to your account
          </h1>
          {error && (
            <div className="mt-4 text-red-500 bg-red-100 border border-red-400 rounded-lg p-3 text-center dark:bg-red-800 dark:text-red-100">
              {error}
            </div>
          )}
          <form className="mt-6 space-y-4" onSubmit={loginUserToApi}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="xyz@gmail.com"
                className="mt-1 block w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="mt-1 block w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-lg text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              } dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Do not have an account yet?{" "}
            <Link
              href="/Signup"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
