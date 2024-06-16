"use client";
import Image from "next/image";

import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import error from "../Assets/404.jpg";

import "../globals.css";

const AuthWrapper = ({ children }) => {
  const { data} = useGetUserQuery(null);

  if (data?.user) {
    return (
      <div>
        <Image className="h-screen w-full" src={error} alt="Error 404" />
      </div>
    );
  }

  if (!data?.user) {
    // While redirecting, don't show anything
    return <>{children}</>;
  }
};

export default AuthWrapper;
