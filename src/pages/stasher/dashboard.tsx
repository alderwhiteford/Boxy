import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import Reservation from "@/components/Reservation/Reservation";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

type ReservationDetails = {
  datesRequested: Array<Date>;
  name: string;
  hostName: string;
  address: string;
};

export default function StasherDashboard() {
  const { data, status } = useSession();
  const [reservations, setReservations] = useState<Array<ReservationDetails>>(
    []
  );
  const [dateRange, setDateRange] = useState<
    string | Date | Date[] | undefined | null
  >(null);
  const [tabState, setTabState] = useState("Upcoming");

  if (status === "unauthenticated") {
    signIn();
  }

  useEffect(() => {
    getReservations();
  }, []);

  async function getReservations() {
    const all_res = (
      await (
        await fetch("http://localhost:3000/api/reservations/sent", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()
    )["my reservations"];

    console.log(all_res);

    const reservations: {
      datesRequested: any;
      name: string;
      hostName: string;
      address: string;
    }[] = [];

    all_res.forEach((reservation: { [x: string]: any }) =>
      reservations.push({
        datesRequested: reservation["dates_requested"],
        name: reservation["name"],
        hostName: reservation["host_name"],
        address: reservation["address"],
      })
    );

    setReservations(reservations);
  }

  const renderReservationElements = (
    reservations: ReservationDetails[] | undefined
  ) => {
    if (reservations == undefined || reservations.length == 0) {
      return <h1>You have no reservations!</h1>;
    } else {
      return (
        reservations &&
        reservations.map((reservation: any) => {
          return (
            <Reservation
              reservation={reservation}
              header={reservation.name}
              sub={reservation.address}
            />
          );
        })
      );
    }
  };

  const listing_tab = (state: string) => {
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
          <h3>{state}</h3>
        </div>
      </button>
    );
  };

  return (
    <div className="container flex min-w-full pt-16">
      <div className="w-[60vw] flex-col pt-[5vh] ml-20">
        <h1 className="text-[40px] mb-5">Reservations</h1>
        <div className="grid grid-cols-6 w-[100%] h-[7vh] mb-5">
          {listing_tab("Upcoming")}
          {listing_tab("Ongoing")}
          {listing_tab("Past")}
          {listing_tab("Pending")}
        </div>
        {renderReservationElements(reservations)}
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
