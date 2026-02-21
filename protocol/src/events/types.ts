/**
 * Trust event types and event structure.
 */

export type TrustEventType =
  | "handshake_initiated"
  | "handshake_completed"
  | "handshake_failed"
  | "attestation_issued"
  | "attestation_revoked"
  | "capability_granted"
  | "capability_revoked";

export type TrustEvent = {
  id: string;
  type: TrustEventType;
  agent_id: string;
  timestamp: string;
  details?: Record<string, unknown>;
};
