import React from "react";
import Image from "next/image";

import "./ProductCard.css";
import "../../globals.css";

const DynamicProductCard = ({ item }) => {
  return (
    <div class="lg:w-1/4 md:w-1/2 p-4">
      <div className="h-80">
        <a class="block relative rounded overflow-hidden h-full card-img">
          <Image
            loading="lazy"
            width={500}
            height={500}
            alt="ecommerce"
            class="object-cover object-center w-full h-full block"
            src={item?.img}
          />
        </a>
      </div>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          {item?.brand}
        </h3>
        <h2 class="text-gray-900 title-font text-lg font-medium">
          {item?.title}
        </h2>
        <p class="mt-1">${item?.price}</p>
      </div>
    </div>
  );
};

export default DynamicProductCard;
