import TitleBanner from "../../(marketing)/_components/TitleBanner";

import RestaurantsList from "./_components/RestaurantsList";

const RestaurantsPage = () => {
  return (
    <div className="min-h-dvh">
      <TitleBanner title="Restaurants" className="pt-20" />
      <RestaurantsList />
    </div>
  );
};

export default RestaurantsPage;
