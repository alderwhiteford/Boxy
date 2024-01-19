import { useContext, useEffect, useState } from "react";
import FormLayout from "./FormLayout";
import EmptyCart1 from "@/assets/EmptyCart_1.svg";
import CardGroup from "./CardGroup";
import { ListingContext } from "@/pages/listings/create";

export default function SpaceTypeForm({ setSpaceType, spaceType }: {setSpaceType: Function, spaceType: boolean[]}) {
  const listingContext = useContext(ListingContext)
  const [error, setError] = useState(false);

  const validate = () => {
    const ret = spaceType.reduce((acc: number, curr: boolean) => curr ? ++acc : acc, 0) < 1;
    setError(ret);
    return !ret;
  }

  useEffect(() => setError(false), [spaceType]);

  return (
    <FormLayout image={EmptyCart1} validate={validate}>
      <div className="flex flex-col w-[90%]">
        <h1 className="text-3xl pb-2">Space Description</h1>
        <h3 className="pb-5">
        Please Describe Your Storage Space. Select All That Apply.
        </h3>
        <CardGroup items={listingContext.spaceTypeList} selected={spaceType} setSelected={setSpaceType} />
        {error ? <div className="text-red-500 mt-2">Please select at least 1 space type</div> : undefined}
      </div>
    </FormLayout>
  );
}
