import { useNavigate } from "react-router-dom";
import { useDocuments } from "../../hooks/documents/useDocuments";
import { useProfile } from "../../hooks/auth/useProfile";
import { useLogout } from "../../hooks/auth/useLogout";
import { useApproveDocument } from "../../hooks/documents/useApproveDocument";
import { useRejectDocument } from "../../hooks/documents/useRejectDocument";
import { useCreateDocument } from "../../hooks/documents/useCreateDocument";

import { useQueryClient } from "@tanstack/react-query";
import { CreateDocumentForm } from "../../components/documents/CreateDocumentForm";
import { DocumentCard } from "../../components/documents/DocumentCard";

import type { Document } from "../../types/Document";
import type { CreateDocumentInput } from "../../types/Document";

export const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useProfile();
  const isManager = profile?.role === "MANAGER";

  const { data: documents, isLoading, isError, error } = useDocuments();
  const create = useCreateDocument();
  const approve = useApproveDocument();
  const reject = useRejectDocument();
  const logout = useLogout();

  const handleCreate = (input: CreateDocumentInput) => {
    create.mutate(input);
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        navigate("/login");
      },
    });
  };

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
            isManager ? "bg-yellow-600" : "bg-gray-600"
          }`}
        >
          {profile?.role}
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
