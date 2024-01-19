import { useState } from "react";
import { LocationAutocomplete } from "../LocationAutocomplete";

type LocationSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

export function LocationSearchBar(props: any) {
  const [locationSearchSuggestions, setLocationSearchSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [locationSearchInput, setLocationSearchInput] = useState("");

  return (
    <div className="relative">
      <LocationAutocomplete
        setCoordinates={props.setCoordinates}
        setLocationDetails={props.setLocationDetails}
        address={props.address}
      ></LocationAutocomplete>
      <ul className="suggestions-dropdown absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full">
        {locationSearchSuggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              props.setCoordinates({
                latitude: parseInt(suggestion.lat),
                longitude: parseInt(suggestion.lon),
              });
              setLocationSearchInput(suggestion.display_name);
              setLocationSearchSuggestions([]);
            }}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
