"use client";

import { motion } from "framer-motion";
import { FaFilm, FaUser, FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/public/assets";
import { FaEye } from "react-icons/fa6";
import { toast } from "sonner";
import { setUserInfo } from "@/lib/redux/slices/AuthSlice";

export default function Signup() {
  const user = useAppSelector((state) => state.auth.userdata);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
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

  const handleSignup = async () => {
    try {
      const res = await backendUrl.post(
        `/auth/signup`,
        { name, email, password },
        { withCredentials: true },
      );
      if (res.status == 201) {
        dispatch(setUserInfo(res.data));
        localStorage.setItem("token", res.data.token);
        router.push("/");
        toast.success("signed in successfully");
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
          Create Account 🚀
        </h2>

        <div className="mb-4 relative">
          <FaUser className="absolute top-4 left-4 text-gray-400" />
          <input
            type="text"
            onChange={(e) => setname(e.target.value)}
            placeholder="Full Name"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>

        <div className="mb-4 relative">
          <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>

        <div className="mb-6 relative flex gap-x-2 items-center">
          <FaLock className="absolute top-4 left-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
          <button
            onClick={() => setshowPassword(!showPassword)}
            className="text-xl cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={() => {
            if (validateForm()) {
              handleSignup();
            }
          }}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
