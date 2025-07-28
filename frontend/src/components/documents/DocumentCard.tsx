import { ViewAudit } from "../ViewAudit";
import type { Document } from "../../types/Document";

interface DocumentCardProps {
  doc: Document;
  isManager: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const DocumentCard = ({
  doc,
  isManager,
  onApprove,
  onReject,
}: DocumentCardProps) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-2">{doc.title}</h2>
      <p>
        Status: <span className="font-bold">{doc.status}</span>
      </p>
      <p className="text-sm text-gray-400">
        Created by: {doc.createdBy.username}
      </p>

      {doc.approvedBy && (
        <p className="text-sm text-green-400">
          Approved by: {doc.approvedBy.username} at {doc.approvedAt}
        </p>
      )}

      <ViewAudit documentId={doc.id} />

      {isManager && doc.status === "PENDING" && (
        <div className="mt-4 space-x-2">
          <button
            onClick={() => onApprove(doc.id)}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(doc.id)}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};
