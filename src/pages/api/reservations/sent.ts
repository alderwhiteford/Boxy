import type { NextApiRequest, NextApiResponse } from "next";
import { reservations } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import persistentReservationInstance from "lib/reservationInstance";
import { authOptions } from "../auth/[...nextauth]";
import { ViewResponse } from "@/models/reservations";
import Utils from "@/utils";

type Message = {
  message: string;
};

// Change to async
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reservations[] | Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getStasherReservations,
  };

  const session = await getServerSession(req, res, authOptions);

  if (req.method) {
    return supportedRequestMethods[req.method](req, res, session);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getStasherReservations(
  req: NextApiRequest,
  res: NextApiResponse<ViewResponse | Message>,
  session: Session
) {
  if (!session) {
    return res.status(401).send({ message: "user is not authenticated." });
  }

  try {
    // Decode token from request header
    const email = session.user?.email;
    const userID = await Utils.getUserId(email);
    const response = await persistentReservationInstance.getStasherReservations(
      userID
    );
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
}
