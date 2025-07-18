import RestaurantsFilters from "./RestaurantsFilters";

const RestaurantPageHeader = () => {
  return (
    <div className="flex w-full justify-between gap-5 max-lg:flex-col-reverse">
      <h2 className="text-3xl font-semibold">Restaurants</h2>
      <RestaurantsFilters className="overflow-x-auto pb-2" />
    </div>
  );
};

export default RestaurantPageHeader;
