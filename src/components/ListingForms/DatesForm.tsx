import { useState } from "react";
import FormLayout from "./FormLayout";
import Calendar from "@/assets/Calendar.svg";
import DropDown from "@/components/General/DropDown";

export default function DatesForm({
  startDate,
  startTime,
  startTOD,
  endDate,
  endTime,
  endTOD,
  setStartDate,
  setStartTime,
  setStartTOD,
  setEndDate,
  setEndTime,
  setEndTOD,
}: any) {
  const [errors, setErrors] = useState({
    start: "",
    end: "",
  });

  const handleTime = (time: any, setTime: any, value: string) => {
    if (value && !/^[0-9]/.test(value)) return;
    value = value.length > 5 ? value.slice(-1) : value;
    value =
      value.length < 2 && Number(value) > 2 ? value.padStart(2, "0") : value;
    if (value.length == 2) {
      if (time.length == 3) {
        return setTime(value.slice(0, 1));
      } else if (Number(value) > 23) {
        return;
      } else {
        value += ":";
      }
    }
    if (value.length > 3 && Number(value.split(":")[1]) > 5) {
      value = value.slice(0, 3) + value.slice(3).padStart(2, "0");
    }
    setTime(value);
  };

  const handleTimeBlur = (time: string) => {
    const curTime = time == "start" ? startTime : endTime;
    const setTOD = time == "start" ? setStartTOD : setEndTOD;
    const setTime = time == "start" ? setStartTime : setEndTime;
    if (!curTime) return;
    const hours = curTime.split(":")[0];
    if (Number(hours) > 12) {
      setTOD("PM");
      setTime(curTime.replace(hours, (Number(hours) - 12).toString()));
    } else if (Number(hours) < 12) {
      setTOD("AM");
    }
  };

  const validate = () => {
    if (!startDate) {
      setErrors({ ...errors, start: "Please select a start date" });
      return false;
    }
    if (!endDate) {
      setErrors({ ...errors, end: "Please select an end date" });
      return false;
    }
    const startTimeTemp = startTime ? startTime : "00:00";
    const startTODTemp = startTOD ? startTOD : "AM";
    const endTimeTemp = endTime ? endTime : "11:59";
    const endTODTemp = endTOD ? endTOD : "PM";
    // start date and start time, split by - and :
    // also for some reason the month is 0-indexed so sdSplit[0]-1 is to account for that
    const sdSplit = startDate.split("-").map((value: any) => Number(value));
    const stSplit = startTimeTemp.split(":").map((value: any) => Number(value));
    const startDateTime = new Date(
      sdSplit[2],
      sdSplit[0] - 1,
      sdSplit[1],
      startTODTemp == "AM" ? stSplit[0] : stSplit[0] + 12,
      stSplit[1]
    );

    const edSplit = endDate.split("-").map((value: any) => Number(value));
    const etSplit = endTimeTemp.split(":").map((value: any) => Number(value));
    const endDateTime = new Date(
      edSplit[2],
      edSplit[0] - 1,
      edSplit[1],
      endTODTemp == "AM" ? etSplit[0] : etSplit[0] + 12,
      etSplit[1]
    );

    setStartTime(startTimeTemp);
    setStartTOD(startTODTemp);
    setEndTime(endTimeTemp);
    setEndTOD(endTODTemp);

    const now = new Date();
    if (!(startDateTime > now)) {
      setErrors({ ...errors, start: "Start date must be in the future" });
      return false;
    }
    if (!(endDateTime > startDateTime)) {
      setErrors({ ...errors, end: "End date must be after start date" });
      return false;
    }
    return true;
  };

  return (
    <FormLayout image={Calendar} validate={validate}>
      <div className="flex flex-col w-[90%] font-Satoshi">
        <h1 className="text-3xl mb-2">Availability</h1>
        <h3 className="mb-5">
          Please provide the Start Date and End Date for location availability.
        </h3>
        <div className="grid grid-cols-4 mb-5 rounded-lg">
          <div className="col-span-2 text-xl">Start</div>
          <div className="col-span-2 text-xl">End</div>
          <input
            className="col-span-2 bg-[#E9E9E9] hover:bg-[#E2E2E2] h-12 mt-4 rounded-lg mr-2 px-3"
            placeholder="mm/dd/yyyy"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            type="date"
            onFocus={() => setErrors({ start: "", end: "" })}
          />
          <input
            className="col-span-2 bg-[#E9E9E9] hover:bg-[#E2E2E2] h-12 mt-4 rounded-lg mr-2 px-3"
            placeholder="mm/dd/yyyy"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            type="date"
            onFocus={() => setErrors({ start: "", end: "" })}
          />
          {/* <input
            className="bg-[#E9E9E9] hover:bg-[#E2E2E2] h-12 mt-2 rounded-lg mr-2 px-3"
            placeholder="__:__"
            value={startTime}
            onChange={(event) =>
              handleTime(startTime, setStartTime, event.target.value)
            }
            onBlur={() => handleTimeBlur("start")}
            onFocus={() => setErrors({ start: "", end: "" })}
          />
          <DropDown
            options={["AM", "PM"]}
            currentOption={startTOD}
            setOptions={setStartTOD}
            placeholder="AM"
            onFocus={() => setErrors({ start: "", end: "" })}
          />
          <input
            className="bg-[#E9E9E9] hover:bg-[#E2E2E2] h-12 mt-2 rounded-lg mr-2 px-3"
            placeholder="__:__"
            value={endTime}
            onChange={(event) =>
              handleTime(endTime, setEndTime, event.target.value)
            }
            onBlur={() => handleTimeBlur("end")}
            onFocus={() => setErrors({ start: "", end: "" })}
          />
          <DropDown
            options={["AM", "PM"]}
            currentOption={endTOD}
            setOptions={setEndTOD}
            placeholder="AM"
            onFocus={() => setErrors({ start: "", end: "" })}
          /> */}
        </div>
        <div className="text-red-500">{errors.start}</div>
        <div className="text-red-500">{errors.end}</div>
      </div>
    </FormLayout>
  );
}
