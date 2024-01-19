import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import BoxyLogo from "./BoxyLogo";
import { defaultCoordindates } from "@/pages/_app";

export default function NavBar() {
  const router = useRouter();
  const { data, status } = useSession();
  const [navState, setNavState] = useState("");

  function getSearchResultsUrl(): string {
    return `/listings/browse?latitude=${encodeURIComponent(
      defaultCoordindates.latitude
    )}&longitude=${encodeURIComponent(
      defaultCoordindates.longitude
    )}&proximity=15`;
  }

  const nav_bar_button = (state: string, text: any) => {
    const handleClick = (state: string) => {
      setNavState(state);
      if (state == "userIcon") {
        if (status === "unauthenticated") {
          signIn();
        } else {
          router.push("http://localhost:3000/user/account");
        }
      } else if (state == "sign out") {
        signOut();
        alert("signed out");
      }
    };

    return (
      <button
        onClick={() => handleClick(state)}
        className={
          navState == state
            ? "flex justify-center text-black"
            : "flex justify-center hover:text-black"
        }
      >
        {text}
      </button>
    );
  };

  return (
    <div>
      <nav className="container fixed min-w-full h-16 border-b-2 border-gray bg-white shadow-md z-10">
        <div className="flex justify-between items-center container mx-auto h-full ">
          <BoxyLogo className="w-24 h-8" />

          <div className="flex items-center gap-10 text-[#C4C4C4]">
            {nav_bar_button(
              "browse",
              <Link href={getSearchResultsUrl()}>Browse</Link>
            )}
            {nav_bar_button(
              "host",
              <Link href="http://localhost:3000/host/dashboard">
                Host Dashboard
              </Link>
            )}
            {nav_bar_button(
              "stasher",
              <Link href="http://localhost:3000/stasher/dashboard">
                Stasher dashboard
              </Link>
            )}
            {nav_bar_button(
              "createListing",
              <Link href="http://localhost:3000/listings/create">
                Create Listing
              </Link>
            )}
            {nav_bar_button("userIcon", <BiUserCircle size={30} />)}
            {status === "authenticated" &&
              nav_bar_button("sign out", "sign out")}
          </div>
        </div>
      </nav>
    </div>
  );
}
