import type { NextApiRequest, NextApiResponse } from "next";
import { reservations } from "@prisma/client";
import { ReservationResponse } from "@/models/reservations";
import persistentReservationInstance from "lib/reservationInstance";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reservations | null | Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getReservationDetails,
    PUT: updateReservation,
    DELETE: deleteReservation,
  };

  if (!("id" in req.query)) {
    return res
      .status(400)
      .json({ message: "missing id query in parameter string" });
  }

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getReservationDetails(
  req: NextApiRequest,
  res: NextApiResponse<ReservationResponse | Message>
) {
  try {
    const response = await persistentReservationInstance.getReservation(
      Number(req.url?.split("/").at(-1))
    );
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
}

async function updateReservation(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentReservationInstance.updateReservation(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "updated reservation" });
}

async function deleteReservation(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentReservationInstance.deleteReservation(
      parseInt(req.query.id)
    );
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "deleted reservation" });
}
