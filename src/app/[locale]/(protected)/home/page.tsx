import Header from "@/components/Header";

import Banner from "./_components/Banner";
import { Categories } from "./_components/Categories";
import { TopRestaurants } from "./_components/TopRestaurants";
import { TrendingDishes } from "./_components/TrendingDishes";

const HomePage = () => {
  return (
    <div className="h-full min-h-dvh">
      <Header />
      <div className="flex flex-col items-center pt-32 md:p-10 md:pt-32">
        <div className="container flex w-full justify-center gap-10 max-xl:flex-col">
          <div className="flex w-2/3 flex-col gap-4 max-xl:w-full">
            <Banner />
            <div className="flex flex-col gap-4 p-5">
              <Categories />
              <TrendingDishes />
            </div>
          </div>
          <div className="w-1/3 max-xl:w-full max-xl:px-5 xl:min-h-dvh">
            <TopRestaurants />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
