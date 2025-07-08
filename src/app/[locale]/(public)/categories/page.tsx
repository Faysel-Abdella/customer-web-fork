import React from "react";

import TitleBanner from "../../(marketing)/_components/TitleBanner";

import ItemsList from "./_components/ItemsList";
interface CategoryPageProps {
  searchParams: Promise<{ id: string }>;
}

const categories = [
  { id: "1", title: "Food" },
  { id: "2", title: "Drinks" },
  { id: "3", title: "Other" },
];

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {
  const { id } = (await searchParams) || "1";

  const category = categories.find((item) => item.id == id);
  return (
    <div className="min-h-dvh">
      <TitleBanner title={category?.title || "Category"} className="pt-20" />

      <div className="py-14 lg:px-16 xl:px-32">
        <ItemsList id={id} />
      </div>
    </div>
  );
};

export default CategoryPage;
