export type AuditLog = {
  id: string;
  action: "CREATED" | "APPROVED" | "REJECTED";
  timestamp: string;
  username: string;
};
