import { useAudit } from "../../hooks/documents/useAudit";

export const ViewAudit = ({ documentId }: { documentId: number }) => {
  const { data, isLoading, isError } = useAudit(documentId);

  if (isLoading) return <p className="text-gray-300">Loading audit...</p>;
  if (isError || !data)
    return <p className="text-red-500">Failed to load audit log.</p>;

  return (
    <div className="mt-4 p-4 bg-gray-700 rounded">
      <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
      <div className="space-y-1">
        {data.slice(-3).map((log) => (
          <div key={log.id} className="text-sm">
            <span className="text-gray-400">
              {new Date(log.timestamp).toLocaleString()}
            </span>{" "}
            -<span className="ml-2 font-bold">{log.action}</span> by
            <span className="ml-1 text-blue-300">{log.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
