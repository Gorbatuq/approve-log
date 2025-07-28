import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../hooks/useDocuments";
import {
  useApproveDocument,
  useRejectDocument,
} from "../hooks/useDocumentMutations";
import { useCreateDocument } from "../hooks/useCreateDocument";
import { useAuthStore } from "../store/useAuthStore";
import { CreateDocumentForm } from "../components/documents/CreateDocumentForm";
import { DocumentCard } from "../components/documents/DocumentCard";
import type { Document } from "../types/Document";
import type { CreateDocumentInput } from "../types/Document";

export const HomePage = () => {
  const navigate = useNavigate();
  const { logout, userRole } = useAuthStore();
  const isManager = userRole === "MANAGER";

  const { data: documents, isLoading, isError, error } = useDocuments();
  const create = useCreateDocument();
  const approve = useApproveDocument();
  const reject = useRejectDocument();

  const handleCreate = useCallback(
    (input: CreateDocumentInput) => {
      create.mutate(input);
    },
    [create]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError || !documents)
    return (
      <p className="text-red-500">
        Access denied. {error instanceof Error ? error.message : ""}
      </p>
    );

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documents</h1>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            isManager ? "bg-yellow-600 text-white" : "bg-gray-600 text-white"
          }`}
        >
          {userRole}
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Create Form */}
      <CreateDocumentForm onCreate={handleCreate} />

      {/* Document List */}
      <div className="space-y-6">
        {documents.map((doc: Document) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onApprove={approve.mutate}
            onReject={reject.mutate}
            isManager={isManager}
          />
        ))}
      </div>
    </div>
  );
};
