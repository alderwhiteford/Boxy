import { useContext, useEffect, useState } from "react";
import CardGroup from "./CardGroup";
import FormLayout from "./FormLayout";
import Notifications from "@/assets/Notifications.svg";
import { ListingContext } from "@/pages/listings/create";

export default function ItemsForm({
  description,
  setDescription,
  setItems,
  items,
}: any) {
  const listingContext = useContext(ListingContext);
  const [error, setError] = useState(false);

  const validate = () => {
    const ret = items.reduce((acc: number, curr: boolean) => curr ? ++acc : acc, 0) < 1;
    setError(ret);
    return !ret;
  }

  useEffect(() => setError(false), [items]);

  return (
    <FormLayout image={Notifications} validate={validate}>
      <div className="flex flex-col w-[90%]">
        <h1 className="text-3xl pb-2">Item and Size Description</h1>
        <h3 className="mb-5">
          Please Describe The Type of Items You are Able to Store. Select all
          that apply.
        </h3>
        <CardGroup items={listingContext.itemsList} selected={items} setSelected={setItems}/>
        {error ? <div className="text-red-500 mt-2">Please select at least 1 item type</div> : undefined}
        <h3 className="mt-5 mb-5">
          To the best of your ability, please describe the size of the storage
          space (e.g. Basement, 500 sqft of empty space with 8 ft ceilings).{" "}
        </h3>
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
      </div>
    </FormLayout>
  );
}
