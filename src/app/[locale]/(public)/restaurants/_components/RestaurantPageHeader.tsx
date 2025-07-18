import RestaurantsFilters from "./RestaurantsFilters";

const RestaurantPageHeader = () => {
  return (
    <div className="flex w-full justify-between gap-5 max-lg:flex-col">
      <h2 className="text-3xl font-semibold">Restaurants</h2>
      <RestaurantsFilters className="flex-wrap" />
    </div>
  );
};

export default RestaurantPageHeader;
