import React from "react";
import { Carousel } from "flowbite-react";

import "./slider.css";

const Slider = () => {
  return (
    <div className="h_24_rem mt-8">
      {" "}
      <Carousel>
        <img
          src="https://img.freepik.com/free-photo/portrait-young-asian-woman-isolated-blue-studio-space_155003-12397.jpg?w=1060&t=st=1711889294~exp=1711889894~hmac=cd14b4602723248781c0855d666c069cbd010ddb2a4562a86598ad9b7021ab4c"
          alt="..."
        />

        <img src="https://i.ibb.co/d67kPVM/banner.jpg" alt="banner" />
      </Carousel>
    </div>
  );
};

export default Slider;
