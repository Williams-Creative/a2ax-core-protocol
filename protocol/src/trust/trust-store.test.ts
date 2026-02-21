import { describe, it, expect } from "vitest";
import { TrustStoreInMemory } from "./trust-store.js";

describe("TrustStoreInMemory", () => {
  it("starts empty", () => {
    const store = new TrustStoreInMemory();
    expect(store.listIssuers()).toHaveLength(0);
    expect(store.isTrusted("any")).toBe(false);
    expect(store.getIssuerPublicKey("any")).toBeUndefined();
  });

  it("adds and removes issuers", () => {
    const store = new TrustStoreInMemory();
    store.addIssuer("iss-1", { format: "jwk", key: { kty: "OKP", crv: "Ed25519", x: "abc" } });
    expect(store.isTrusted("iss-1")).toBe(true);
    expect(store.listIssuers()).toHaveLength(1);
    expect(store.getIssuerPublicKey("iss-1")).toEqual({
      format: "jwk",
      key: { kty: "OKP", crv: "Ed25519", x: "abc" }
    });

    store.removeIssuer("iss-1");
    expect(store.isTrusted("iss-1")).toBe(false);
    expect(store.listIssuers()).toHaveLength(0);
  });
});
