import { NextResponse } from "next/server";

const { ethers } = require("ethers");
const v3PoolArtifact = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

export const dynamic = "force-dynamic";

export async function GET() {
  const provider = new ethers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY
  );

  const poolContract = new ethers.Contract(
    poolAddress,
    v3PoolArtifact.abi,
    provider
  );

  try {
    const mintFilter = poolContract.filters.Mint();
    const blockNumber = await provider.getBlockNumber();

    const mintEvents = await provider.getLogs({
      ...mintFilter,
      fromBlock: blockNumber - 10,
      toBlock: "latest",
    });

    const latestMintsPromises = mintEvents
      .slice(-100)
      .map(async (event: any) => {
        const parsedEvent = await poolContract.interface.parseLog(event);
        if (parsedEvent) {
          const block = await provider.getBlock(event.blockNumber);

          return {
            owner: parsedEvent.args.sender,
            liquidity: parsedEvent.args.liquidity?.toString(),
            blockTimestamp: block.timestamp,
            transactionHash: event.transactionHash.toString(),
          };
        }
      });

    const latestMints: any = await Promise.all(latestMintsPromises)
      .then((mints) => mints.filter((mint: any) => mint !== undefined))
      .catch((error) => {
        console.error("Error fetching mints", error);
        return [];
      });

    return NextResponse.json(latestMints, { status: 200 });
  } catch (error) {
    console.error("Error fetching mints", error);
    return NextResponse.json([], { status: 500 });
  }
}
