"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import getProducts from "../../../lib/getAllProducts";

const tshirts = () => {
    const [list, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productList = await getProducts();
                setProductList(productList?.result);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    console.log(process.env.NEXT_PUBLIC_DATA_BASE)
    return (
        <div className="">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {list.map((item) => (
                            <Link className="contents" href={`/product/${item?._id}`}>
                                <div className="xl:w-1/4 md:w-1/2 p-4">
                                    <div key={item._id} className="bg-gray-100 p-6 rounded-lg">
                                        <img
                                            className="rounded w-full object-cover object-center mb-6"
                                            src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/i/n/n/s-ts12-vebnor-original-imagwk4wbpgfr3yv.jpeg?q=70&crop=false"
                                            alt="content"
                                        />
                                        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                            {item?.title}
                                        </h3>
                                        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                            {item?.brandname}
                                        </h2>
                                        <p className="leading-relaxed text-base">
                                            {item?.description}
                                        </p>
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

export default tshirts;
