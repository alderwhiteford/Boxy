import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import persistentUserInstance from "lib/userInstance";
import Utils from "@/utils";

type Message = {
  message: string;
  token?: string;
};

// POST - login
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  if (req.method === "POST") {
    const { body } = req;
    const TOKEN_LIFETIME = 20 * 60; // 20 minutes
    const payload = {
      sub: body["username"],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_LIFETIME,
    } as JwtPayload;

    const token = Utils.encodeValue(payload);

    try {
      await persistentUserInstance.login(body["username"], body["password"]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(403).send({ message: error.message });
      }
    }

    return res.status(200).send({ message: "logged in", token: token });
  }

  return res.status(405).send({ message: "Only POST request allowed" });
}
