import type { NextApiRequest, NextApiResponse } from "next";
import persistentUserInstance from "lib/userInstance";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const { key, email } = req.body;

  // need to make this more secure
  if (key === "admin") {
    persistentUserInstance.verify(email);
    return res.status(200).send({ message: "user is verified" });
  }

  return res.status(400).send({ message: "error verifying user" });
}
