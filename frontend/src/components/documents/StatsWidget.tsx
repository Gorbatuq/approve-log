import { useStats } from "../../hooks/documents/useStats";

export const StatsWidget = () => {
  const { data, isLoading, isError } = useStats();

  if (isLoading) return <p className="text-white">Loading stats...</p>;
  if (isError || !data)
    return <p className="text-red-500">Error loading stats</p>;

  return (
    <div className="p-4 mb-6 bg-gray-700 rounded-lg text-sm text-white space-y-1">
      <p>Total: {data.total}</p>
      <p>Draft: {data.draft}</p>
      <p>Approved: {data.approved}</p>
      <p>Rejected: {data.rejected}</p>
    </div>
  );
};
