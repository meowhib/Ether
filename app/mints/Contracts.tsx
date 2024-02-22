"use client";

import { DataTable } from "@/app/mints/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function Contracts() {
  const [latestMints, setLatestMints] = useState([]);
  const [loadingMintsState, setLoadingMintsState] = useState("loading");

  async function fetchLatestMints() {
    setLoadingMintsState("loading");
    const response = await fetch("/api/mints", { cache: "no-store" });

    if (response.status === 200) {
      const latestMints = await response.json();
      setLoadingMintsState("loaded");
      setLatestMints(latestMints);
    } else {
      setLoadingMintsState("error");
    }
  }

  useEffect(() => {
    fetchLatestMints();
  }, []);

  if (loadingMintsState === "loading") {
    return (
      <div className="mx-auto text-center w-full bg-gray-100 py-8 animate-pulse">
        <h1 className="text-lg font-bold">Loading events...</h1>
      </div>
    );
  }

  if (loadingMintsState === "error") {
    return (
      <div className="mx-auto text-center w-full bg-red-100 py-8">
        <h1 className="text-lg font-bold">Error fetching data</h1>
        <p className="text-sm text-gray-500">Check logs for more information</p>
      </div>
    );
  }

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
