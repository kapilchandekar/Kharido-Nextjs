import React from "react";
import { Carousel } from "flowbite-react";
import Image from "next/image";

import "./slider.css";

const Slider = () => {
  return (
    <div className="md:h-64 h-48 xl:h-96  lg:px-8 px-4">
      <Carousel>
        <div className="h-full w-full">
          <Image
            src="https://img.freepik.com/free-vector/geometric-fashion-collection-twitch-banner_23-2149977420.jpg?t=st=1718266907~exp=1718270507~hmac=117bd007105b507c4a660fe7d9bd638cf136cc3e7d0a345c4c4db84ad1c20df0&w=1380"
            alt="banner"
            className="w-full h-full md:object-cover rounded-none"
            width={2000}
            height={2000}
          />
        </div>
        <div className="md:h-64 h-48 xl:h-96  lg:px-8 px-4">
          <Image
            src="https://img.freepik.com/premium-vector/sports-shoe-facebook-cover-page-template_619609-68.jpg?w=1380"
            alt="banner"
            className="w-full h-full md:object-cover rounded-none"
            width={2000}
            height={2000}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
