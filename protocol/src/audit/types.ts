/**
 * Audit log interface (append-only contract).
 * Protocol defines the contract; server implements storage.
 */

export type AuditInput = {
  actorType: "agent" | "org_admin" | "system";
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  requestId: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
};

export interface AuditWriter {
  write(input: AuditInput): Promise<void>;
}
