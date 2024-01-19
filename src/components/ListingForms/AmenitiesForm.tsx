import { useContext, useState } from "react";
import FormLayout from "./FormLayout";
import EmptyCart from "@/assets/EmptyCart.svg";
import CardGroup from "./CardGroup";
import { ListingContext } from "@/pages/listings/create";

export default function AmenitiesForm({ setAmenities, amenities }: {setAmenities: Function, amenities: boolean[]}) {
  const listingContext = useContext(ListingContext);

  return (
    <FormLayout image={EmptyCart} validate={() => true}>
      <div className="flex flex-col w-[90%]">
        <h1 className="text-3xl pb-2">Amenities</h1>
        <h3 className="pb-5">
          Please list your amenities if applicable. Select all that apply.
        </h3>
        <CardGroup items={listingContext.amenityList} selected={amenities} setSelected={setAmenities}/>
      </div>
    </FormLayout>
  );
}
