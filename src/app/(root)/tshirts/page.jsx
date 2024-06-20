"use client";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useGetProductsQuery } from "@/lib/productSlice/productSlice";
import SkeletonLoader from "@/lib/SkelotonLoader";

const DynamicProductCard = dynamic(() =>
  import("@/app/components/card/DynamicProductCard")
);

const tshirts = () => {
  const { data, isLoading } = useGetProductsQuery(null);

  let tshirtList = [];
  tshirtList = data?.result.filter((item) => item?.category == "tshirt");

  return (
    <section class="text-gray-600 body-font">
      <h1 className="text-2xl text-center font-bold text-grey-900  bg-gray-200 ">
        Men's T Shirts
      </h1>
      <div class="container lg:px-8 px-4 py-10 mx-auto">
        <div className="flex flex-wrap">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}

          {!isLoading &&
            tshirtList?.map((item) => (
              <Link
                key={item._id}
                className="contents"
                href={`/product/${item._id}`}
              >
                <DynamicProductCard item={item} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default tshirts;
