import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Reservation({ Reservation }: any) {
  const [statusColor, setStatusColor] = useState("#00000");
  const [statusHover, setHoverStatus] = useState(false);
  const link = "/reservations/" + Reservation.reservation_id
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  
  // Assuming that first and last in the list are the earliest and latest dates 
  const earlyDate = new Date(Reservation.dates_requested[0])
  const lateDate = new Date(Reservation.dates_requested[Reservation.dates_requested.length - 1])
  const getEarliestDate = monthNames[earlyDate.getMonth()] + " " + earlyDate.getDate();
  const getLatestDate = monthNames[lateDate.getMonth()] + " " + lateDate.getDate();

  // useEffect(() => {
  //   if (reservation.price < 20) {
  //     setStatusColor("#E03C32");
  //   } else if (reservation.price >= 20 && reservation.price < 100) {
  //     setStatusColor("#FFD301");
  //   } else {
  //     setStatusColor("#7BB662");
  //   }
  // }, [reservation.price]);

  return (
    <Link href={link}>
      <div
        className="w-full bg-bxBoxLight hover:bg-[#e6e6e6] border border-[#e6e6e6] rounded-xl h-[13.5vh] mb-5 grid grid-cols-2"
        onMouseEnter={() => setHoverStatus(true)}
        onMouseLeave={() => setHoverStatus(false)}
      >
        <div className="h-full flex items-center pl-10">
          <h2>{Reservation.listing_address}</h2>
          <h2>{Reservation.stasher_name}</h2>
        </div>
        <div className="h-full flex items-center justify-end pr-7">
          <div className="rounded-md flex bg-[#e6e6e6] items-center justify-evenly mr-5">
            <h3 className="pr-5 pt-2 pb-2 pl-2">{getEarliestDate} - {getLatestDate}</h3>
          </div>
          <AiOutlineRight style={{ fontSize: "25px", color: "#e6e6e6" }} />
        </div>
      </div>
    </Link>
  );
}
