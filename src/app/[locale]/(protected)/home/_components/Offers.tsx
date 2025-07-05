import { BadgePercent } from "lucide-react";

import { getOffersList } from "@/actions/actions";

import OffersCard from "./OffersCard";

const Offers = async () => {
  const { data } = await getOffersList();

  if (data)
    return (
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Explore Offers
            </h2>
            <p className="text-muted-foreground">
              See great deals and discounts on your favorite dishes
            </p>
          </div>

          <BadgePercent className="text-primary h-8 w-8" />
        </div>
        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.slice(0, 4).map((offer) => (
            <OffersCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    );
};

export default Offers;
