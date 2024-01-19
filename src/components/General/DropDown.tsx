import { useState } from "react";

export default function DropDown({ options, currentOption, setOptions, placeholder, onFocus }: any) {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="flex flex-col text-left">
      <input
        className="bg-[#E9E9E9] hover:bg-[#E2E2E2] h-12 mt-2 rounded-lg mr-2 px-3"
        onClick={() => setShowDropDown(!showDropDown)}
        placeholder={placeholder}
        value={currentOption}
        onFocus={onFocus}
      ></input>
      {showDropDown ? (
        <div
          className="z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          onBlur={() => setShowDropDown(false)}
        >
          <div className="py-1">
            {options.map((option: string, i: number) => {
              return (
                <div
                  key={i}
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={() => {
                    setOptions(option);
                    setShowDropDown(false);
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      ) : undefined}
    </div>
  );
}