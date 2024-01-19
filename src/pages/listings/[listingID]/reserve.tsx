import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { AiOutlineLeft } from "react-icons/ai";
import DateForm from "@/components/Reservation/DateForm";
import ReservationOverview from "@/components/Reservation/ReservationOverview";
import DateRangeSelector from "../../../components/General/DateRangeSelector";
import PaymentForm from "@/components/Reservation/PaymentForm";
import router, { Router, useRouter } from "next/router";
import { Stripe } from "@stripe/stripe-js";
import ItemInformationForm from "@/components/Reservation/ItemInformationForm";
import { signIn, useSession } from "next-auth/react";

export default function ListingReservationPage({ listing }: any) {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(0);
  const [dateEdit, setDateEdit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(3500);
  const [handleSubmit, setHandleSubmit] = useState();

  const dropOffDate: string = router.query.dropOffDate
    ? new Date(router.query.dropOffDate.toString()).toLocaleString("default", {
        month: "long",
        day: "2-digit",
      })
    : "";
  const pickUpDate: string = router.query.pickUpDate
    ? new Date(router.query.pickUpDate.toString()).toLocaleString("default", {
        month: "long",
        day: "2-digit",
      })
    : "";
  const [dateRange, updateDateRange] = useState<Array<string>>([
    dropOffDate,
    pickUpDate,
  ]);
  const session = useSession();

  if (session.status == "unauthenticated") {
    signIn();
  }

  const reservation_overview = {
    listing_id: listing.listing_id,
    host_id: listing.host_id,
    price: 3500,
    address: listing?.address,
    city: listing?.city,
    state: listing?.state,
    protection: null,
    items: null,
    images: [""],
  };

  const reservation_forms = [
    <DateForm
      listing={listing}
      setDateEdit={setDateEdit}
      dateRange={dateRange}
      setTotalPrice={setTotalPrice}
    />,
    <ItemInformationForm
      listing={listing}
      setDateEdit={setDateEdit}
      dateRange={dateRange}
      setTotalPrice={setTotalPrice}
    />,
    <PaymentForm
      reservation={reservation_overview}
      totalPrice={totalPrice}
      dateRange={dateRange}
      setCurrentForm={setCurrentForm}
    />,
  ];

  async function confirmReservation() {
    const res = await fetch("http://localhost:3000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // hard coded values for now
      body: JSON.stringify({
        host_id: 1,
        stasher_id: 1,
        listing_id: listing.listing_id,
        dates_requested: [new Date("2023-04-01"), new Date("2023-04-02")],
      }),
    });

    res.status == 200 && router.push("http://localhost:3000/host/dashboard");
  }

  function backButtonHandler() {
    if (currentForm == 0) {
      router.push("http://localhost:3000/listings/" + listing.listing_id);
      return;
    } else {
      setCurrentForm(currentForm - 1);
      return;
    }
  }

  const reservation_header = (index: number, text: string) => {
    return (
      <h2
        className={`text-[20px] md:text-[32px] ${
          currentForm == index ? "text-black" : "text-[#B5B5B5]"
        }`}
      >
        {text}
      </h2>
    );
  };
  return (
    <>
      <div
        className={`absolute z-50 min-w-full min-h-full ${
          dateEdit ? "visible" : "hidden"
        }`}
      >
        <div className="absolute w-[50vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-3xl drop-shadow-md p-7">
          <div className="w-[100%] flex place-content-between items-center">
            <h2 className="text-[25px]">Edit Dates</h2>
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bxBrandLight"
              onClick={() => setDateEdit(false)}
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {listing?.dates_available && listing.dates_available.length !== 0 ? (
            DateRangeSelector(
              listing?.dates_available,
              updateDateRange,
              setDateEdit
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      {currentForm != 2 ? (
        <div
          className={`container flex flex-col min-w-full pt-16 items-center h-[90vh] ${
            dateEdit ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="flex w-[80vw] items-center mt-7 mb-7">
            <AiOutlineLeft style={{ fontSize: "10px", color: "" }} />
            <button
              onClick={() => backButtonHandler()}
              className="text-[15px] ml-2"
            >
              Back
            </button>
          </div>
          <div className="flex place-content-between w-[80vw]">
            <div className="flex-col w-[60%]">
              <div className="flex mb-5">
                {reservation_header(0, "Reservation Dates")}
                <h2 className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                  {"\xa0/\xa0"}
                </h2>
                {reservation_header(1, "Item Information")}
                <h2 className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                  {"\xa0/\xa0"}
                </h2>
                {reservation_header(2, "Payment")}
              </div>
              {reservation_forms[currentForm]}
            </div>
            <div id="">
              {ReservationOverview(
                totalPrice,
                dateRange,
                reservation_overview,
                currentForm,
                setCurrentForm,
                () => {}
              )}
            </div>
          </div>
        </div>
      ) : (
        reservation_forms[2]
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.listingID;
  return {
    props: {
      listing: await (
        await fetch("http://localhost:3000/api/listings/" + id)
      ).json(),
    },
  };
}
