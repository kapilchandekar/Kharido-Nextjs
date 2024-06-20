import Slider from "../components/slider/slider";
import ProductCard from "../components/card/ProductCard";

const home = () => {
  return (
    <div>
      <div className="">
        <Slider />
        <h1 className="text-2xl text-center font-medium mt-20 mb-5">Best Fashion Brand For You!</h1>
        <ProductCard/>
      </div>
    </div>
  );
};

export default home;
