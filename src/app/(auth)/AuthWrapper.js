"use client";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import error from "../Assets/404.jpg";
import PreLoader from "@/preLoader/preLoader";
import "../globals.css";

const AuthWrapper = ({ children }) => {
  const { data, isLoading } = useGetUserQuery(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading && data?.user && session?.user  ) {
      router.push("/");
    }
  }, [isLoading, data, router]);

  if (isLoading || status === "loading") {
    return (
      <div>
        <PreLoader />
      </div>
    );
  }

  if (data?.user || session) {
    return (
      <div>
        <Image className="h-screen w-full" src={error} alt="Error 404" />
      </div>
    );
  }

  return <Suspense fallback={<PreLoader />}>{children}</Suspense>;
};

export default AuthWrapper;
