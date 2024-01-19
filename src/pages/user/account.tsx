import Link from "next/link";
import { useState } from "react";

export default function UserAccountPage() {
  <Link href="/signup" />;

  const [accountState, setAccountState] = useState("account");

  const account_tab = (state: string, text: string) => {
    return (
      <button
        onClick={() => setAccountState(state)}
        className={
          accountState == state
            ? "flex justify-center bg-gray-100 rounded-lg"
            : "flex justify-center"
        }
      >
        <div className="flex items-center p-2 w-full font-normal text-gray-900 rounded-lg hover:bg-gray-100">
          <span className="ml-3 p-2 cursor-pointer">{text}</span>
        </div>
      </button>
    );
  };

  const display_tab = () => {
    switch (accountState) {
      case "account":
        return (
          <h2 className="text-1xl text-gray-400 mt-2 ml-1">
            {" "}
            / Personal Information
          </h2>
        );
      case "payment":
        return (
          <h2 className="text-1xl text-gray-400 mt-2 ml-1">
            {" "}
            / Payment Information
          </h2>
        );
      case "password":
        return (
          <h2 className="text-1xl text-gray-400 mt-2 ml-1">
            {" "}
            / Change Password
          </h2>
        );
      case "notification":
        return (
          <h2 className="text-1xl text-gray-400 mt-2 ml-1">
            {" "}
            / Notification Information
          </h2>
        );
    }
  };

  const state_form = () => {
    const account_form = (
      <div className="flex flex-col">
        <h1 className="text-1xl">First Name</h1>
        <input
          type="text"
          className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
          placeholder="Enter your first name"
        />
        <h1 className="text-1xl">Last Name</h1>
        <input
          type="text"
          className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
          placeholder="Enter your last name"
        />
        <h1 className="text-1xl">Email Address</h1>
        <input
          type="text"
          className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
          placeholder="Enter your email"
        />
        <h1 className="text-1xl">Verified ID</h1>
      </div>
    );

    const payment_form = (
      <div className="flex flex-col">
        <div className="flex flex-row justify-end mb-10">
          <button className="w-[10vw] top-2 right-2 rounded-full bg-gray-500 p-2 text-white hover:bg-gray-600 hover:text-white">
            Add New
          </button>
        </div>
        <div className="flex flex-col rounded-lg w-[60vw] p-2 border">
          <div className="flex flex-row">
            <h1 className="text-1xl w-11/12">Credit Card</h1>
            <button className="p-1 mr-2 hover:bg-gray-200 hover:text-white">
              X
            </button>
            <button className="p-1 mr-2 hover:bg-gray-200 hover:text-white">
              X
            </button>
          </div>
          <div className="flex flex-row">
            <image className="w-24 h-20 bg-gray-200 rounded-lg mr-5"></image>
            <div className="flex flex-col ">
              <h1 className="text-1xl mb-5">**** **** **** 0111</h1>
              <h1 className="text-1xl">Expires 01/23</h1>
            </div>
          </div>
        </div>
      </div>
    );

    const password_form = (
      <div className="flex flex-col">
        <h1 className="text-1xl">Current Password</h1>
        <p className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100">
          **************
        </p>
        <h1 className="text-1xl">New Password</h1>
        <input
          type="text"
          className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
          placeholder="Enter new password"
        />
        <h1 className="text-1xl">Confirm Password</h1>
        <input
          type="text"
          className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
          placeholder="Enter new password"
        />
        <button className="w-[10vw] ml-2 rounded-full bg-gray-500 p-2 text-white hover:bg-gray-600 hover:text-white">
          Save
        </button>
      </div>
    );

    const checkbox = (name: string) => {
      return (
        <div className="flex flex-row mb-5 min-w-full">
          <h1 className="text-1xl w-11/12">{name}</h1>
          <input
            className="mt-[0.3rem] ml-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault01"
          />
        </div>
      );
    };

    const notification_form = (
      <div className="flex flex-col w-3/5">
        <h1 className="text-1xl mb-5 min-w-full">Notify me about:</h1>
        {checkbox("My reservation is updated")}
        {checkbox("A host or stasher contacts me")}
        {checkbox("Something else")}
        {checkbox("Boxy updates")}
      </div>
    );

    switch (accountState) {
      case "account":
        return account_form;
      case "payment":
        return payment_form;
      case "password":
        return password_form;
      case "notification":
        return notification_form;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row mb-10 ml-2">
        <h1 className="text-3xl flex ml-20">Account</h1>
        {display_tab()}
      </div>
      <div className="flex flex-row">
        <div className="flex transition-transform h-screen w-1/3">
          <div className="ml-20">
            <ul className="space-y-4">
              <li>{account_tab("account", "Account Information")}</li>
              <li>{account_tab("payment", "Payment Information")}</li>
              <li>{account_tab("password", "Change Password")}</li>
              <li>{account_tab("notification", "Notification Settings")}</li>
            </ul>
          </div>
        </div>
        {state_form()}
      </div>
    </div>
  );
}
