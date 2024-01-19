import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { ListingContext } from "@/pages/listings/create";
import { useContext } from "react";

export default function FormLayout({ children, image, validate }: any) {
  const listingContext = useContext(ListingContext);
  return (
    <div className='container min-w-full flex flex-col items-center'>
      <div className="flex flex-row w-[80%] mx-auto mt-20 gap-12">
        <div className="basis-1/2 flex flex-col items-start pt-[5vh]">
          {children}
        </div>
        <div className="basis-1/2 items-center pt-[5vh]">
          <Image src={image} alt="Image" />
        </div>
      </div>
      <ProgressBar
        currentForm={listingContext.currentForm}
        setCurrentForm={listingContext.setCurrentForm}
        createListing={listingContext.createListing}
        forms={listingContext.forms}
        validate={validate}
      />
    </div>
  );
}
