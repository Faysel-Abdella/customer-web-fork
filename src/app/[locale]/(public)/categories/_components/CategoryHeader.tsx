interface CategoryHeaderProps {
  title: string;
  amount?: number;
}
const CategoryHeader = ({ amount, title }: CategoryHeaderProps) => {
  return (
    <div className="mb-8 flex items-center gap-2">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {amount && <p className="text-muted-foreground text-3xl">({amount})</p>}
    </div>
  );
};

export default CategoryHeader;
