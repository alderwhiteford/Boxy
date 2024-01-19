import { BiPencil } from "react-icons/bi";
import ProgressBar from "./ProgressBar";
import { useContext } from "react";
import { ListingContext } from "@/pages/listings/create";

export default function SubmitForm({
  fields,
  changeForm,
}: {
  fields: any;
  changeForm: Function;
}) {
  const formLabels = [
    "Name",
    "Address",
    "Dates",
    "Amenities",
    "Storage Space Description",
    "Item Description",
  ];

  const listingContext = useContext(ListingContext);

  return (
    <div className="container min-w-full flex flex-col items-center mt-20">
      <div className="w-1/2 flex justify-center mt-20">
        <div className="container h-full font-Inter mb-2">
          <div className="h-6 text-3xl mb-6">Review Responses</div>
          <div className="flex flex-col justify-between items-center gap-1">
            {formLabels.map((label, i) => {
              return (
                <div
                  className="grid grid-cols-2 w-full place-content-between gap-4 rounded-md bg-[#F8F8F8] items-center"
                  key={i}
                >
                  <div className=" font-Satoshi pl-4 pt-2"> {label} </div>
                  <div className="flex justify-end pr-4 pt-2">
                    <button onClick={() => changeForm(i)}>
                      <BiPencil size={20} />
                    </button>
                  </div>
                  <div className="text-sm pb-2 pl-4 font-thin col-span-2">
                    {fields[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ProgressBar
          currentForm={listingContext.currentForm}
          setCurrentForm={listingContext.setCurrentForm}
          createListing={listingContext.createListing}
          forms={listingContext.forms}
        />
      </div>
    </div>
  );
}
