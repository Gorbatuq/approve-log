import { ViewAudit } from "./ViewAudit";
import type { Document } from "../../types/Document";

interface DocumentCardProps {
  doc: Document;
  isManager: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
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

      {doc.status === "REJECTED" && doc.rejectedAt && (
        <p className="text-sm text-red-400">
          Rejected by: {doc.rejectedBy?.username} at{" "}
          {new Date(doc.rejectedAt).toLocaleString()}
        </p>
      )}

      {doc.status === "APPROVED" && doc.approvedAt && (
        <p className="text-sm text-green-400">
          Approved by: {doc.approvedBy?.username} at{" "}
          {new Date(doc.approvedAt).toLocaleString()}
        </p>
      )}

      <ViewAudit documentId={doc.id} />

      {isManager && (
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
