"use client";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/lib/productSlice/productSlice";
import skeletonLoader from "@/app/components/header/skeletonLoader/Loader";



const hoddies = () => {
  const { data, isLoading } = useGetProductsQuery(null);

  let hoodiesList = [];
  hoodiesList = data?.result.filter((item) => item?.category == "hoodie");

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {isLoading && skeletonLoader}
            {hoodiesList?.map((item) => (
              <Link className="contents" href={`/product/${item?._id}`}>
                <div className="xl:w-1/4 md:w-1/2 p-4">
                  <div
                    key={item._id}
                    className="bg-gray-100 p-6 rounded-lg min-h-full "
                  >
                    <div className="h-80">
                      <Image
                        className="rounded w-full object-cover object-center h-full mb-6"
                        src={item?.img}
                        alt="content"
                        width={500}
                        height={500}
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

export default hoddies;
