"use client";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectTotalAmount,
} from "@/lib/productSlice/cartSlice";
import emptyCartImg from "../../Assets/marketing.png";
import { useGetUserQuery } from "@/lib/userSlice/userSlice";
import { BASE_URL } from "@/http";
import "./sideBar.css";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { data } = useGetUserQuery(null);

  const email = data?.user.email

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
      setLoading(true); // Set loading to true
      const stripe = await stripePromise;
      const response = await fetch(`${BASE_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          email: email
        }),
      });
      const data = await response.json();
      if (response.ok) {
        stripe?.redirectToCheckout({ sessionId: data.id });
      } else {
        setLoading(false); // Reset loading state if response is not ok
        toast.error("Failed to create Stripe session");
      }
    } else {
      router.push('/login');
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
                                <Image
                                  src={emptyCartImg}
                                  alt="EmptyCard"
                                  width={500}
                                  height={500}
                                />
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
                                        <Image
                                          src={item.img}
                                          alt="img"
                                          className="h-full w-full object-cover object-center"
                                          width={500}
                                          height={500}
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
                                {loading ? (
                                  <>
                                    <svg
                                      aria-hidden="true"
                                      role="status"
                                      class="inline mr-3 w-4 h-4 text-white animate-spin"
                                      viewBox="0 0 100 101"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                      ></path>
                                      <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                    Loading...
                                  </>
                                ) : (
                                  "Checkout"
                                )}
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
