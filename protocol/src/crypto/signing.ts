/**
 * Pure cryptographic operations.
 * No storage or config dependencies.
 */

import { createHash } from "node:crypto";
import { importJWK, jwtVerify, type JWK } from "jose";

export function hashJsonBody(input: unknown): string {
  const serialized = JSON.stringify(input ?? {});
  return createHash("sha256").update(serialized).digest("hex");
}

export async function verifyAgentJwt(
  token: string,
  publicJwk: JWK
): Promise<Record<string, unknown>> {
  const key = await importJWK(publicJwk, "EdDSA");
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["EdDSA"]
  });
  return payload as Record<string, unknown>;
}
