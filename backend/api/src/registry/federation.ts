/**
 * Federation stub.
 * Interface for future cross-registry trust.
 * No implementation yet.
 */

export type RemoteIssuer = {
  issuerId: string;
  publicKey: unknown;
  metadata?: Record<string, unknown>;
};

export interface FederationClient {
  fetchRemoteIssuer(issuerId: string): Promise<RemoteIssuer | null>;
  syncTrust(): Promise<void>;
}

/**
 * Stub implementation. Returns null / no-op.
 * To be implemented when federation is added.
 */
export class FederationStub implements FederationClient {
  async fetchRemoteIssuer(_issuerId: string): Promise<RemoteIssuer | null> {
    return null;
  }

  async syncTrust(): Promise<void> {
    // No-op
  }
}
