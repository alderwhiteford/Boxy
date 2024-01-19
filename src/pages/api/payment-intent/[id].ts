import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  message: string;
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getPaymentIntent,
  };

  if (!("id" in req.query)) {
    return res
      .status(400)
      .json({ message: "missing id query in parameter string" });
  }

  if (req.method) {
    return supportedRequestMethods[req.method](req, res, session);
  }

  return res.status(405).send({ message: "request method not supported" });
}

function getPaymentIntent(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = stripe.paymentIntents.retrieve(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

}
