/**
 * Protocol identity types.
 * Agent IDs, certificates, key structures.
 */

export type AgentId = string;
export type OrgId = string;

export type CertificatePayload = {
  agent_id: string;
  org_id: string;
  public_jwk: Record<string, unknown>;
  capability_manifest_hash: string;
  status: string;
};

export type AgentRecord = {
  id: string;
  org_id: string;
  status: string;
  display_name: string;
  metadata_json: Record<string, unknown>;
  created_at: string;
};
