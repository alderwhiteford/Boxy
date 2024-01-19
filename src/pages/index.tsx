import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import arrowIcon from "../assets/BoxyArrowIcon.png";
import { signIn, useSession } from "next-auth/react";
import { Coordinate, defaultCoordindates } from "./_app";
import Workflow from "@/components/LandingPage/Workflow";
import { LocationSearchBar } from "@/components/Browse/LocationSearchBar";
import FAQ from "@/components/FAQ";
import Workflow1 from "../assets/workflow_1.png";
import Workflow2 from "../assets/workflow_2.png";
import Workflow3 from "../assets/workflow_3.png";
import Workflow4 from "../assets/workflow_4.png";
import ServiceImage from "../assets/boxyhomeimage.png";

type LocationSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

export default function LandingPage(props: any) {
  const session = useSession();
  const [coordinates, setCoordinates] =
    useState<Coordinate>(defaultCoordindates);
  const [locationInput, setLocationInput] = useState("");
  // const suggestions = useLocationSuggestions(locationInput);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: string;
    lon: string;
  } | null>(null);

  useEffect(() => {
    if (selectedLocation) {
      const lat = parseInt(selectedLocation.lat);
      const lon = parseInt(selectedLocation.lon);
      props.setLocation([lat, lon]);
    }
  }, [selectedLocation]);

  // function useLocationSuggestions(query: string): LocationSuggestion[] {
  //   const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  //   useEffect(() => {
  //     if (!query) {
  //       setSuggestions([]);
  //       return;
  //     }

  //     const fetchSuggestions = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&countrycodes=us&limit=5`
  //         );
  //         const data = await response.json();
  //         setSuggestions(data);
  //       } catch {
  //         return;
  //       }
  //     };

  //     fetchSuggestions();
  //   }, [query]);

  //   return suggestions;
  // }

  function workflow(image: string, text: string, arrow: boolean) {
    return (
      <div className="flex align-top">
        <div className="ml-5 mr-5">
          <img className="w-[10vw] h-[10vw] mb-5 object-contain" src={image} />
          <h3 className="text-[15px] w-[10vw] text-center">{text}</h3>
        </div>
        {arrow ? (
          <img
            className="w-[6.25vw] h-3 mt-[6.25vw] object-contain"
            src={arrowIcon.src}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }

  function service(image: string, title: string, text: string) {
    return (
      <div className="flex flex-col items-center mr-[4vw] ml-[4vw]">
        <img
          className="w-[35vw] h-[20vw] rounded-md object-cover"
          src={image}
        />
        <h2 className="text-[20px] mt-7 pb-2">{title}</h2>
        <h3 className="text-[15px] text-center w-[30vw]">{text}</h3>
      </div>
    );
  }

  function button(text: string) {
    return (
      <button className="h-[60px] w-[20vw] lg:w-[11vw] ml-5 bg-bxBrand text-white rounded-3xl hover:bg-bxBrandLight transition ease-in duration-75">
        {text}
      </button>
    );
  }

  const { ref, inView } = useInView();
  const animation = useAnimation();
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    if (inView) {
      setLoad(true);
      animation.start({
        opacity: 1,
        transition: {
          type: "tween",
          duration: 0.5,
        },
      });
    } else {
      animation.start({
        opacity: 0,
      });
    }
  }, [inView]);

  function getSearchResultsUrl(): string {
    // return `/listings/browse?latitude=${encodeURIComponent(
    //   coordinates.latitude
    // )}&longitude=${encodeURIComponent(coordinates.longitude)}&proximity=15`;

    // TODO: unhardcode lat and lon once integrated with reliable maps API
    return `/listings/browse?latitude=${encodeURIComponent(
      coordinates.latitude || defaultCoordindates.latitude
    )}&longitude=${encodeURIComponent(
      coordinates.longitude || defaultCoordindates.longitude
    )}&proximity=15`;
  }

  return (
    <div className="container min-w-[100vw]">
      <div
        id="search"
        className="flex justify-center items-center w-[100vw] h-[70vh]"
      >
        <div className="relative flex flex-col items-center pt-8 pr-0 w-[100vw] md:w-auto lg:pr-12 md:items-start">
          <h1 className="text-[60px] md:text-[60px]">Stashing with Boxy</h1>
          <h3 className="text-[15px] md:text-[20px]">
            Boxy makes it easy to find convenient, local storage.
          </h3>
          <div className="flex pt-5 h-[80px]">
            <LocationSearchBar
              setCoordinates={setCoordinates}
            ></LocationSearchBar>
            <a href={getSearchResultsUrl()}>{button("Find Storage")}</a>
          </div>
        </div>
        <div className="pt-8 w-0 lg:w-[34.5vw] h-[38vh] invisible lg:visible">
          <div className="absolute w-[33vw] h-[35vh] ml-[1.5vw] mt-[1.5vw] rounded-xl bg-bxContrast invisible lg:visible" />
          <img
            className="absolute w-[33vw] h-[35vh] object-cover rounded-xl invisible lg:visible"
            src="https://static.wixstatic.com/media/fbf970_b070ca63b7a04350bc9939ca0e0eeb77~mv2.jpg/v1/fill/w_2880,h_1362,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/fbf970_b070ca63b7a04350bc9939ca0e0eeb77~mv2.jpg"
          />
        </div>
      </div>
      <div
        id="function"
        className="flex flex-col min-w-fill h-[70vh] items-center justify-center"
      >
        <h2 className="text-[35px] mb-20">How it Works</h2>
        <div className="flex">
          {workflow(
            Workflow1.src,
            "Request a storage reservation through Boxy.",
            true
          )}
          {workflow(
            Workflow2.src,
            "Get approval from your host to confirm the reservation.",
            true
          )}
          {workflow(
            Workflow4.src,
            "Bring your belongings to the storage location on your drop-off day.",
            true
          )}
          {workflow(
            Workflow3.src,
            "Pick up your belongings on your pick-up day. Storage successful!",
            false
          )}
        </div>
      </div>
      <div
        ref={ref}
        id="service"
        className={
          inView || loaded
            ? "flex flex-col min-w-full items-center justify-center opacity-100 transition ease-in duration-500 pt-20 pb-20"
            : "opacity-0"
        }
      >
        <div className="flex mb-10">
          {service(
            ServiceImage.src,
            "Stashing",
            "Stash your belongings through Boxy to find convenient, local spaces. Easily search for storage spaces near your and request a reservation to start the process!"
          )}
          {service(
            ServiceImage.src,
            "Hosting",
            "Register as a host to turn your empty spaces into passive income. Boxy enables you to rent out these spaces for others to stash in."
          )}
        </div>
        {session.status === "unauthenticated" ? (
          <div onClick={signIn} href={"/user/register"}>
            {button("Sign up now", "11vw", "20vw")}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div id="faq-section">
        <FAQ />
      </div>
    </div>
  );
}
