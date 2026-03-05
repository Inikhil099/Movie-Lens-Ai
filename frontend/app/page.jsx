"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { backendUrl } from "@/public/assets";
import { setUserInfo } from "@/lib/redux/slices/AuthSlice";

const page = () => {
  const user = useAppSelector((state) => state.auth.userdata);

  const dispatch = useAppDispatch();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const getme = async () => {
      setisLoading(true);
      try {
        const res = await backendUrl.get(`/user/me`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(setUserInfo(res.data));
        }
      } catch (error) {
        toast.error("You're not logged in");
      } finally {
        setisLoading(false);
      }
    };
    if (!user) {
      getme();
    }
  }, []);

  // useEffect(() => {
  //   if (!localStorage.getItem("guestCredit")) {
  //     localStorage.setItem("guestCredit", 1);
  //   }
  // }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Landing />;
};

export default page;
