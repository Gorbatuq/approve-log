import { useNavigate } from "react-router-dom";
import { useDocuments } from "../../hooks/documents/useDocuments";
import { useProfile } from "../../hooks/auth/useProfile";
import { useLogout } from "../../hooks/auth/useLogout";
import { useApproveDocument } from "../../hooks/documents/useApproveDocument";
import { useRejectDocument } from "../../hooks/documents/useRejectDocument";
import { useCreateDocument } from "../../hooks/documents/useCreateDocument";
import { useDeleteDocument } from "../../hooks/documents/useDocumentMutations";

import { useQueryClient } from "@tanstack/react-query";
import { CreateDocumentForm } from "../../components/documents/CreateDocumentForm";

import type { CreateDocumentInput } from "../../types/Document";

import { DocumentList } from "../../components/documents/DocumentList";
import { StatsWidget } from "../../components/documents/StatsWidget";

export const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useProfile();
  const isManager = profile?.role === "MANAGER";

  const { data: documents, isLoading, isError, error } = useDocuments();
  const create = useCreateDocument();
  const remove = useDeleteDocument();
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
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Documents Approve</h1>

        <div className="flex items-center gap-3 ml-auto">
          <span
            className={`text-sm px-3 py-2 rounded-full font-medium ${
              isManager ? "bg-yellow-600" : "bg-gray-600"
            }`}
          >
            {profile?.role} – {profile?.username}
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
      {isManager && <StatsWidget />}

      {/* Create Form */}
      <CreateDocumentForm onCreate={handleCreate} />

      {/* Create Document List */}
      <DocumentList
        documents={documents}
        onApprove={approve.mutate}
        onReject={reject.mutate}
        onDelete={remove.mutate}
        isManager={isManager}
      />
    </div>
  );
};
