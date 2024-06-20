"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior>
      <a
        className={`text-sm font-semibold leading-6 text-gray-900 ${
          isActive ? "primary-text " : ""
        }`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

export default CustomLink;
