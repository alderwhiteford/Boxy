import Confirmation from "@/assets/Confirmation.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ListingConfirmation() {
  const router = useRouter();

  return (
    <div className="w-[64%] pt-20 items-center text-center mx-auto">
      <div className="flex flex-col items-center">
        <div className="p-12 justify-center">
          <Image src={Confirmation} alt="Image" />
        </div>
        <div className="text-4xl font-Satoshi">
          Thank you! A confirmation will be sent to your email address.
        </div>
        <div className="mt-4 mb-3 w-[60%]">
          We’ll let you know when your space has been booked! If this is your
          first time hosting with BOXY, please allow time for us to review your
          personal identification information before your listing goes live. To
          view or edit your listing details, visit the My Listings page.
        </div>
        <button
          className="p-3 rounded-full bg-bxBrand text-white hover:bg-bxBrandLight mt-4"
          onClick={() => router.push("/host/dashboard")}
        >
          View Listing
        </button>
      </div>
    </div>
  );
}
