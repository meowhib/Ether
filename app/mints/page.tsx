import { columns } from "./columns";
import { DataTable } from "@/app/mints/data-table";
import { MintEvent } from "./columns";

<<<<<<< HEAD
export const dynamic = "force-dynamic";

export default async function Mints() {
=======
export default async function Mints() {
  console.log(process.env.BASE_URL + "/api/mints");
  const request = await fetch(process.env.BASE_URL + "/api/mints", {
    cache: "no-store",
  });

  if (!request.ok) {
    return (
      <div className="mx-auto text-center w-full bg-gray-100 py-8">
        <h1 className="text-lg font-bold">Error fetching mints</h1>
      </div>
    );
  }

  const latestMints: MintEvent[] = await request.json();

  if (!latestMints.length) {
    return (
      <div className="mx-auto text-center w-full bg-gray-100 py-8">
        <h1 className="text-lg font-bold">No mints found</h1>
      </div>
    );
  }

>>>>>>> 886605aa4206c07b5a876da1c71dd248e5e12085
  return (
    <div className="px-12 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mints</h1>
      <DataTable columns={columns} data={latestMints} />
    </div>
  );
}
