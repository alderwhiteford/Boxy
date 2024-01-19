import FAQ from "@/components/FAQ";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  FaBug,
  FaFireExtinguisher,
  FaDog,
  FaThermometerHalf,
  FaBox,
  FaGlassCheers,
} from "react-icons/fa";

import {
  MdSmokeFree,
  MdOutlineElevator,
  MdOutlineMeetingRoom,
} from "react-icons/md";

export default function ListingDetailsPage({ listing, host }: any) {
  const router = useRouter();
  const { listingID } = router.query;

  const [isGalleryModalOpen, setIsGalleryModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [dropOffDate, setDropOffDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [pickUpDate, setPickUpDate] = useState(dayjs().format("YYYY-MM-DD"));
  // const [accessDate, setAccessDate] = useState(dayjs().format('YYYY-MM-DD'));

  const toggleGalleryModal = () => {
    setIsGalleryModalOpen(!isGalleryModalOpen);
  };

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  const amenityIcons = new Map<string, JSX.Element>([
    ["Pest_Controlled", <FaBug size={24} />],
    ["Fire_Alarm_System", <FaFireExtinguisher size={24} />],
    ["Smoke_Free", <MdSmokeFree size={24} />],
    ["Pet_Free", <FaDog size={24} />],
    ["Access_to_Elevator", <MdOutlineElevator size={24} />],
    ["Ground_Floor", <MdOutlineMeetingRoom size={24} />],
    ["Climate_Controlled", <FaThermometerHalf size={24} />],
    ["Private_Storage", <FaBox size={24} />],
    ["Party_Free", <FaGlassCheers size={24} />],
  ]);

  const datesAvailable: string[] = [
    listing.dates_available[0],
    listing.dates_available[listing.dates_available.length - 1],
  ];

  function formatAmenityName(name: string) {
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="flex justify-center flex-col pt-16 ">
      <div className="flex justify-center">
        <div className="flex flex-col pt-4 w-4/5">
          <section className="overflow-hidden text-neutral-700">
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
              <div className="flex">
                <div className="w-1/2 p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src="https://s3-alpha-sig.figma.com/img/be11/98c7/414bff037b07e04cdaf38071768364c1?Expires=1682294400&Signature=H31IvsmhN6v5rNJCZLOGbSmWZ1pOhQsx6tlnlZa5Pi1WEzzt0F8B91~Gwhe9F~CRwwBjzQOSXvV7gau7XkE2sQAfcegj-9DGBGE3lSZjEUVs5PpB2I-pTEiZ725a-o9F8ZnchKEWuRJdkOg2PvDhidC71aogQRQtRMNFqnk7LR68ZVTmMk7IV5RjxN3rUKVvX0cq~oj2GBGPlrI1cRSE7vnFbqVtCfBiPKr8QknqPFSuOOYGhIzqaArFsv3C-ywmjjbI5KSB9vY7oYK5U4i4udQ3ttQ4wwBabk0lLZmigK~BDCOg~iAeLosIYJvjhkPgWZGWA2jG~divNmgqYMKpAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  />
                </div>
                <div className="w-1/2">
                  <div className="flex flex-wrap">
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://st.hzcdn.com/simgs/a881cb090fe2028b_4-3777/traditional-garage.jpg"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://insulationcart.com/image/kb/k003007_How-to-Optimise-a-Cold-Storage-Room2.jpg"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSVp-adcJZGdgEqalN6fEBlMXSw5h1DGaxGQ&usqp=CAU"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <button
                        className="relative block h-full w-full rounded-lg bg-gray-200"
                        onClick={toggleGalleryModal}
                      >
                        <img
                          alt="gallery"
                          className="block h-full w-full rounded-lg object-cover object-center"
                          src="https://images.younghouselove.com/2010/12/NewEmpty-Living-Built-Ins.jpg"
                        />
                        <div className="absolute inset-0 bg-gray-700 opacity-70 rounded-lg"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <span className="text-lg font-semibold">+ {2}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isGalleryModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">All Images</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        alt="gallery"
                        className="rounded-lg object-cover object-center"
                        src="https://insulationcart.com/image/kb/k003007_How-to-Optimise-a-Cold-Storage-Room2.jpg"
                      />
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.younghouselove.com/2010/12/NewEmpty-Living-Built-Ins.jpg"
                      />
                      {/* Add more images here. ALSO HAVE TO ADD SOME SCROLL FEATURE OR SOMETHING*/}
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={toggleGalleryModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-center mt-1">
            <div className="w-9/10 p-4">
              <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <div className="flex flex-col p-4 gap-1 col-span-2">
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl mb-4">
                      <b>{listing.name}</b> | {listing.address}, {listing.city},{" "}
                      {listing.state}, {listing.zip_code}
                    </h2>
                    <p>
                      {listing.description ||
                        "Listing details and description go here. You can add more content related to the listing, such as reviews, owner information, etc."}
                    </p>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      Approximate Space Size: {listing.space_available[0]} x{" "}
                      {listing.space_available[1]} ft
                    </h2>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl font-semibold mb-4">Amentities</h2>
                    <ul className="space-y-2">
                      {listing.amenities.map(
                        (
                          amenity: string,
                          index: React.Key | null | undefined
                        ) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            {amenityIcons.get(amenity)}
                            <span>{formatAmenityName(amenity)}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border border-gray-300 rounded-md p-4">
                        <div>
                          <h3 className="font-semibold mb-2">
                            Would it be possible to store a mattress in this
                            space? Is it easy access?
                          </h3>
                          <p>
                            Yes, a mattress will fit in this space. It would
                            need to bend or be rolled up to move through the
                            doorway.
                          </p>
                        </div>
                      </div>
                      <div className="border border-gray-300 rounded-md p-4">
                        <div>
                          <h3 className="font-semibold mb-2">
                            What is the parking situation?
                          </h3>
                          <p>
                            Temporary street parking is available, there is also
                            a small parking lot across the street.
                          </p>
                        </div>
                      </div>
                      <div className="border border-gray-300 rounded-md p-4">
                        <div>
                          <h3 className="font-semibold mb-2">
                            Are there multiple rooms available in this space?{" "}
                          </h3>
                          <p>
                            Yes, the basement has one separate room off of it.
                            It can be used for more private storage for an
                            individual’s items.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-300 p-2">
                    <div className="flex flex-row items-center">
                      <img
                        src={
                          "https://ih1.redbubble.net/image.1554216071.9881/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
                        }
                        alt="Host profile"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <p className="ml-2">Hosted by {host.name}</p>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="hover:bg-gray-300 border border-stone-800 w-full m-8 p-4 rounded-full text-black"
                        onClick={toggleContactModal}
                      >
                        Contact
                      </button>
                    </div>
                  </div>

                  {isContactModalOpen && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                          Contact Host
                        </h2>
                        <p>
                          Email:{" johnDoe@gmail.com"}
                          <a href={`mailto:${host.email}`}>{host.email}</a>
                        </p>
                        <button
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                          onClick={toggleContactModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      Safety as a Stasher
                    </h2>
                    <div className="grid grid-cols-2">
                      <div className="flex flex-col ">
                        <p>The Boxy Protection Plan</p>
                        <p>boxy protection plan here</p>
                      </div>

                      <div className="flex flex-col">
                        <p>General Tips When Storing</p>
                        <p>boxy protection plan here</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col rounded-md p-1 border border-gray-400 p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Price: ${listing.price}
                    </h2>
                    <div className="grid grid-cols-2 grid-rows-1 gap-2 text-[12px]">
                      <div>
                        <label htmlFor="dropOffDate">Drop off Date:</label>
                        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
                          <span
                            onClick={() => {
                              const el = document.getElementById("dropOffDate");
                              if (el) el.click();
                            }}
                          >
                            Select
                          </span>
                          <input
                            id="dropOffDate"
                            type="date"
                            min={dayjs().format("YYYY-MM-DD")}
                            max={dayjs(datesAvailable[1]).format("YYYY-MM-DD")}
                            value={dropOffDate}
                            onChange={(e) => setDropOffDate(e.target.value)}
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="pickUpDate">Pick up Date:</label>
                        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
                          <span
                            onClick={() => {
                              const el = document.getElementById("pickUpDate");
                              if (el) el.click();
                            }}
                          >
                            Select
                          </span>
                          <input
                            id="pickUpDate"
                            type="date"
                            value={pickUpDate}
                            min={dayjs(dropOffDate).format("YYYY-MM-DD")}
                            max={dayjs(datesAvailable[1]).format("YYYY-MM-DD")}
                            onChange={(e) => setPickUpDate(e.target.value)}
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      {/* <div>
                        <label htmlFor="accessDate">Access Dates:</label>
                        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
                          <span
                            onClick={() => {
                              const el = document.getElementById("accessDate");
                              if (el) el.click();
                            }}
                          >
                            Select
                          </span>
                          <input
                            id="accessDate"
                            type="date"
                            value={accessDate}
                            min={dayjs(dropOffDate).format('YYYY-MM-DD')}
                            max={dayjs(pickUpDate).format('YYYY-MM-DD')}
                            onChange={(e) => setAccessDate(e.target.value)}
                            className="bg-gray-100"
                          />
                        </div>
                      </div> */}
                    </div>
                    <p className="mt-4 text-xs">Total: $200</p>
                  </div>

                  <button
                    className="bg-[#097275] hover:bg-[#0a3739] transition:color h-[40px] w-full mb-7 ml-auto right-2 rounded-full text-white mt-1"
                    onClick={() => {
                      router.push({
                        pathname: `./${listingID}/reserve`,
                        query: { dropOffDate, pickUpDate, listingID },
                      });
                    }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.listingID;
  const res = await fetch(`http://localhost:3000/api/listings/${id}`);
  const listing = await res.json();

  console.log(context.query.listingID);

  // Fetch the host information (Need to implement get endpoint probs)
  const hostRes = await fetch(
    `http://localhost:3000/api/user/${listing.host_id}`
  );
  const host = await hostRes.json();
  console.log(host);
  return {
    props: { listing, host },
  };
}
