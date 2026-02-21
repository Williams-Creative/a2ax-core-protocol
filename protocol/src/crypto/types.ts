/**
 * Crypto types for protocol.
 */

export type SigningAlgorithm = "EdDSA" | "RS256";

export interface IssuerSigner {
  algorithm: SigningAlgorithm;
  kid: string;
  sign(payload: Record<string, unknown>): Promise<string>;
}
