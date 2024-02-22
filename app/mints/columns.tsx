"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Coins,
  Hash,
  MoreHorizontal,
  Timer,
  UserSearch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EthAddressPopup } from "@/components/ui/EthAddressPopup";

export type MintEvent = {
  owner: string;
  liquidity: string;
  blockTimestamp: number;
  transactionHash: string;
};

export const columns: ColumnDef<MintEvent>[] = [
  {
    accessorKey: "blockTimestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // parse int of timestamp and multiply by 1000
      const date = new Date(row.original.blockTimestamp * 1000)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        .replace(/,/g, "");

      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "liquidity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "owner",
    header: "Owner address",
    cell: ({ row }) => {
      const ownerAddress = row.getValue("owner") as string;

      return <EthAddressPopup address={ownerAddress} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mint = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(mint.transactionHash)
              }
            >
              <Hash className="mr-4 size-4" />
              Copy transaction hash
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mint.owner)}
            >
              <UserSearch className="mr-4 size-4" />
              Copy owner address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mint.liquidity)}
            >
              <Coins className="mr-4 size-4" />
              Copy amount
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(mint.blockTimestamp.toString())
              }
            >
              <Timer className="mr-4 size-4" />
              Copy date (timestamp)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
