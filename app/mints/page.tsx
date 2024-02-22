import Contracts from "./Contracts";

export const revalidate = 60;

export default function Mints() {
  return (
    <div className="px-12 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mints</h1>
      <Contracts />
    </div>
  );
}
