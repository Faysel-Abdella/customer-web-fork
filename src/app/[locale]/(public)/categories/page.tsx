import React from "react";

import CategoryHeader from "./_components/CategoryHeader";
import ItemsList from "./_components/ItemsList";
interface CategoryPageProps {
  searchParams: Promise<{ id: string }>;
}

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {
  const { id } = (await searchParams) || "1";

  return (
    <div className="min-h-dvh space-y-10 px-3 pt-36 pb-20 sm:px-4 md:px-10 lg:px-14">
      <CategoryHeader id={id} />
      <ItemsList id={id} />
    </div>
  );
};

export default CategoryPage;
