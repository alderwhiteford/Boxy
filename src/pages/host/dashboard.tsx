import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import router, { useRouter } from "next/router";
import Listing from "../listings/listing";
import { signIn, useSession } from "next-auth/react";
import { sign } from "crypto";
import Reservation from "@/components/Reservation/Reservation";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

type Listing = {
  listing_id: string;
  name: string;
  price: string;
  proximity: string;
  zip_code: string;
};

type ReservationDetails = {
  datesRequested: Array<Date>;
  name: string;
  stasherName: string;
  address: string;
  reservation_id: string;
};

export default function HostDashboard() {
  const [tabState, setTabState] = useState("Listings");
  const [allListings, setAllListings] = useState<Array<Listing>>([]);
  const [reservations, setReservations] = useState<Array<ReservationDetails>>();
  const [dateRange, setDateRange] = useState<
    string | Date | Date[] | undefined | null
  >(null);
  const { data, status } = useSession();
  const [refresh, setRefresh] = useState(true);

  if (status === "unauthenticated") {
    signIn();
  }

  useEffect(() => {
    getAllListings();
    getReservations();
  }, []);

  async function getAllListings() {
    const all_res = await (
      await fetch("http://localhost:3000/api/listings/posted", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    setAllListings(all_res["my listings"]);
  }

  async function getReservations() {
    const all_res = (
      await (
        await fetch("http://localhost:3000/api/reservations/received", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()
    )["my reservations"];

    const reservations: {
      datesRequested: any;
      name: string;
      stasherName: string;
      address: string;
      reservation_id: string;
    }[] = [];

    all_res?.forEach((reservation: { [x: string]: any }) =>
      reservations.push({
        datesRequested: reservation["dates_requested"],
        name: reservation["name"],
        stasherName: reservation["stasher_name"],
        address: reservation["address"],
        reservation_id: reservation["reservation_id"],
      })
    );

    setReservations(reservations);
  }

  async function cancelReservation(reservation_id: any) {
    const all_res = await (
      await fetch("http://localhost:3000/api/reservations/" + reservation_id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    getReservations(); // triggering refresh
  }

  async function deleteListing(listing_id: String) {
    const res = await fetch("/api/listings/" + listing_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      alert("error deleting listing");
    }
  }

  const renderListingElements = (listings: Listing[]) => {
    if (listings == null || listings.length == 0) {
      return <h1>You have no listings!</h1>;
    } else {
      return (
        listings &&
        listings.map((listing: Listing) => {
          return (
            <Listing
              listing={listing}
              deleteListing={async () => {
                await deleteListing(listing.listing_id);

                // refereshing elements
                await getAllListings();
                await renderListingElements(allListings);
                await getReservations();
                await renderReservationElements(reservations);
              }}
            />
          );
        })
      );
    }
  };

  const renderReservationElements = (
    reservations: ReservationDetails[] | undefined
  ) => {
    if (reservations == undefined || reservations.length == 0) {
      return <h1>You have no reservation requests!</h1>;
    } else {
      return (
        reservations &&
        reservations.map((reservation: any) => {
          return (
            <Reservation
              reservation={reservation}
              header={reservation.stasherName}
              sub={reservation.name}
              cancelReservation={() =>
                cancelReservation(reservation.reservation_id)
              }
            />
          );
        })
      );
    }
  };

  const all_listings = renderListingElements(allListings);
  const all_reservations = renderReservationElements(reservations);

  function renderCurrentForm() {
    switch (tabState) {
      case "Listings":
        return all_listings;
      // case "Requested":
      //   return renderReservationRequests(reservationRequests);
      case "Reservations":
        return all_reservations;
    }
  }

  const listing_tab = (state: string, text: string) => {
    return (
      <button
        onClick={() => setTabState(state)}
        className={
          tabState == state
            ? "flex justify-center border-b-2 border-b-black col-span-1 text-black"
            : "flex justify-center border-b-2 col-span-1 text-gray-500"
        }
      >
        <div className="h-2/3 flex justify-center items-center">
          <h3>{text}</h3>
        </div>
      </button>
    );
  };

  return (
    <div className="container flex min-w-full pt-16">
      <div className="w-[60vw] flex-col pt-[5vh] ml-20">
        <h1 className="text-[40px] mb-5">{tabState}</h1>
        <div className="grid grid-cols-6 w-[100%] h-[7vh] mb-5">
          {listing_tab("Listings", "Listings")}
          {listing_tab("Reservations", "Reservations")}
          <div className="col-span-4 flex justify-end border-b-2">
            <Link href="/listings/create" className="h-2/3 w-[30%]">
              <button className="flex h-full w-full justify-center items-center rounded-3xl outline outline-gray-500 text-gray-500 hover:outline-black hover:text-black">
                <AiOutlinePlus />
                <h3 className="ml-1">New Listing</h3>
              </button>
            </Link>
          </div>
        </div>
        {renderCurrentForm()}
      </div>
      <div className="w-[40vw] flex justify-center pt-16">
        <Calendar
          className="w-[420px] pt-[7vh] h-[550px]"
          inline
          selectionMode="range"
          onChange={(event) => setDateRange(event.value)}
          dateFormat="M dd, yy"
        />
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   console.log("test");
//   // Get all Listings
//   const all_res = await (
//     await fetch("http://localhost:3000/api/listings/posted", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   ).json();

//   let all_listings: Listing[] = [];
//   if (all_res && !(JSON.stringify(all_res) === "{}")) {
//     let listings: [] = all_res["my listings"] || [];
//     if ("my listings" in all_res) {
//       all_listings = all_res["my listings"];
//     }
//     for (const value of listings) {
//       const get_listing_info = await (
//         await fetch("http://localhost:3000/api/listings/" + value, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//       ).json();
//       let newListing: Listing = {
//         listing_id: get_listing_info["listing_id"],
//         name: get_listing_info["name"],
//         price: get_listing_info["price"],
//         proximity: "TEMPORARY",
//       };
//       // all_listings.push(newListing);
//     }
//   }

//   // Get all Reservations Requests For Host
//   const all_reservations_requests = await (
//     await fetch("http://localhost:3000/api/reservations/received", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   ).json();

//   // Requested and Confirmed Reservations
//   const requested_reservations = new Array();
//   const confirmed_reservations = new Array();
//   if (!!(JSON.stringify(all_reservations_requests) === "{}")) {
//     for (const value of all_res["my listings"]) {
//       // Get All Reservations ID
//       const get_reservation_info = await (
//         await fetch("http://localhost:3000/api/reservations/" + value, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//       ).json();

//       // Get Listing Info
//       const listing_info = await (
//         await fetch(
//           "http://localhost:3000/api/listings/" +
//             get_reservation_info["listing_id"],
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         )
//       ).json();

//       let newListing: Listing = {
//         listing_id: listing_info["listing_id"],
//         name: listing_info["name"],
//         price: listing_info["price"],
//         proximity: "TEMPORARY",
//       };

//       if (get_reservation_info["accepted"]) {
//         confirmed_reservations.push(newListing);
//       } else {
//         requested_reservations.push(newListing);
//       }
//     }
//   }

//   return {
//     props: {
//       listingsAll: all_listings,
//       listingsRequested: requested_reservations,
//       listingsConfirmed: confirmed_reservations,
//       test: all_reservations_requests,
//     },
//   };
// }
