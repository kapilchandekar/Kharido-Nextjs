import React from "react";
import Image from "next/image";

import "./ProductCard.css";
import "../../globals.css";

const DynamicProductCard = ({ item }) => {
  const product = [
    {
      title: "Graphic Print Men Grey Regular Shorts",
      brand: "Dixcy Scott Maximus ",
      category: "shorts",
      price: 400,
      img: "https://rukminim2.flixcart.com/image/440/660/xif0q/short/b/z/d/m-nate-shorts-mid-grey-melange-dixcy-scott-maximus-original-imagxe3ynqpenafr.jpeg?q=70",
    },
    {
      title:
        "ES-21 Hockey Walking/Outdoor/Gym & Traning Running Shoes For Men  (Grey)",
      brand: "CLYMB ",
      category: "shoes",
      price: 400,
      img: "https://rukminim2.flixcart.com/flap/440/660/image/fb6b7ecf57d73e82.jpg?q=80",
    },
    {
      title: "Men Printed Round Neck Polyester White, Black T-Shirt",
      brand: "sti ",
      category: "tshirt",
      price: 400,
      img: "https://rukminim2.flixcart.com/image/440/660/xif0q/t-shirt/r/o/t/m-gucci-tshirt-sti-original-imahf7w3dkxzkd6g.jpeg?q=90",
    },
    {
      title: "Men Slim Fit Striped Cut Away Collar Casual Shirt",
      brand: "The Indian Garage Co.",
      category: "shirt",
      price: 400,
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/p/q/p/xxl-1122-shcsoxyd-08-03-the-indian-garage-co-original-imagmnrgbzdstrnp.jpeg?q=70",
    },
  ];

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
