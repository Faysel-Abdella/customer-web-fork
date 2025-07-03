import React, { Suspense } from "react";

import AddAddressModal from "./_components/AddAddressModal";
import AddressList from "./_components/AddressList";
import AddressListSkeleton from "./_components/AddressListSkeleton";

const AddressesPage = () => {
  return (
    <div className="w-full px-1 py-5 md:px-10">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Addresses</h2>
            <p className="text-muted-foreground mt-2">
              Manage your shipping and billing addresses.
            </p>
          </div>
          <AddAddressModal />
        </div>

        <Suspense fallback={<AddressListSkeleton />}>
          <AddressList />
        </Suspense>
      </div>
    </div>
  );
};

export default AddressesPage;
