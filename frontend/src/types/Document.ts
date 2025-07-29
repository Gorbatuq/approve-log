type UserInfo = { id: number; username: string; role?: string };

export type Document = {
  id: number;
  title: string;
  content: string;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  createdBy: UserInfo;
  approvedBy?: UserInfo;
  approvedAt?: string;
  rejectedBy?: UserInfo;
  rejectedAt?: string;
};

export type CreateDocumentInput = {
  title: string;
  content: string;
};
