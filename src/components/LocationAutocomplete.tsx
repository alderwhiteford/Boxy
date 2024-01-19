import { useCallback, useEffect, useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";

export function LocationAutocomplete(props: any) {
  const [someState, setSomeState] = useState(false);
  const onPlaceSelected = useRef(() => undefined);

  // "toggleState" assinged a new function everytime "someState" changes
  const toggleState = useCallback(() => {
    const newState = !someState;
    setSomeState(newState);
    console.log("new state is", newState);
  }, [someState]);

  // "onPlaceSelected" is assinged a new function everytime "toggleState" changes
  useEffect(() => {
    onPlaceSelected.current = (place) => {
      if (props.setCoordinates) {
        props.setCoordinates({
          latitude: place[0].geometry.location.lat(),
          longitude: place[0].geometry.location.lng(),
        });
      }

      let route = "";
      let zipCode = "";
      let streetNumber = "";
      let state = "";
      let city = "";
      place[0].address_components.forEach((addressComponent: any) => {
        if (addressComponent.types.includes("street_number")) {
          streetNumber = addressComponent.short_name;
        }

        if (addressComponent.types.includes("postal_code")) {
          zipCode = addressComponent.short_name;
        }

        if (addressComponent.types.includes("locality")) {
          city = addressComponent.short_name;
        }

        if (addressComponent.types.includes("route")) {
          route = addressComponent.short_name;
        }

        if (addressComponent.types.includes("administrative_area_level_1")) {
          state = addressComponent.short_name;
        }
      });

      if (props.setLocationDetails) {
        props.setLocationDetails({
          address: `${streetNumber} ${route}`,
          city: city,
          zipCode: zipCode,
          state: state,
          lat: place[0].geometry.location.lat(),
          lon: place[0].geometry.location.lng(),
        });
      }

      toggleState();
    };
  }, [toggleState]);

  const types = ["street_address"];

  return (
    <Autocomplete
      apiKey={process.env.GOOGLE_MAPS_API_KEY}
      options={{ types: props.address ? types : [] }} // configure this differnelty for browse page
      onPlaceSelected={(...args) => onPlaceSelected.current(args)}
      className="h-[100%] w-[60vw] md:w-[70vw] lg:w-[33vw] pl-5 border-[2px] border-[#B5B5B5] rounded-lg"
    />
  );
}
