import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { AiOutlineLeft } from "react-icons/ai";
import ReservationOverview from "./ReservationOverview";
import { useSession } from "next-auth/react";

export default function PaymentForm({
  reservation,
  totalPrice,
  dateRange,
  setCurrentForm,
}: any) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51MnRz2ERgVuN2eWvEEtIZmuFixqk7YQNOpOt4ID70uoRmUUTbdWIJ5T0kTFWM63VJv8vXJFdpYZ93jUMHFISA5E900b36kbFse"
      )
    );
  }, []);

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      body: JSON.stringify({
        currency: "USD",
        amount: reservation.price,
        automatic_payment_methods: { enabled: true },
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        setClientSecret(data.client_secret);
        setPaymentId(data.id);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {clientSecret && (
        <div>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              reservationInfo={reservation}
              paymentId={paymentId}
              totalPrice={totalPrice}
              dateRange={dateRange}
              setCurrentForm={setCurrentForm}
            />
          </Elements>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({
  reservationInfo,
  paymentId,
  totalPrice,
  dateRange,
  setCurrentForm,
}: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function createDateRange(startDate: any, endDate: any) {
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

  console.log(dateRange);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setStatus("Processing ...");

    const res = await fetch("http://localhost:3000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // hard coded values for now
      body: JSON.stringify({
        listing_id: reservationInfo.listing_id,
        dates_requested: createDateRange(dateRange[0], dateRange[1]),
        stripe_id: paymentId,
      }),
    });

    if (res.status === 200) {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/stasher/confirmation`,
        },
      });
      console.log(result);
      if (result.error.message) {
        setError(result.error.message);
      }
    } else {
      setError("Error: Server failed to create reservation");
    }

    setStatus("");
  };

  return (
    <>
      <div className="container flex flex-col min-w-[80vw] pt-16 items-center opacity-100 h-[90vh]">
        <div className="flex w-[80vw] items-center mt-7 mb-7">
          <AiOutlineLeft style={{ fontSize: "10px", color: "" }} />
          <button
            onClick={() => setCurrentForm(1)}
            className="text-[15px] ml-2"
          >
            Back
          </button>
        </div>
        <div className="flex place-content-between w-[80vw]">
          <div className="flex-col w-[60%]">
            <div className="flex mb-5">
              <div className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                Reservation Dates
              </div>
              <h2 className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                {"\xa0/\xa0"}
              </h2>
              <div className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                Item Information
              </div>
              <h2 className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                {"\xa0/\xa0"}
              </h2>
              <div className="text-[20px] md:text-[32px] text-black">
                Payment
              </div>
            </div>
            <PaymentElement />
          </div>
          <div>
            {ReservationOverview(
              totalPrice,
              dateRange,
              reservationInfo,
              2,
              () => {},
              handleSubmit,
              status
            )}
            <div className="text-red-500 pt-2 text-center">{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}
