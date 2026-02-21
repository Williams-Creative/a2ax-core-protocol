/**
 * Handshake types for A2A verification.
 */

export type HandshakeVerifyInput = {
  agent_id: string;
  scope: string;
  nonce: string;
  timestamp: number;
  amount_cents?: number;
  operation?: string;
};

export type HandshakePayload = {
  agent_id: string;
  scope?: string;
  nonce: string;
  ts: number;
  [key: string]: unknown;
};
