"use client";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectTotalAmount,
} from "@/lib/productSlice/cartSlice";
import emptyCartImg from "../../Assets/marketing.png";
import "./sideBar.css";
import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import { BASE_URL } from "@/http";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { data } = useGetUserQuery(null);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = useSelector(selectTotalAmount);

  // Stripe payment

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const createStripeSession = async () => {
    if (data?.user) {
      const stripe = await stripePromise;
      const response = await fetch(`${BASE_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "appication/json" },
        body: JSON.stringify({
          items: cartItems,
          email: "test@gmail.com",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        stripe?.redirectToCheckout({ sessionId: data.id });
      }
    } else {
      toast.error("Please sign in to make Checkout");
    }
  };

  return (
    <div>
      <div>
        <Transition.Root show={sideBarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setSideBarOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-color shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setSideBarOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>

                                <HiOutlineXMark
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            {cartItems?.length === 0 && (
                              <div className="mt-20">
                                <Image src={emptyCartImg} />
                              </div>
                            )}
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {cartItems &&
                                  cartItems?.map((item) => (
                                    <li key={item?._id} className="flex py-6">
                                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                          src={item.img}
                                          alt="img"
                                          className="h-full w-full object-cover object-center"
                                        />
                                      </div>

                                      <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                          <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                              {/* <a href={product.href}> */}
                                              {item?.title}
                                              {/* </a> */}
                                            </h3>
                                            <p className="ml-4">
                                              {item?.price}
                                            </p>
                                          </div>
                                          <p className="mt-1 text-sm text-gray-500">
                                            {item?.color}
                                          </p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                          <p className="text-gray-500">
                                            Qty {item.availableQty}
                                          </p>
                                          <div className="flex border-2">
                                            <div
                                              className="px-2"
                                              onClick={() =>
                                                dispatch(
                                                  decreaseQuantity(item._id)
                                                )
                                              }
                                            >
                                              -
                                            </div>
                                            <div className="px-2">
                                              {item.availableQty}
                                            </div>
                                            <div
                                              className="px-2"
                                              onClick={() =>
                                                dispatch(
                                                  increaseQuantity(item._id)
                                                )
                                              }
                                            >
                                              +
                                            </div>
                                          </div>

                                          <div className="flex">
                                            <button
                                              type="button"
                                              className="font-medium text-indigo-600 hover:text-indigo-500"
                                              onClick={() =>
                                                handleRemoveItem(item?._id)
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {cartItems?.length > 0 && (
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>{totalAmount.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              Shipping and taxes calculated at checkout.
                            </p>
                            <div className="mt-6">
                              <Button
                                onClick={createStripeSession}
                                className="flex items-center justify-center rounded-md border border-transparent btn-primary px-6 py-3 text-base font-medium text-white shadow-sm"
                              >
                                Checkout
                              </Button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <p>
                                or{" "}
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() => setSideBarOpen(false)}
                                >
                                  Continue Shopping
                                  <span aria-hidden="true"> &rarr;</span>
                                </button>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default SideBar;
