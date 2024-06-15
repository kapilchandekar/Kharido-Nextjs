"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import getProducts from "@/lib/getAllProducts";

const pant = () => {
  const [pantList, setPantList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await getProducts();
        setPantList(
          productList?.result.filter((item) => item?.category === "pant")
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {" "}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {pantList.map((item) => (
              <Link className="contents" href={`/product/${item?._id}`}>
                <div className="xl:w-1/4 md:w-1/2 p-4">
                  <div
                    key={item._id}
                    className="bg-gray-100 p-6 rounded-lg min-h-full "
                  >
                    <div className="h-80">
                      <img
                        className="rounded w-full object-cover object-center h-full mb-6"
                        src={item?.img}
                        alt="content"
                      />
                    </div>

                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {item?.title}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {item?.brandName}
                    </h2>
                    <p className="leading-relaxed text-base">₹{item?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default pant;
