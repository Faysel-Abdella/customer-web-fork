import Header from "../_components/Header";

import Banner from "./_components/Banner";
import { Categories } from "./_components/Categories";
import { TopRestaurants } from "./_components/TopRestaurants";
import { TrendingDishes } from "./_components/TrendingDishes";

const HomePage = () => {
  return (
    <div className="min-h-dvh">
      <Header />
      <div className="flex flex-col items-center p-10 pt-32">
        <div className="container flex w-full justify-center gap-10">
          <div className="flex w-2/3 flex-col gap-4">
            <Banner />
            <Categories />
            <TrendingDishes />
          </div>
          <div className="h-dvh w-1/3">
            <TopRestaurants />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
