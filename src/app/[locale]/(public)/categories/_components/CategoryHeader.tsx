import React from "react";

const categories = [
  { id: "1", title: "Food" },
  { id: "2", title: "Drinks" },
  { id: "3", title: "Other" },
];

interface CategoryHeaderProps {
  id: string;
}
const CategoryHeader = ({ id }: CategoryHeaderProps) => {
  const category = categories.find((item) => item.id == id);
  return (
    <div>
      <h2 className="text-3xl font-semibold">{category?.title}</h2>
    </div>
  );
};

export default CategoryHeader;
