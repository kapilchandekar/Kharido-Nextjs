"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BiUser } from "react-icons/bi";
import { useSession, signOut } from "next-auth/react";

import Search from "./Search";
import logo from "../../Assets/logo2.png";
import SideBar from "../sideBar/sideBar";
import AlertModal from "../modal/alertModal";
import logout from "../../../hooks/useLogout";
import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import "../../globals.css";
import CustomLink from "./CustomLink";
import "./Header.css";

const Header = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { data } = useGetUserQuery(null);
  const { data: session } = useSession();

  const navItems = [
    { name: "T-Shirts", href: "/tshirts" },
    { name: "Hoddies", href: "/hoddies" },
    { name: "Sneakers", href: "/sneakers" },
  ];

  const handleLogout = async () => {
    if (data?.user) {
      await logout();
      window.location.reload();
    } else {
      signOut();
    }
  };

  return (
    <div>
      <header>
        {session?.user && (
          <div className="text-center mt-2 primary-text">
            Welcome, {session?.user?.name}{" "}
          </div>
        )}
        {data?.user && (
          <div className="text-center mt-2 primary-text">
            Welcome, {data?.user?.username}{" "}
          </div>
        )}
        <nav
          class=" mx-auto flex items-center justify-between bgitems-center  py-4  lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <Link href="/" class="-m-1.5 p-1.5">
              <Image src={logo} alt="Kharido" width={190} />
            </Link>
          </div>

          <div class="flex lg:hidden items-center">
            <FaShoppingCart
              className="mr-2 primary-text text-2xl"
              onClick={() => setSideBarOpen(true)}
            />
            <BiUser className="text-2xl ml-1" />

            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navItems.map((item) => (
              <CustomLink key={item.name} href={item.href}>
                {item.name}
              </CustomLink>
            ))}
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2.5 items-center">
            <button
              type="submit"
              className="flex  justify-center rounded-md btn-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                if (data?.user || session?.user) {
                  setModalOpen(true);
                } else {
                  router.push("/login");
                }
              }}
            >
              {data?.user || session?.user ? "Logout" : "Login"}
            </button>
            <button
              type="submit"
              className="flex items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm btn-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setSideBarOpen(true)}
            >
              Cart
              <FaShoppingCart className="ml-1" />
            </button>

            <BiUser className="text-4xl " />
          </div>
        </nav>
        {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
        <div
          class={` ${mobileMenuOpen ? "lg:block" : "hidden"}`}
          role="dialog"
          aria-modal="true"
        >
          {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
          <div class="fixed inset-0 z-10"></div>
          <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <Link href="/" class="-m-1.5 p-1.5">
                <Image src={logo} alt="Kharido" width={140} />
              </Link>
              <button
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <div class="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <CustomLink
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </CustomLink>
                    ))}
                  </div>
                </div>
                <div class="py-6">
                  <button
                    class="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-pink-700 hover:bg-gray-50"
                    onClick={() => {
                      if (data?.user || session?.user) {
                        setModalOpen(true);
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    {data?.user || session?.user ? "Logout" : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Search />
        </Suspense>
      </header>
      <AlertModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Logout"
        subTitle="Are you sure you want to logout your account?"
        handleClick={handleLogout}
      />
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
    </div>
  );
};

export default Header;
