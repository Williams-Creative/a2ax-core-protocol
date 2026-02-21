/**
 * Portable certificate verification.
 * Works WITHOUT contacting the registry.
 * Uses issuer public key from trust store.
 */

import { importJWK, importSPKI, jwtVerify, type JWK } from "jose";
import type { IssuerPublicKey, PortableVerificationInput, PortableVerificationResult } from "./types.js";

export async function verifyPortableCertificate(
  input: PortableVerificationInput
): Promise<PortableVerificationResult> {
  const { certificateJws, issuerPublicKey, revocationStatus, requireRevocationCheck } = input;

  if (requireRevocationCheck && revocationStatus === undefined) {
    return { valid: false, reason: "revocation_check_required" };
  }

  if (revocationStatus === "revoked") {
    return { valid: false, reason: "certificate_revoked" };
  }

  let key: Awaited<ReturnType<typeof importJWK>>;
  try {
    if (issuerPublicKey.format === "jwk") {
      key = await importJWK(issuerPublicKey.key as unknown as JWK, "EdDSA");
    } else {
      key = await importSPKI(issuerPublicKey.key, "EdDSA");
    }
  } catch (err) {
    return { valid: false, reason: "invalid_issuer_key" };
  }

  try {
    const { payload } = await jwtVerify(certificateJws, key, {
      algorithms: ["EdDSA"]
    });

    const exp = payload.exp;
    if (typeof exp === "number" && exp < Math.floor(Date.now() / 1000)) {
      return { valid: false, reason: "certificate_expired" };
    }

    return { valid: true, payload: payload as Record<string, unknown> };
  } catch (err) {
    const e = err as { code?: string; message?: string };
    if (e?.code === "ERR_JWT_EXPIRED") {
      return { valid: false, reason: "certificate_expired" };
    }
    const msg = e?.message ?? String(err);
    if (msg.includes("expired") || msg.includes("ExpirationTime")) {
      return { valid: false, reason: "certificate_expired" };
    }
    if (msg.includes("signature") || msg.includes("invalid")) {
      return { valid: false, reason: "signature_invalid" };
    }
    return { valid: false, reason: "verification_failed" };
  }
}
