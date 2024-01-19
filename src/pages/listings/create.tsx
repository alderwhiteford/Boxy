import { createContext, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import AddressForm from "@/components/ListingForms/AddressForm";
import DatesForm from "@/components/ListingForms/DatesForm";
import SpaceTypeForm from "@/components/ListingForms/SpaceTypeForm";
import AmenitiesForm from "@/components/ListingForms/AmenitiesForm";
import ItemsForm from "@/components/ListingForms/ItemsForm";
import SubmitForm from "@/components/ListingForms/SubmitForm";
import { useRouter } from "next/router";
import { defaultCoordindates } from "../_app";

export const ListingContext = createContext<any>(null);

export default function ListingCreate({}: any) {
  const { data, status } = useSession();
  const amenityList = [
    "Pest Controlled",
    "Fire Alarm System",
    "Smoke Free",
    "Pet Free",
    "Access to Elevator",
    "Ground Floor",
    "Climate Controlled",
    "Private Storage",
    "Party Free",
    "Other",
  ];

  const spaceTypeList = [
    "Basement",
    "Closet",
    "Common Living Space",
    "Bedroom",
    "Cabinet",
    "Unoccupied Room",
    "Other",
  ];

  const itemsList = [
    "Boxes Only",
    "Furniture Only",
    "Boxes and Furnitures",
    "Other",
  ];

  // address form states
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // time of day (AM/PM)
  const [startTOD, setStartTOD] = useState("");
  const [endTOD, setEndTOD] = useState("");

  // amenities, spacetype, items are represented by array of booleans
  // true means that the index in the corresponding list is selected
  const [amenities, setAmenities] = useState(
    amenityList.map((_: any) => false)
  );
  const [spaceType, setSpaceType] = useState(
    spaceTypeList.map((_: any) => false)
  );
  const [items, setItems] = useState(itemsList.map((_: any) => false));
  const [description, setDescription] = useState("");

  const [currentForm, setCurrentForm] = useState(0);

  const forms = [
    <AddressForm
      setAddress={setAddress}
      setAparment={setApartment}
      setCity={setCity}
      setState={setState}
      setName={setName}
      setZipCode={setZipCode}
      setPrice={setPrice}
      setLatLong={setLatLong}
      address={address}
      apartment={apartment}
      city={city}
      state={state}
      zipCode={zipCode}
      name={name}
      price={price}
    />,
    <DatesForm
      startDate={startDate}
      startTime={startTime}
      startTOD={startTOD}
      endDate={endDate}
      endTime={endTime}
      endTOD={endTOD}
      setStartDate={setStartDate}
      setStartTime={setStartTime}
      setStartTOD={setStartTOD}
      setEndDate={setEndDate}
      setEndTime={setEndTime}
      setEndTOD={setEndTOD}
    />,
    <AmenitiesForm setAmenities={setAmenities} amenities={amenities} />,
    <SpaceTypeForm setSpaceType={setSpaceType} spaceType={spaceType} />,
    <ItemsForm
      description={description}
      setDescription={setDescription}
      setItems={setItems}
      items={items}
    />,
    <SubmitForm
      fields={[
        name,
        `${address} ${
          apartment ? apartment + " " : ""
        }${city}, ${state} ${zipCode}`,
        `from ${startDate} to ${endDate}`,
        amenityList.filter((_: string, i: number) => amenities[i]).join(", "),
        spaceTypeList.filter((_: string, i: number) => spaceType[i]).join(", "),
        itemsList.filter((_: string, i: number) => items[i]).join(", "),
      ]}
      changeForm={setCurrentForm}
    />,
  ];

  const router = useRouter();

  if (status === "unauthenticated") {
    signIn();
  }

  function createDateRange() {
    let dateList = [];
    let curDate = new Date(startDate);
    let lastDate = new Date(endDate);

    while (curDate.toDateString() != lastDate.toDateString()) {
      let dateCopy = new Date(curDate.toDateString());
      dateList.push(dateCopy);
      let date = curDate.getDate() + 1;
      curDate.setDate(date);
    }

    return dateList;
  }

  // function setDateRange(start, end) {
  //   console.log(start, end);
  // }

  async function createListing() {
    console.log(name);
    const res = await fetch("http://localhost:3000/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
        dates_available: createDateRange(),
        description: description,
        amenities: [
          // TODO unharcode
          "Pest_Controlled",
          "Fire_Alarm_System",
          "Smoke_Free",
          "Pet_Free",
          "Access_to_Elevator",
          "Ground_Floor",
          "Climate_Controlled",
          "Private_Storage",
          "Party_Free",
        ],
        space_type: "Closet", // TODO: unharcode
        address: address || "123 test ave",
        city: city || "boston",
        zip_code: zipCode || "12345",
        state: state || "CA",
        space_available: [1, 2, 3], // TODO: unharcode
        longitude: latLong.longitude || defaultCoordindates.longitude,
        latitude: latLong.latitude || defaultCoordindates.latitude,
      }),
    });

    if (res.status == 200) {
      router.push("/listings/confirmation");
    } else {
      const err = await res.json();
      alert(err.message);
    }
  }

  const validateAddress = () =>
    address && apartment && city && zipCode && name && price;

  const validations = [validateAddress];

  return (
    <ListingContext.Provider
      value={{
        amenityList,
        spaceTypeList,
        itemsList,
        forms,
        currentForm,
        setCurrentForm,
        createListing,
      }}
    >
      <div className="container flex flex-col items-center min-w-full h-screen">
        {forms[currentForm]}
      </div>
    </ListingContext.Provider>
  );
}
