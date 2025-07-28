export type Document = {
  id: string
  title: string
  content: string
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"
  createdBy: { username: string }
  approvedBy?: { username: string }
  approvedAt?: string
}

export type CreateDocumentInput = {
  title: string;
  content: string;
};
