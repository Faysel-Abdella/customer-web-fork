import { CircleX } from "lucide-react";

import { getAddressList } from "@/actions/profile.actions";

import AddressListItem from "../addresses/_components/AddressListItem";

const AddressList = async () => {
  const { data, error } = await getAddressList();
  if (error)
    return (
      <div className="flex h-20 w-full items-center justify-center gap-2">
        <CircleX /> Something went wrong.
      </div>
    );
  if (data)
    return (
      <div className="grid gap-6">
        {data.map((address) => (
          <AddressListItem key={address.id} address={address} />
        ))}
      </div>
    );
};

export default AddressList;
