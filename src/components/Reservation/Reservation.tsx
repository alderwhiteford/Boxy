import { randomInt } from "crypto";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

export default function Reservation({
  reservation,
  header,
  sub,
  cancelReservation,
}: any) {
  const profile_images = [
    "https://i.imgur.com/v51cI9k.jpg",
    "https://i.imgur.com/U6Q47KA.jpg",
    "https://i.imgur.com/eDom8qI.png",
    "https://i.imgur.com/9MK0P02.jpg",
    "https://i.imgur.com/SFRf9az.jpg",
  ];

  const dateRange: [string, string] =
    reservation.datesRequested.length >= 2
      ? [
          new Date(reservation.datesRequested[0]).toLocaleString("default", {
            month: "long",
            day: "2-digit",
          }),
          new Date(
            reservation.datesRequested[reservation.datesRequested.length - 1]
          ).toLocaleString("default", {
            month: "long",
            day: "2-digit",
          }),
        ]
      : ["N/A", "N/A"];

  return (
    <div className="w-full hover:bg-bxBoxLight border-2 rounded-3xl h-[17.5vh] mb-5 grid grid-cols-2">
      <div className="h-full flex items-center pl-10">
        <img
          className="h-[10vh] w-[10vh] object-cover rounded-full mr-5"
          src="https://i.imgur.com/tdi3NGa.png"
        ></img>
        <div>
          <h3 className="">
            <b>{header}</b>
          </h3>
          <h3>{sub}</h3>
        </div>
      </div>
      <div className="h-full flex items-center justify-end pr-7">
        <h3 className="pr-5">{dateRange[0] + " - " + dateRange[1]}</h3>
        {cancelReservation ? (
          <button onClick={cancelReservation}>
            <svg width={30} height={30} viewBox="0 0 24 24" fill={"#F00"}>
              <path d="M6.345 6.345a.999.999 0 0 1 1.414 0L12 10.586l4.241-4.241a.999.999 0 1 1 1.414 1.414L13.414 12l4.241 4.241a.999.999 0 1 1-1.414 1.414L12 13.414l-4.241 4.241a.999.999 0 1 1-1.414-1.414L10.586 12 6.345 7.759a.999.999 0 0 1 0-1.414z" />
            </svg>
          </button>
        ) : (
          <AiOutlineRight style={{ fontSize: "20px", color: "#B5B5B5" }} />
        )}

        {/* <h1>del</h1> */}
      </div>
    </div>
  );
}
