import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import ListingsDataTable, { ListingResponse } from "@/models/listings";
import { amenity, listings, spacetype } from "@prisma/client";
import listingDataTable from "lib/listingInstance";
import { Decimal } from "@prisma/client/runtime";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getListingDetails,
    PUT: updateListing,
    DELETE: deleteListing,
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

async function getListingDetails(
  req: NextApiRequest,
  res: NextApiResponse<ListingResponse | Message>,
  session: Session
) {
  let listing;
  try {
    const response = await listingDataTable.getListing(
      Number(req.url?.split("/").at(-1))
    );
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
}

async function updateListing(
  req: NextApiRequest,
  res: NextApiResponse<Message>,
  session: Session
) {
  try {
    await authorize(req, session);
    await listingDataTable.updateListing(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "updated listing" });
}

async function deleteListing(
  req: NextApiRequest,
  res: NextApiResponse<Message>,
  session: Session
) {
  try {
    await authorize(req, session);
    await listingDataTable.deleteListing({
      listing_id: parseInt(req.query.id),
    });
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "deleted listing" });
}

async function authorize(req: NextApiRequest, session: Session) {
  if (!session) {
    console.log("You must be logged in to perform this action.");
    throw new Error("You must be logged in to perform this action.");
  }

  if (!session.user || !session.user.email) {
    console.log("User email not found in session.");
    throw new Error("User email not found in session.");
  }

  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user || !user.verified) {
    console.log("You must be a verified user to perform this action.");
    throw new Error("You must be a verified user to perform this action.");
  }

  const listingId = req.query.id;
  const listing = await prisma.listings.findUnique({
    where: { listing_id: Number(listingId) },
  });

  if (!listing || listing.host_id !== user.user_id) {
    console.log("You do not have permission to perform this action.");
    throw new Error("You do not have permission to perform this action.");
  }
}
