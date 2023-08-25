import { NextApiHandler } from "next";
import axios from "axios";

const handler: NextApiHandler = async (req, res) => {
  const { contractAddress, tokenId } = req.query as {
    contractAddress: string;
    tokenId: string;
  };

  const data = await axios.get("https://api.upshot.xyz/v2/appraisals/assets", {
    params: {
      asset_ids: `${contractAddress}/${tokenId}`,
    },
    headers: {
      "x-api-key": process.env.UPSHOT_API_KEY,
    },
  });

  if (!data?.data?.data?.[0]?.appraisal?.wei) {
    res.status(200).json({ ethPrice: "Not yet appraised" });
    return;
  }

  const ethPrice = Number(
    (data.data.data[0].appraisal.wei / 1e18).toFixed(3)
  ).toString();

  res.status(200).json({ ethPrice });
};

export default handler;
