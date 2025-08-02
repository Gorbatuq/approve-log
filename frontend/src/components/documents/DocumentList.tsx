import { useEffect, useState } from "react";
import type { Document } from "../../types/Document";
import { DocumentCard } from "./DocumentCard";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

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
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"
  >("ALL");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedDocs = [...documents].sort((a, b) => b.id - a.id);

  const filteredDocs = sortedDocs
    .filter((doc) => statusFilter === "ALL" || doc.status === statusFilter)
    .filter((doc) =>
      doc.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocs = filteredDocs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as Props["documents"][number]["status"] | "ALL"
            )
          }
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          <option value="ALL">All</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Document List */}
      <div className="space-y-6">
        {paginatedDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onApprove={onApprove}
            onReject={onReject}
            isManager={isManager}
          />
        ))}

        {paginatedDocs.length === 0 && (
          <p className="text-center text-gray-400">No documents found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          <GrFormPreviousLink />
        </button>

        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          <GrFormNextLink />
        </button>
      </div>
    </div>
  );
};
