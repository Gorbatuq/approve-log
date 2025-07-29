import { useState } from "react";

import type { Document } from "../../types/Document";
import { DocumentCard } from "./DocumentCard";

type Props = {
  documents: Document[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  isManager: boolean;
};

export const DocumentList = ({
  documents,
  onApprove,
  onReject,
  isManager,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const sortedDocs = [...(documents ?? [])].sort((a, b) => b.id - a.id);

  const startIndex = (currentPage - 1) * itemPerPage;
  const currentDocuments = sortedDocs.slice(
    startIndex,
    startIndex + itemPerPage
  );

  const totalPages = Math.ceil(sortedDocs.length / itemPerPage);

  return (
    <>
      {/* Document List */}
      <div className="space-y-6">
        {currentDocuments.map((doc: Document) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onApprove={onApprove}
            onReject={onReject}
            isManager={isManager}
          />
        ))}
      </div>

      {/* Pagination block */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};
