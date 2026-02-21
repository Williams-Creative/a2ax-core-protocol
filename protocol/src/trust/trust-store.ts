/**
 * Trust store interface.
 * Holds issuer public keys. No embedded defaults.
 * Verification fails if no issuer is trusted.
 */

import type { IssuerPublicKey } from "../certificate/types.js";

export type IssuerMetadata = {
  issuerId: string;
  displayName?: string;
  jurisdiction?: string;
  assuranceLevel?: number;
};

export interface TrustStore {
  addIssuer(issuerId: string, publicKey: IssuerPublicKey, metadata?: IssuerMetadata): void;
  removeIssuer(issuerId: string): void;
  listIssuers(): Array<{ issuerId: string; metadata?: IssuerMetadata }>;
  isTrusted(issuerId: string): boolean;
  getIssuerPublicKey(issuerId: string): IssuerPublicKey | undefined;
}

/**
 * In-memory trust store. Ships with EMPTY state.
 * No default issuers. Caller must add issuers explicitly.
 */
export class TrustStoreInMemory implements TrustStore {
  private issuers = new Map<
    string,
    { publicKey: IssuerPublicKey; metadata?: IssuerMetadata }
  >();

  addIssuer(issuerId: string, publicKey: IssuerPublicKey, metadata?: IssuerMetadata): void {
    this.issuers.set(issuerId, { publicKey, metadata });
  }

  removeIssuer(issuerId: string): void {
    this.issuers.delete(issuerId);
  }

  listIssuers(): Array<{ issuerId: string; metadata?: IssuerMetadata }> {
    return Array.from(this.issuers.entries()).map(([issuerId, { metadata }]) => ({
      issuerId,
      metadata
    }));
  }

  isTrusted(issuerId: string): boolean {
    return this.issuers.has(issuerId);
  }

  getIssuerPublicKey(issuerId: string): IssuerPublicKey | undefined {
    return this.issuers.get(issuerId)?.publicKey;
  }
}
