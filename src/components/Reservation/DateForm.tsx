import { BiPencil } from "react-icons/bi";

export default function DateForm(props: any) {

    function countDateRange() {
        const start = new Date(props.dateRange[0]).getTime()
        const end = new Date(props.dateRange[1]).getTime()

        // Calculate the difference in milliseconds
        const diff_ms = end - start;

        // Convert milliseconds to days
        const diff_days = (Math.floor(diff_ms / (1000 * 60 * 60 * 24))) + 1;

        props.setTotalPrice((diff_days * props.listing.price) + 15)
        return diff_days;
    }

    return (
        <div className='container flex flex-col'>
            <h2 className='text-[25px] mb-2'>Dates</h2>
            <div className='flex mb-2'>
                <h4 className='text-[10px] md:text-[15px] mr-5'>Storage: {props.dateRange[0] + ' - ' + props.dateRange[1]}</h4>
                <button onClick={() => props.setDateEdit(true)}>
                    <BiPencil size={20}/>
                </button>
            </div>
            <h4 className='text-[10px] md:text-[15px] mb-5'>Access Dates: None</h4>
            <hr className='w-[100%] h-[0.75px] bg-[#B5B5B5] border-0'></hr>
            <h2 className='text-[25px] mb-2 mt-5'>Pricing</h2>
            <div className='w-[100%] flex place-content-between mb-2'>
                <h4 className='text-[10px] md:text-[15px]'>${props.listing.price + " "}/ day &#x2022; {countDateRange()} days</h4>
                <h4 className='text-[10px] md:text-[15px]'>${props.listing.price * countDateRange()}</h4>
            </div>
            <div className='w-[100%] flex place-content-between mb-2'>
                <h4 className='text-[10px] md:text-[15px]'>Fees</h4>
                <h4 className='text-[10px] md:text-[15px]'>$15</h4>
            </div>
            <div className='w-[100%] flex place-content-between mb-2'>
                <h4 className='text-[10px] md:text-[15px]'>Total:</h4>
                <h4 className='text-[10px] md:text-[15px]'>${(props.listing.price * countDateRange()) + 15}</h4>
            </div>
        </div>
    )
}