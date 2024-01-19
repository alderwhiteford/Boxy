import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import persistentUserInstance from "lib/userInstance";
import prisma from "lib/db";

type Message = {
  message: string;
};

type UserResponse = {
  name: string;
  address: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {

  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getUserById,
  };

  if (!("id" in req.query)) {
    return res.status(405).send({message: 'no id in query!'})
  }

  if (req.method) {
    return supportedRequestMethods[req.method](req, res, session);
  }
  
  return res.status(405).send({ message: "request method not supported" });

}

  // Retrieve a user with a given id: 
  async function getUserById(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {

    const id: any = req.query['id']

    if (id instanceof Array<String> || id == undefined) {
      return
    }

    try {
      const response = await persistentUserInstance.getUserByID(parseInt(id));
      return res.status(200).send(response)
    }
    catch (error) {
      return res.status(200).send({message: error});
    }
}

