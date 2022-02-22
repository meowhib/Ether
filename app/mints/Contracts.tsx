"use client";

import { DataTable } from "@/app/mints/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { MintEvent } from "./columns";

export default function Contracts(latestMints: MintEvent[]) {
  const [latestMintsList, setLatestMintsList] =
    useState<MintEvent[]>(latestMints);

  if (!latestMints.length) {
    return (
      <div className="mx-auto text-center w-full bg-gray-100 py-8">
        <h1 className="text-lg font-bold">No mints found</h1>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={latestMints} />
    </div>
  );
}
