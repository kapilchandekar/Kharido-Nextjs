"use client";

import React from "react";
import Slider from "../components/slider/slider";
import ProductCard from "../components/card/ProductCard";

const home = () => {
  return (
    <div>
      <div className="">
        <Slider />
        <ProductCard/>
      </div>
    </div>
  );
};

export default home;
