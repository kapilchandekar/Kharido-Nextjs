"use client";
import Image from "next/image";

import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import error from "../Assets/404.jpg";

const AuthWrapper = ({ children }) => {
  const { data} = useGetUserQuery(null);

  if (data?.user) {
    return (
      <div>
        <Image style={{ height: "100vh", width: "100%" }} src={error} />
      </div>
    );
  }

  if (!data?.user) {
    // While redirecting, don't show anything
    return <>{children}</>;
  }
};

export default AuthWrapper;
