import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.send("Hello World!");
};

export default handler;
