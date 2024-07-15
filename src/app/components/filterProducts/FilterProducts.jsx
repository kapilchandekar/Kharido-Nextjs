import Link from "next/link";

import { useSearchProductsQuery } from "@/lib/productSlice/productSlice";
import SkeletonLoader from "@/lib/SkelotonLoader";
import DynamicProductCard from "../card/DynamicProductCard";

const FilterProducts = ({ query }) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useSearchProductsQuery(query, {
    skip: !query, // Skip the query if debouncedQuery is empty
  });

  return (
    <div>
      {" "}
      <section class="text-gray-600 body-font">
        <h1 className="text-2xl text-center font-bold text-grey-900  bg-gray-200 ">
          "{query}"
        </h1>
        <div class="container lg:px-8 px-4 py-10 mx-auto">
          <div className="flex flex-wrap">
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}

            {!isLoading &&
              products?.map((item) => (
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
    </div>
  );
};

export default FilterProducts;
