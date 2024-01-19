import { BiPencil } from "react-icons/bi";

export default function ItemInformationForm(props: any) {
  function countDateRange() {
    const start = new Date(props.dateRange[0]).getTime();
    const end = new Date(props.dateRange[1]).getTime();

    // Calculate the difference in milliseconds
    const diff_ms = end - start;

    // Convert milliseconds to days
    const diff_days = Math.floor(diff_ms / (1000 * 60 * 60 * 24)) + 1;

    props.setTotalPrice(diff_days * props.listing.price + 15);
    return diff_days;
  }

  return (
    <div className="container flex flex-col">
      <h2 className="text-[25px] mb-2">Describe your storage items</h2>
      <h4 className="text-[20px] md:text-[20px] mb-5">
        You must declare anything that costs more than $500 and only the items
        you list are eligible for coverage under a protection plan.
      </h4>
      <textarea
        className="block p-2.5 w-full h-[20vh] text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mb-5 placeholder-gray-400 placeholder-opacity-75 placeholder-text-sm"
        placeholder="E.g., Three 16 x 12 x 12 small boxes containing clothing, a queen mattress, and a fan"
      ></textarea>
      <hr className="w-[100%] h-[0.75px] bg-[#B5B5B5] border-0"></hr>
      <h2 className="text-[25px] mb-2 mt-5">
        Would you like to add the Boxy Protection Plan?
      </h2>
      <div className="flex items-center space-x-4 mt-2">
        <input
          type="radio"
          id="protection-plan-yes"
          name="protection-plan"
          value="yes"
          className="h-6 w-6 mr-2"
        />
        <label htmlFor="protection-plan-yes">Yes, add the protection plan</label>
        <input
          type="radio"
          id="protection-plan-no"
          name="protection-plan"
          value="no"
          className="h-6 w-6 mr-2"
        />
        <label htmlFor="protection-plan-no">No, do not add the protection plan</label>
      </div>
    </div>
  );
}
