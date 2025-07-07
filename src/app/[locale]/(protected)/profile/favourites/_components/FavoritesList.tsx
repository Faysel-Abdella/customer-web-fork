import { X } from "lucide-react";

import { getFavoritesList } from "@/actions/profile.actions";
import { Card, CardContent } from "@/components/ui/card";

import FavoritesListItem from "./FavoritesListItem";

const FavoritesList = async () => {
  const { data, error } = await getFavoritesList();
  if (data)
    return (
      <div>
        <div className="space-y-3">
          {data.map((favourite) => (
            <FavoritesListItem
              key={favourite.model_detail.id}
              restaurant={favourite.model_detail}
            />
          ))}
        </div>

        {data.length === 0 && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">
                You have no favorite restaurants yet.
              </h3>
              <p className="text-muted-foreground">
                Tap the heart icon on any restaurant to save it here for easy
                access.
              </p>
            </CardContent>
          </Card>
        )}
        {error && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <X className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Failed to fetch Favourites
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    );
};

export default FavoritesList;
