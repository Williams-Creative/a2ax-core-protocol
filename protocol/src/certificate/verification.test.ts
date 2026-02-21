import { describe, it, expect } from "vitest";
import { verifyPortableCertificate } from "./verification.js";
import { generateKeyPair, SignJWT, exportJWK } from "jose";

describe("verifyPortableCertificate", () => {
  it("rejects when certificate is expired", async () => {
    const { publicKey, privateKey } = await generateKeyPair("EdDSA", { crv: "Ed25519" });
    const jwk = await exportJWK(publicKey);
    const expired = await new SignJWT({
      agent_id: "agt_test",
      iss: "test-issuer"
    })
      .setProtectedHeader({ alg: "EdDSA", typ: "JWT" })
      .setIssuedAt(Math.floor(Date.now() / 1000) - 86400 * 2)
      .setExpirationTime(Math.floor(Date.now() / 1000) - 86400)
      .sign(privateKey);

    const result = await verifyPortableCertificate({
      certificateJws: expired,
      issuerPublicKey: { format: "jwk", key: jwk as unknown as Record<string, unknown> }
    });

    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.reason).toBe("certificate_expired");
  });

  it("rejects when revocation status is revoked", async () => {
    const { publicKey, privateKey } = await generateKeyPair("EdDSA", { crv: "Ed25519" });
    const jwk = await exportJWK(publicKey);
    const cert = await new SignJWT({
      agent_id: "agt_test",
      iss: "test-issuer"
    })
      .setProtectedHeader({ alg: "EdDSA", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(privateKey);

    const result = await verifyPortableCertificate({
      certificateJws: cert,
      issuerPublicKey: { format: "jwk", key: jwk as unknown as Record<string, unknown> },
      revocationStatus: "revoked"
    });

    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.reason).toBe("certificate_revoked");
  });

  it("accepts valid certificate with trusted issuer", async () => {
    const { publicKey, privateKey } = await generateKeyPair("EdDSA", { crv: "Ed25519" });
    const jwk = await exportJWK(publicKey);
    const cert = await new SignJWT({
      agent_id: "agt_test",
      iss: "test-issuer",
      org_id: "org_1"
    })
      .setProtectedHeader({ alg: "EdDSA", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(privateKey);

    const result = await verifyPortableCertificate({
      certificateJws: cert,
      issuerPublicKey: { format: "jwk", key: jwk as unknown as Record<string, unknown> }
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.payload.agent_id).toBe("agt_test");
      expect(result.payload.iss).toBe("test-issuer");
    }
  });
});
