import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";

export default function Listing({ listing, deleteListing }: any) {
  const link = "/listings/" + listing.listing_id;

  return (
    <Link href={link}>
      <div className="w-full hover:bg-bxBoxLight border-2 rounded-3xl h-[17.5vh] mb-5 grid grid-cols-2">
        <div className="h-full flex items-center pl-10">
          <div>
            <h2>{<b>{listing.name}</b>}</h2>
            <h2>{`${listing.address}, ${listing.city}, ${listing.state}, ${listing.zip_code}`}</h2>
          </div>
        </div>
        <div className="h-full flex items-center justify-end pr-7">
          <div className="w-[25%] rounded-lg flex bg-bxBrand items-center justify-center center mr-5">
            <h3 className="pr-2 pt-2 pb-2 pl-2 text-white">Listed</h3>
          </div>
          <button
            onClick={(evt) => {
              evt.preventDefault();
              deleteListing();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={"24"}
              height={"24"}
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 5h-3.5l-1-1h-5l-1 1H5v2h14zM8 18v-8h2v8H8zm6 0v-8h2v8h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
