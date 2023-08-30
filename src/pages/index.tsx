import axios from "axios";
import { useState } from "react";

const HomePage = () => {
  const [nfts, setNfts] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const loadNFTs = async () => {
    setLoading(true);

    const nfts = (
      await axios.get(
        `https://deep-index.moralis.io/api/v2/${walletAddress}/nft`,
        {
          params: {
            chain: "eth",
            format: "decimal",
            media_items: false,
          },
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        }
      )
    ).data.result;

    setNfts(nfts);

    setLoading(false);
  };

  return (
    <div className="flex flex-col py-10 items-center max-w-md mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold mb-2">NFT Value Appraiser</h2>
        <p>
          Enter the wallet address of the NFT owner to Appraise the value of
          their NFTs
        </p>
      </div>

      <div className="w-full mb-5 flex">
        <input
          type="text"
          placeholder="Wallet Address"
          className="border border-r-0 rounded-l-md border-black pl-3 py-3 pr-1 flex-grow focus:outline-none"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button
          className="rounded-r-md border border-black py-3 px-5"
          onClick={loadNFTs}
        >
          Load NFTs
        </button>
      </div>

      {loading ? (
        <div>
          <p>Loading ...</p>
        </div>
      ) : (
        <div className="w-full mt-10">
          {nfts.map((nft: any) => (
            <NFTCard
              key={nft.name + nft.token_id}
              collectionName={nft.name}
              nftId={nft.token_id}
              contractAddress={nft.token_address}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NFTCard = ({
  collectionName,
  nftId,
  contractAddress,
}: {
  collectionName: string;
  nftId: string;
  contractAddress: string;
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const appraiseValue = async () => {
    const ethValue = (
      await axios.get("/api/get-nft-value", {
        params: {
          contractAddress,
          tokenId: nftId,
        },
      })
    ).data.ethPrice;

    setValue(ethValue);
    setError(ethValue === "Not yet appraised");
  };

  return (
    <div className="border border-black rounded-md w-full flex bg-clip-border mb-8">
      <div className="py-2 px-3">
        <h2
          className="text-lg font-semibold cursor-pointer"
          onClick={() => {
            window.open(
              "https://opensea.io/assets/" + contractAddress + "/" + nftId,
              "_blank"
            );
          }}
        >
          {collectionName}
        </h2>
        <h2>{nftId.slice(0, 10)}</h2>
        {value ? (
          <h2>
            Appraised Value by Upshot: {value}
            {!error && "Ξ"}
          </h2>
        ) : (
          <button
            className="mt-3 border border-black rounded-md px-2 py-1"
            onClick={appraiseValue}
          >
            Appraise Value
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
