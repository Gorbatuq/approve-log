export type AuditLog = {
  id: string;
  action: "CREATED" | "APPROVED" | "REJECTED";
  timestamp: string;
  user: {
    username: string;
  };
};
