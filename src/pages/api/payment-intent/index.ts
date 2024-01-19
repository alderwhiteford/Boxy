import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import stripe from "lib/stripe";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    POST: createPaymentIntent,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function createPaymentIntent(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create(JSON.parse(req.body));
    return res.status(200).send(paymentIntent);
  } catch (error: any) {
    return res.status(403).send({ message: error.message });
  }
}
