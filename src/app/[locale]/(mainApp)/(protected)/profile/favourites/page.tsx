import { Suspense } from "react";

import FavoritesList from "./_components/FavoritesList";

const FavouritesPage = () => {
  return (
    <div className="w-full space-y-6 px-10 py-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">Favorites</h2>
        </div>
      </div>
      <Suspense>
        <FavoritesList />
      </Suspense>
    </div>
  );
};

export default FavouritesPage;
