import { useState } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

type FAQItem = {
  header: string;
  question: string;
  answer: string;
};

const headers = [
  "General Questions",
  "Stashering with Boxy",
  "Hosting with Boxy",
  "Moving Help",
  "Cancellations and Refunds",
];

const faqs: FAQItem[] = [
  {
    header: "General Questions",
    question: "What is Boxy?",
    answer:
      "Boxy brings storage closer to college students by allowing them to store their belongings with a boxy host who monetizes their underutilized living space as storage space in the area.",
  },
  {
    header: "General Questions",
    question: "How does Boxy work?",
    answer:
      "City residents can list their unused space (e.g., a spare room, basement, garage, etc) by signing up as a boxy host, and if the profile is approved, their listing will show up on our platform within 72 hours after submission. College students in need of storage space can browse and book a listing according to their needs.",
  },
  {
    header: "General Questions",
    question: "What are the benefits of using Boxy?",
    answer:
      "The benefits include cost savings, proximity, and more flexible rental terms starting an hourly, weekly, and monthly basis.",
  },
  {
    header: "General Questions",
    question: "How many colleges does Boxy operate in?",
    answer:
      "We currently serve students from Northeastern University, Boston University, MIT, Brown, and RISD. Be on the lookout for us, we are coming to your college soon!",
  },
  {
    header: "Stashering with Boxy",
    question: "How can I sign up as a Boxy Stasher?",
    answer:
      "Our signup process is quick and easy! Start by browsing through our listings and selecting the best storage option for your needs. Once you've found the perfect fit, simply click 'book now' to reserve your space. \n Next, complete the form with information about your storage requirements. This will help us tailor our services to meet your specific needs. Within 72 hours, you'll receive a follow-up email with a personalized price quote. \n Don't hesitate to contact us if you have any questions or need assistance during the signup process. We're here to help!",
  },
  {
    header: "Stashering with Boxy",
    question: "How much does Boxy cost?",
    answer:
      "At Boxy, we offer affordable storage options tailored to your unique needs and timeline! The costs of our hosts can vary depending on your storage needs and timeline. On average, our stashers pay approximately $80 per month, but this amount can be higher depending on your needs and hosts' availability. \n Once you've submitted the form, we'll send you a personalized price quote within 48-72 hours. \n And the best part? If you happen to find a better price from another storage service, don't sweat it! Just send us a screenshot of the alternative pricing to support@storewithboxy.com, along with your details, and we will price match it for you.",
  },
  {
    header: "Stashering with Boxy",
    question: "Are there any promotions going on right now?",
    answer:
      "Awesome news! If you sign up for our services before April 1st, 2023, you will score a sweet 15% discount! Don't miss out on this amazing deal – sign up today and start saving!",
  },
  {
    header: "Stashering with Boxy",
    question: "How does the deposit work?",
    answer:
      "To secure your storage space with one of our trusted hosts, we will need a $25 deposit. This deposit acts as a placeholder and guarantees that your space will be reserved. Please keep in mind that we can only confirm the availability of your storage space after we've received your deposit. \n Don't worry, though – this deposit is a small price to pay for the peace of mind that comes with knowing your belongings got a storage space. Thanks for choosing Boxy!",
  },
  {
    header: "Stashering with Boxy",
    question: "How does payment work?",
    answer:
      "Currently, we only accept full payment and plan to offer a monthly payment option in the near future. However, you may request a deposit refund or add to your storage cost up until one week before your scheduled drop-off date. The deposit is not refundable if you failed to make a payment on time. However, if you would like to make an exception request, please email us at support@storewithboxy.com!",
  },
  {
    header: "Stashering with Boxy",
    question: "How does price matching work?",
    answer:
      "If you have found a better price quote on another website for the same storage and storing dates/conditions, just shoot us an email at supportwithboxy@gmail.com with a screenshot of the proof and we'll take care of the rest! \n Do not be hesitant to contact us if you have any questions or issues since we want to ensure that you receive the best value for your money. Thanks for choosing Boxy.",
  },
  {
    header: "Stashering with Boxy",
    question: "How often can I check on my stuff?",
    answer:
      "You may check in up to three times during your storage period. However, we recommend that you contact the host as soon as possible if you need to check on your stuff or grab something more than three times. Please note that the host reserves the right to deny any requests for check-ins that exceed the limit of three.",
  },
  {
    header: "Stashering with Boxy",
    question:
      "I need to move my storage out earlier than the scheduled pick-up date, what should I do?",
    answer:
      "Communication is key! If you need to make any changes to your storage plans, be sure to let your host know ASAP. You're allowed up to three check-ins during your storage period, but we are always happy to work with you and your host to make sure your experience is as smooth as possible.",
  },
  {
    header: "Stashering with Boxy",
    question: "I would like to extend my storage duration, what should I do?",
    answer:
      "No problem! Just shoot us an email at support@storewithboxy.com and one of our team members will get back to you within 24 hours.",
  },
  {
    header: "Stashering with Boxy",
    question: "What is Stasher Protection Plan?",
    answer: "Protection Plan",
  },
  {
    header: "Hosting with Boxy",
    question: "How can I sign up as a Boxy Host?",
    answer:
      "Our signup process is quick and easy! Check out our website and click on 'Register' under 'Host' to get started. Fill out your storage space(s) information and you are on your way! \n Within 72 hours, you'll receive a follow-up email letting you know whether or not your listing has been approved. If it has, we will send you a link that displays your listing on our website. \n We're working on implementing a system that will allow you to manage your space and bookings in the near future. \n Stay tuned for updates on when this feature will be available!",
  },
  {
    header: "Hosting with Boxy",
    question: "How do I get paid?",
    answer:
      "We will be in touch with you as soon as we find a suitable stasher for your storage space. You will receive the storage details and the amount you will be paid. Once you approve, we will send you a confirmation email with the stasher's profile. \n After you receive the confirmation email, the stasher may reach out to you at any time to coordinate the storage. You will receive 75% of your payment on a monthly basis. We keep the 25% in reserve for liability purposes. Once the stasher moves out and there's no damage or missing item reported by the stasher, you will receive the remaining 25% of your payment within 5-7 business days.",
  },
  {
    header: "Hosting with Boxy",
    question: "How much should I expect to get paid?",
    answer:
      "The earnings of our hosts can vary depending on the specific requirements and timeline of the stasher. On average, our hosts earn approximately $50 per month, but this amount can be higher depending on the stasher's needs and your hosting availability.",
  },
  {
    header: "Hosting with Boxy",
    question: "How am I protected as a Boxy Host?",
    answer: "",
  },
  {
    header: "Hosting with Boxy",
    question: "How often is a Boxy Stasher allowed to check-in on their stuff?",
    answer:
      "A boxy stasher is permitted to check in up to three times during their storage period. If they need to access their items or add/remove something, they can do so within these three check-ins. However, please be aware that you reserve the right to decline any additional check-in requests that exceed the limit of three.",
  },
  {
    header: "Moving Help",
    question: "I need transportation to move my stuff, what should I do?",
    answer:
      "You've got options! In the past, some of our stashers have used Uber as a quick and easy way to move a limited number of items. Another option is booking a mover through TaskRabbit, which makes coordinating pick-up and drop-off times super simple - giving you more time to worry about other things! See this information on how to qualify for a TaskRabbit reimbursement.",
  },
  {
    header: "Moving Help",
    question: "How do I qualify for Taskrabbit reimbursement?",
    answer:
      "We have got you covered! If you use Taskrabbit to move your stuff, we will reimburse 10% of your transportation cost. Just submit your reimbursement request here using this easy form. As long as the info is transparent and accurate and you submit it within 30 days, you will see your reimbursement pop up on your account within 5-7 business days. Cha-ching!",
  },
  {
    header: "Cancellations and Refunds",
    question: "Stasher Cancellation",
    answer:
      "It is the responsibility of the stasher, not the host, to cancel a booking by email us at booking@storewithoxy.com once the stasher has removed the stored items from the space. stashers are not eligible for a refund nor a prorated amount if they store for less than the standard rental month. In addition, the following provisions apply to cancellation by a stasher: If a stasher cancels a booking less than 24 hours after approval and/or more than a week before the start date, the stasher is eligible for a 100% refund of the price quote and the $25 deposit fee. \n Boxy may, in its sole discretion, halt or otherwise withhold payouts to hosts to cover a refund to stasher if stasher timely cancels a booking. A refund may apply before a Stasher is matched with a host, once a stasher who has received information and/or has established a form of communication with a host, a refund cannot be issued.  If a stasher communicates to its host that it wants to move out and end its booking but does not cancel its booking on the Boxy site or services, the stasher is not eligible for a refund if its rental month automatically renews. Please see our Terms and Conditions for more details!",
  },
  {
    header: "Cancellations and Refunds",
    question: "Host Cancellation",
    answer:
      "If for some reason a host needs to terminate a booking after the stasher has stored its stored items with no fault of the stasher, the host is required to provide 30 days’ notice to the stasher. \n If an extreme situation requires a host to deny a stasher’s right to possess space with less than 30 days’ notice, the stasher will receive a full refund (minus a $25 deposit fee) of the most recent rental month and the host will not receive the most recent month’s payroll and will be charged a $60 termination fee. Hosts who repeatedly cancel bookings may be subject to additional charges, including removal from the Boxy community and suspension of the use of the site and services. Please see our Terms and Conditions for more details!",
  },
];

export default function FAQ() {
  const [selectedHeader, setSelectedHeader] = useState<string>(headers[0]);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  function handleHeaderClick(header: string) {
    setSelectedHeader(header);
    setSelectedQuestion("");
  }

  function handleQuestionClick(question: string) {
    setSelectedQuestion((prev) => (prev === question ? "" : question));
  }

  const filteredFaqs = faqs.filter((faq) => faq.header === selectedHeader);
  return (
    <div className="flex justify-center py-10 sm:py-16 lg:py-24">
      <div className="flex flex-col row-start-2 w-4/5">
        <div className="pb-5 text-3xl font-Satoshi">
          <h1>Frequently Asked Questions</h1>
        </div>
        <div className="grid grid-cols-4 grid-rows-1 gap-1 justify-center">
          <div className="flex flex-col col-span-1 gap-3">
            {headers.map((header, index) => (
              <button
                key={index}
                className="text-left pt-5 pr-5 pb-5 pl-2 rounded-xl hover:text-[#097275] hover:bg-[#097275] hover:bg-opacity-20 mr-4"
                onClick={() => handleHeaderClick(header)}
              >
                {header}
              </button>
            ))}
          </div>
          <div className="flex flex-col col-span-3">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="mb-3 border-b">
                <button
                  className="flex justify-between items-center text-left font-Karla text-sm bg-transparent pr-5 pt-5 pb-5 w-full"
                  onClick={() => handleQuestionClick(faq.question)}
                >
                  <span>{faq.question}</span>
                  {faq.question === selectedQuestion ? (
                    <RiArrowDropUpLine size={20} />
                  ) : (
                    <RiArrowDropDownLine size={20} />
                  )}
                </button>
                {faq.question === selectedQuestion && (
                  <div className="pt-2 pl-2 text-gray-500 text-sm mb-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
