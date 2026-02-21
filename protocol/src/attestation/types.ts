/**
 * Attestation types (placeholder for Phase 2+).
 * Protocol defines structure; implementations provide attestation graphs.
 */

export type AttestationId = string;

export type AttestationGraph = {
  attestations: Array<{
    id: AttestationId;
    type: string;
    issuer: string;
    subject: string;
    payload: Record<string, unknown>;
  }>;
};
