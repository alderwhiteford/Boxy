import BoxyConfirmation from "@/components/Reservation/BoxyConfirmation";
import { useRouter } from "next/router";

export default function ReservationConfirmation() {
  const router = useRouter();

  return (
    <div className="w-[64%] pt-20 items-center text-center mx-auto mb-">
      <div className="flex flex-col items-center">
        <div className="p-12 justify-center">
          <BoxyConfirmation />
        </div>
        <div className="text-4xl font-Satoshi">
          Thank you! A confirmation will be sent to your email address.
        </div>
        <div className="mt-6 mb-3">
          Remember that a reservation is not final until approved by the host.
        </div>
        <button className="p-3 rounded-full bg-bxBrand text-white hover:bg-bxBrandLight" onClick={() => router.push("/stasher/dashboard")}>
          Continue to Dashboard
        </button>
      </div>
      <div className="text-left pt-12 text-2xl px-2">
        Your Reservation Details
      </div>
      <div className="flex flex-row mt-4 px-2 mr-4">
        <div className="flex-grow">
          <div className="flex flex-col border-2 border-[#B5B5B5] rounded-md mr-8 h-[25vh] mb-20">
            <div className="flex flex-row mx-4 py-4 text-bold text-3xl border-b-2 border-b-[#B5B5B5]">
              <div>Total</div>
              <div className="flex-grow text-end">$350</div>
            </div>
            <div className="flex flex-row mx-4 py-4 border-b-2 border-b-[#B5B5B5]">
              <div>Dates</div>
              <div className="flex-grow text-end">Jan 1 - Aug 1 2023 </div>
            </div>
            <div className="flex flex-row px-4 pt-4">
              <div>Rate</div>
              <div className="flex-grow text-end">$50 / month</div>
            </div>
            <div className="flex flex-row px-4 pb-4">
              <div>Total</div>
              <div className="flex-grow text-end">$350</div>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col border-2 border-[#B5B5B5] rounded-md h-[25vh] mb-20">
            <div className="flex flex-row mx-4 py-4 text-bold text-3xl border-b-2 border-b-[#B5B5B5]">
              <div>Storage Items</div>
            </div>
            <div className="flex flex-row mx-4 py-4">
              <div>Hockey Stick, Desktop Computer, 3 pairs of shoes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
