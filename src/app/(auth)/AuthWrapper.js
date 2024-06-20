"use client";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import error from "../Assets/404.jpg";
import PreLoader from "@/preLoader/preLoader";
import "../globals.css";

const AuthWrapper = ({ children }) => {
  const { data, isLoading } = useGetUserQuery(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoading && data?.user) {
      router.push("/");
    }
  }, [isLoading, data, router]);

  if (isLoading) {
    return (
      <div>
        <PreLoader />
      </div>
    );
  }

  if (data?.user) {
    return (
      <div>
        <Image className="h-screen w-full" src={error} alt="Error 404" />
      </div>
    );
  }

  return <Suspense fallback={<PreLoader />}>{children}</Suspense>;
};

export default AuthWrapper;
