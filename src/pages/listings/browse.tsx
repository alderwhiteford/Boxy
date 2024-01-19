import { LocationSearchBar } from "@/components/Browse/LocationSearchBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Coordinate, defaultCoordindates } from "../_app";

type LocationSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

export default function BrowseListingsPage({ listings }: any) {
  const router = useRouter();
  const [locationInput, setLocationInput] = useState<Coordinate>();

  const imageList = [
    "https://s3-alpha-sig.figma.com/img/a037/cefe/ef1adc938dd648a6e10a3b69ebda558c?Expires=1682294400&Signature=n8vZKRIS0oK1on8lL8TAuSqokhRVesKk9Bag0ewfssNszBRdffILCcaCuYnhu1u2CJYE6Y3ifXO2BguDUYho9o45wvU3w1xUMBEhD2Er9xX~--kgNENzHSnv3WxEdeN~KT3v8AQtJJjqv0ymiXmLiNeUpaxSh-zXJWKU6P8dy0hz3~RzI74bq0jd~pIa8wkKM8FXn6IkW5Q-7O6TRJ0dbj-1jPfWXePaAXgy5sDWBxxwq6tcq914oDebYbEz978-ZacVMdz5EkpiB-k~UUlX8Wjgg3gQzn7rcvxk9NZ87bjmJWAMWy4t6BlvBo-q7Lx5UWJk6AXdLEPuyTYaTK799g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/a038/cec0/c92e1b0c419c310758401dd8490139ba?Expires=1682294400&Signature=NZkUFlZw7ZcfaqnwSCjKEt6U86O3Lom~d-3JBDHavyg0i7w7Hnuyh~UaKNlRIIRUukuGyMTyjgcnM-v4XVNB72MgFB1fQI25Ptr9X1fCw3Cgf8HA-T8gV2vnLnXg8GEwIhVNdC7aEXXmRQGc2Rnt4g~tx6coe~37Yjmki2HWkC~iXSbmaZIpu2LftFmc5v-TK~cbEVC~YpW84mcIy9Cq8XnPPLUVp-~75yHcGKjhm0ejZ8hHATKfObhKzl~gb2IQgUcnTK43rTK16TUyJVGGTD02j~vYOD8FXeSDKp5adnIfPgDnXH3lxWbPMXyefbxcJ6l4QTFb6eCJF4NvFuBzvA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/41f0/8f68/db3e3b8c664dd33ab09789df1e2c009d?Expires=1682294400&Signature=LMGmWrL4qYM~zh952nUcEzld0P40YUpfWOHRlFY3zq8r-5ceNhsk31e~n6nDG8vcD1MEySOCtRQjGcOcZsuIR5cuiqO1NM2jAdaGW-KDIFJu74~QTLkvSGi-FLyHnpJNBZgUzelpH-JAGyF4xudk8BXDdBRBnMkTwXODfemPcI9zUwfxnIy7Z5ESfK4zxkq2x06JbfvKBWWEQy75KMkGO0FeNU0a-ave~tHizNfW2VhG0r1-hYqEZDQZcSnvB4WrCk~GcpYDAsdPC-H277taL394DhlYzex75Jwz3L~1G71mCrUCCPuWFW--U9z~BfwrIiV-RFx1pzPyt2jPJqQgrQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/674e/f323/3ef25d1ac442591db7784cddd5168ab6?Expires=1682294400&Signature=DxorvbVCRL4zEsKoavKpL4Rua8svRQnmen~aYlA5~H~4exOnQtcekEkuo9FZWfu2k4aOhRxda62F8xkHkYnevSUXpIo6wos7QV6lVrriWT29g2jhZr87ImyyT7Kp2YuV9l8I1Ofun6u-Tj1y9iAXgQ-5wDDrdb-lUYVHVHCSy58pDpVszjPZfS~yTFy1mW2vfOWmA4wxUH7pApIPdFVxjgWqE8S~4XYwJFRfhklszRdXulFnf3fxYq~RbndUC07c4NtLb~Jl6Md6MfYP-ZXINhfFpYFkfc6pYIef~vy5rFth2q~CB~g3yA12KZxkSc2-hVHsgekFz5q-d7HCjapLtg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/ad0b/52cc/c8f70a430f4f525bb06cab3c1577449c?Expires=1682294400&Signature=KHKdXP~2ZiG8RCS8KQbRgRZXmNdnOh9lwdoLEsuVh~joSSjLkAe3E9vxPGfv-kreiBLPgWnZXRFcYLc5v4-HjbZ7w4FQeAPty7BkEDfIhAxE9yUkB5tRKmMdKOHyXyAf8RmDvJH5rbYtuH4PyYXaQ1hLBGO33AFeRKdZV9poPQvOkH54RWCiPbC7CKTM7N0yVGYA5On03umTp8GLwsFiGoMYtKD532Rq1NPmQ~Q0ArRZEhLUqshd81sZhGRi1bONA56bmYQtRtTpCTMSe4ote1m1ShtcaAX-TvZo0kBJIVpmpnwt2SSDcp2kNvwr5wg5OvLzjcLRRY5Xq1po9aZRtA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/e02b/257c/d6b306de343514581076dee635d0143b?Expires=1682294400&Signature=CKbGGgvYJSEZCjlp0Z3wDudIa40wxep9CgsHys3G9g4C3r5CFPdOvKRzFubgIKCpeaKUERC5DBl4daLfS48dRg2jvu6QIiWz9unnH0dtUhYs2kwoJ~gP48s4vU1QjElmcdqS-vyympPCfA-1r1IhhsC~Af-nIhn253yr4tRpbxMhdWhKg2AlYnFZbXSFKyHui9~Plr6sm~8KKFsGCxmiYGdufEAvB-CPDLnl10RZLLLF0LTpzYBrjsYh0YrCrk5RTNMVWGyQcj4ie-agc-Sf1PDNRTCpPVQQA9GnqWG0JHTMFigh7vkmDjHz7iE0q~Hr-caV2FCMxHPYobJfDXYrhg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/c4a3/9ccf/24c38e891690cb747d60e2ff11015638?Expires=1682294400&Signature=euw58~pEEARlw~mnUBrlbP4Lhn40YTVUhA9m8KgDLn28dnPAZ~oFV7NKsh45rAlsNpP0pCHiU0mPbtQK-77Uf1cNfCfD5ECiAEZrQtPwq3aF1Hyi76e9TE14aIfDrK~af-2UL8IUHmho7jXut1asRQT8zY9Ivmcrch9n98N~R3HAwU8FnMx-VUKFZRB-vTWL-xePzdeNUCYxJm6sYSNjlGyiF6YWZ~kCmj0qso1eHFqrOccUYa3sPfcPvTDr7ijovA97FStG4lHUpO5wCYCQ7khy0NqzJuJdSAEKS51uuDSBwM0bJgt25IFuZ4rTVrpndxk6wJJFt0taRUvuKzCcOg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/be11/98c7/414bff037b07e04cdaf38071768364c1?Expires=1682294400&Signature=H31IvsmhN6v5rNJCZLOGbSmWZ1pOhQsx6tlnlZa5Pi1WEzzt0F8B91~Gwhe9F~CRwwBjzQOSXvV7gau7XkE2sQAfcegj-9DGBGE3lSZjEUVs5PpB2I-pTEiZ725a-o9F8ZnchKEWuRJdkOg2PvDhidC71aogQRQtRMNFqnk7LR68ZVTmMk7IV5RjxN3rUKVvX0cq~oj2GBGPlrI1cRSE7vnFbqVtCfBiPKr8QknqPFSuOOYGhIzqaArFsv3C-ywmjjbI5KSB9vY7oYK5U4i4udQ3ttQ4wwBabk0lLZmigK~BDCOg~iAeLosIYJvjhkPgWZGWA2jG~divNmgqYMKpAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/717d/484d/9a7355ad6463d747b4a28f23536478da?Expires=1682294400&Signature=e02W6N30umLSnFlozSjSaEFnbYwc2Nagh0c387PtFEmJ9N0Oza1rySEyrPo2Bd4UrKS4DN8EeCTwki7pIPb9xD4MVaRDEjN5ekWkYEyDQpqgkoH-SsUe7HhuZltyUNOSQVil2Ah9Q~TXPMgJE7ba5SWmSbgqFu3G2g4IK1xhfixH5cCVQCkSOJiaMD4ss2aPshhUpJxpzjMTZ42NqfjlUWHH2W8pXoP33jWqxcDEb~1vibyHgtHDQ8q7spB8ToL0hZkS12u3NAxm1wmD8BOaLCFH~sErHhacsF1JKX08-v8X24DQXUQ-MLY3LtMynPUNq-12Z9gcF5xQ7rb7AnM--g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9a82/bf2a/87de4ef11b79efd3dfa2cb550ed9b850?Expires=1682294400&Signature=pOOdhCf7AJi94w66q1z36OCxSf4Capzhctop0p5-sTzQ9JrWtRvm2HxXKuZzuJoTny195CSuPANVM~G5~uPt5-H6VrRcapO9OsUCgbEnREhJeWpJX~ArPKI9sTbi2kooNxLB2o3TNnZidz2bjEofj5zc836nQDMu-m4Tt5LQSljE2BsPtY1~wETEd0cYU1tk1Y-ifTXNiYFI30phHfiFzUsaeNekFilXfwgYMjcHr4d17k-2SV52DWZco3EEXpo1JE7W3iwDDXoD14IwTYmd7cnAjgXSmfPE~xg6BA-guLeDeudQP3mpHVaKh2qOG46WaXFni9-olmc3XcAzeF8cXA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/00ed/2cf7/2916ac63a0fe60254212769faf18a7e4?Expires=1682294400&Signature=AO2tXst59dM7joQaKz77fFb5wiMAX4vb~Qaqddv~Sb2FRoDQjEaY1h24wXw2hCPQsTMKqlGvpFcJyh0cnDojFfw7o81H9ESopm3mqGxpde6OByfbedkVqBdBhb7h-~7IZvptWZNIiFmMxF004sxBUnaPsD4KBQQx9StcSI5XATsJlB2~daB746376MHX5obpTXDWPc7yeQbU2DnZB3XJ5RxAKpeqWm-DeR~~z9azMFtSW~iwIB2LPSpMyQjftpO0dG04pPJJqyVsLY3IClcg-DDetsPvBT-ct5FKGpyvr-0iqr6~Ev1-5J~TpOVx0MfKA5BPBFJAA0m9gZdCecPB8Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
  };
  const randomImage = getRandomImage();

  const setQueryValues: Function = () => {
    if (locationInput?.latitude) {
      router.query["latitude"] = locationInput.latitude.toString();
    }

    if (locationInput?.longitude) {
      router.query["longitude"] = locationInput.longitude.toString();
    }

    router.query["proximity"] = (
      document.getElementById("proximity") as HTMLInputElement
    ).value;

    router.query["price"] = (
      document.getElementById("price") as HTMLInputElement
    ).value;

    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  const showCalendar: Function = () => {
    // insert calendar component here
  };

  const showAmenities: Function = () => {
    //insert amenities component
  };

  const display_listing = (
    id: string,
    name: string,
    cost: string,
    proximity: string,
    imageList: string[],
    location_details: string
  ) => {
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * imageList.length);
      return imageList[randomIndex];
    };

    const randomImage = getRandomImage();

    return (
      <div
        className="container flex flex-col border border-grey-500"
        onClick={() => router.push(`/listings/${id}`)}
      >
        <div className="flex justify-center">
          <img
            className="object-cover w-full h-56 rounded-lg ml-2 mr-2"
            src={randomImage}
            alt=""
          ></img>
        </div>
        <div className="flex flex-col justify-between ml-2 mb-2">
          <div className="flex flex-row">
            <div className="flex flex-row w-full justify-left">
              <span className="text-sm font-sm text-black hover:underline hover:font-semibold dark:text-black cursor-pointer">
                {name}
              </span>
            </div>
            <div className="flex flex-row w-full justify-end mr-2">
              <span className="text-sm text-black dark:text-black">
                ${cost}/month
              </span>
            </div>
          </div>
          <span className="text-sm text-black dark:text-black">
            {location_details}
          </span>
          <span className="text-sm text-black dark:text-black">
            {parseFloat(proximity).toFixed(2) + " miles away"}
          </span>
        </div>
      </div>
    );
  };

  <Link href="/results" />;

  return (
    <div className="flex flex-col pt-16">
      <div className="container mx-auto pt-[5vh]">
        <div className="flex flex-row mb-4">
          <div className="flex justify-start w-full">
            <LocationSearchBar
              setCoordinates={setLocationInput}
            ></LocationSearchBar>
          </div>
          <div className="flex justify-end w-[20vw]">
            <input
              type="text"
              className="w-[9vw] rounded-lg border border-gray-400 p-2 text-black"
              placeholder="Proximity"
              id="proximity"
            />
            <input
              type="number"
              className="w-[7vw] rounded-lg border border-gray-400 p-2 text-black"
              placeholder="Price"
              id="price"
            />
            {/* <button
              className="ml-2 rounded-lg bg-white p-2 text-black hover:bg-gray-600 hover:text-white border border-black"
              onClick={() => showCalendar()}
            >
              Dates
            </button>

            <button
              className="ml-2 rounded-lg bg-white p-2 text-black hover:bg-gray-600 hover:text-white border border-black"
              onClick={() => showAmenities()}
            >
              Amenities
            </button> */}
            <button
              className="ml-2 rounded-lg bg-white p-2 text-black hover:bg-gray-600 hover:text-white border border-black"
              onClick={setQueryValues}
            >
              Filter
            </button>
            <button
              className="ml-2 rounded-lg bg-white p-2 text-black hover:bg-gray-600 hover:text-white border border-black"
              onClick={() => router.push(router.pathname)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <section className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-2 mt-2 md:mt-4 md:grid-cols-4 mb-4">
            {listings.map((listing: any) => {
              {
                return display_listing(
                  listing.listing_id,
                  listing.name,
                  listing.price,
                  listing.proximity,
                  imageList,
                  listing.location_details
                );
              }
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  if (!context.query.longitude) {
    context.query.longitude = defaultCoordindates.longitude;
  }

  if (!context.query.latitude) {
    context.query.latitude = defaultCoordindates.latitude;
  }

  return {
    props: {
      listings: await (
        await fetch(
          "http://localhost:3000/api/listings" +
            "?" +
            new URLSearchParams(context.query)
        )
      ).json(),
    },
  };
}
