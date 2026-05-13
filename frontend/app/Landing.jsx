"use client";
import {
  FaFilm,
  FaSearch,
  FaSignInAlt,
  FaSmile,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { FaLock, FaUserPlus } from "react-icons/fa6";
import { backendUrl } from "@/public/assets";
import { setUserInfo } from "@/lib/redux/slices/AuthSlice";
import RazorPayButton from "./components/RazorPayButton";

const sentimentColor = {
  Positive: "text-green-500",
  Mixed: "text-yellow-500",
  Negative: "text-red-500",
};

const imdbRegex = /^tt\d{7,8}$/;

export default function Landing() {
  const [imdbId, setImdbId] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const userinfo = useAppSelector((state) => state.auth.userdata);
  const dispatch = useAppDispatch();
  const [AiSummary, setAiSummary] = useState("");

  const router = useRouter();

  // <--------------------------------------------------------->
  // handle search fot the guest users

  const handleSearchForGuestUser = async () => {
    if (!imdbId.trim()) return toast.error("Please enter IMDb ID");
    if (!imdbRegex.test(imdbId)) {
      return toast.error("Invalid IMDb ID format");
    }
    try {
      // tt0848228
      const res = await backendUrl.post(
        `/api/guest/movie/${imdbId}`,
        { token: localStorage.getItem("guestToken") },
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        setMovie(res.data.movieDetails);
        localStorage.setItem("token", res.data.token);
        setLoadingInsight(true);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data)
    }
  };

  // <---------------------------------------------------------------->

  // handle search only for the logged in users
  const handleSearch = async () => {
    if (!imdbId.trim()) return toast.error("Please enter IMDb ID");
    if (!imdbRegex.test(imdbId)) {
      return toast.error("Invalid IMDb ID format");
    }
    try {
      // tt0848228
      const res = await backendUrl.get(`/api/movie/${imdbId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setMovie(res.data.movieDetails);
        dispatch(setUserInfo(res.data.user));
        setLoadingInsight(true);
        const aiSummary = await backendUrl.post(
          `/api/movie/ai-summary`,
          {
            moviename: res.data.movieDetails.Title,
          },
          { withCredentials: true },
        );
        if (aiSummary.status == 200) {
          const summ = aiSummary.data.summary
            .split("Summary:")[1]
            .split("Sentiment:")[0]
            .replace(/\n/g, " ")
            .trim();

          const senti = aiSummary.data.summary.split("Sentiment:")[1].trim();

          setAiSummary([summ, senti]);
          setLoadingInsight(false);
        }
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await backendUrl.get(`/user/logout`, {
        withCredentials: true,
      });
      if (res.status == 200) {
        toast.success(res.data);
        dispatch(setUserInfo(undefined));
        localStorage.removeItem("token");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const GetGuestCredits = async () => {
      // function to give 2 credits to the guest user
      try {
        const res = await backendUrl.get(`/api/guest/token`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    if (!userinfo) {
      if (localStorage.getItem("token")) {
        return;
      }
      GetGuestCredits();
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-16">
      {userinfo ? (
        <div className="flex justify-center absolute right-5 top-5 gap-x-5 items-center ">
          <div className="">
            <RazorPayButton />
          </div>
          <div className="">
            <span>Total Credits</span> <span>{userinfo.credits}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLogout()}
            className="flex items-center gap-2 px-6 py-3 rounded-full 
          bg-gray-800 border border-gray-600 
          hover:border-red-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] 
          transition-all duration-300 cursor-pointer"
          >
            <FaSignInAlt className="text-purple-400" />
            <span className="font-semibold">Logout</span>
          </motion.button>
        </div>
      ) : (
        <div className="flex gap-4 justify-center absolute right-5 top-5 items-center flex-wrap">
          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 px-6 py-3 rounded-full 
        bg-gray-800 border border-gray-600 
        hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] 
        transition-all duration-300 cursor-pointer"
          >
            <FaSignInAlt className="text-purple-400" />
            <span className="font-semibold">Login</span>
          </motion.button>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/signup")}
            className="flex items-center gap-2 px-6 py-3 rounded-full 
        bg-linear-to-r from-purple-600 to-indigo-600 
        hover:from-purple-700 hover:to-indigo-700 
        shadow-lg hover:shadow-purple-600/40
        transition-all duration-300 cursor-pointer"
          >
            <FaUserPlus />
            <span className="font-semibold">Sign Up</span>
          </motion.button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center items-center gap-3 text-3xl font-bold">
          <FaFilm className="text-purple-500" />
          Movie Lens Ai
        </div>
        <p className="text-gray-400 mt-2">
          AI-powered movie sentiment & insights
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <div className="flex w-full max-w-xl bg-gray-800 rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Enter IMDb ID (e.g. tt0111161)"
            value={imdbId}
            onChange={(e) => setImdbId(e.target.value)}
            className="flex-1 px-6 py-3 bg-transparent outline-none text-white"
          />
          <button
            onClick={() => {
              !userinfo ? handleSearchForGuestUser() : handleSearch();
            }}
            className="bg-purple-600 cursor-pointer hover:bg-purple-700 px-6 flex items-center gap-2 transition-all"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </motion.div>

      {loading && (
        <div className="text-center mt-10 text-purple-400 animate-pulse">
          Fetching insights...
        </div>
      )}

      {movie && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-3"
        >
          {/* Poster */}
          <div className="md:col-span-1">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="md:col-span-2 p-8 space-y-6">
            <h2 className="text-3xl font-bold">{movie.Title}</h2>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                {movie.imdbRating}
              </div>

              <div>📅 {movie.Released}</div>

              <div>🎬 {movie.Genre}</div>

              <div>⏱ {movie.Runtime}</div>
            </div>

            {/* Cast */}
            <div className="flex items-center gap-2 text-gray-400">
              <FaUsers />
              {movie.Actors}
            </div>

            {/* Plot */}
            <p className="text-gray-300">{movie.Plot}</p>

            {/* AI Insight */}
            <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <FaSmile className="text-purple-400" />
                AI Audience Insight
              </h3>

              {/* Loading Animation */}
              {!userinfo ? (
                <div className="">
                  <FaLock /> <p className="">Log in to get AI Summary</p>
                </div>
              ) : (
                <>
                  {loadingInsight ? (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-5/6"></div>
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-4/6"></div>
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-3/6"></div>

                      <div className="flex gap-2 mt-3">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-gray-400">{AiSummary[0]}</p>

                      <div className="">
                        <span
                          className={`py-1 rounded-full text-sm font-semibold `}
                        >
                          Sentiment{" "}
                        </span>
                        {" : "}
                        <span
                          className={`py-1 rounded-full text-sm font-semibold ${
                            sentimentColor[AiSummary[1]]
                          } `}
                        >
                          {AiSummary[1]}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
