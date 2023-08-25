import { useState } from "react";

const HomePage = () => {
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
        />
        <button className="rounded-r-md border border-black py-3 px-5">
          Load NFTs
        </button>
      </div>

      <div className="w-full mt-10">
        <div></div>
      </div>

      <div>
        <p>Loading ...</p>
      </div>
    </div>
  );
};

const NFTCard = ({
  collectionName,
  nftId,
}: {
  collectionName: string;
  nftId: string;
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="border border-black rounded-md w-full flex bg-clip-border mb-10">
      <div className="py-2 px-3">
        <h2 className="text-lg font-semibold">{collectionName}</h2>
        <h2>{nftId}</h2>
        <button className="mt-3 border border-black rounded-md px-2 py-1">
          Appraise Value
        </button>
      </div>
    </div>
  );
};

export default HomePage;
