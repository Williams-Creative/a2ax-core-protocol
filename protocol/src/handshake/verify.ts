/**
 * Pure handshake verification logic.
 * Validates JWT payload against expected input.
 */

import type { HandshakePayload, HandshakeVerifyInput } from "./types.js";

export type VerifyResult =
  | { valid: true }
  | { valid: false; reason: string };

/**
 * Validate that JWT payload matches the expected verify input.
 * Call after verifyAgentJwt succeeds.
 */
export function validateHandshakePayload(
  expected: HandshakeVerifyInput,
  actualPayload: HandshakePayload
): VerifyResult {
  if (actualPayload.agent_id !== expected.agent_id) {
    return { valid: false, reason: "payload_mismatch" };
  }
  if (expected.scope && actualPayload.scope !== expected.scope) {
    return { valid: false, reason: "payload_mismatch" };
  }
  if (actualPayload.nonce !== expected.nonce) {
    return { valid: false, reason: "payload_mismatch" };
  }
  if (actualPayload.ts !== expected.timestamp) {
    return { valid: false, reason: "payload_mismatch" };
  }
  return { valid: true };
}
