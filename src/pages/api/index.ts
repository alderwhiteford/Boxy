import type { NextApiRequest, NextApiResponse } from "next";
import persistentUserInstance from "lib/userInstance";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const session = await getServerSession(req, res, authOptions);
}
