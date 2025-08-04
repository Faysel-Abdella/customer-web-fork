import { AddressListItemSkeleton } from "./AddressListItemSkeleton";

const AddressListSkeleton = () => {
  return (
    <div className="grid gap-6">
      {/* Render 3 skeleton items as a placeholder */}
      {Array.from({ length: 3 }).map((_, index) => (
        <AddressListItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default AddressListSkeleton;