"use client";

import { motion } from "framer-motion";
import { FaFilm, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import { setUserInfo } from "@/lib/redux/slices/AuthSlice";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { backendUrl } from "@/public/assets";

export default function Login() {
  const user = useAppSelector((state) => state.auth.userdata);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      if (res.status == 201) {
        dispatch(setUserInfo(res.data));
        router.push("/");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex justify-center items-center gap-2 text-2xl font-bold mb-6">
          <FaFilm className="text-purple-500" />
          Movie Lens AI
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          Welcome Back 👋
        </h2>

        {/* email  */}
        <div className="mb-4 relative">
          <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative flex gap-3 items-center">
          <FaLock className="absolute top-4 left-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
          <button
            onClick={() => setshowPassword(!showPassword)}
            className="text-xl cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            if (validateForm()) {
              handleLogin();
            }
          }}
          className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
