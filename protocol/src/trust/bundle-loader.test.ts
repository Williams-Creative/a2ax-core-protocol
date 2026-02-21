import { describe, it, expect } from "vitest";
import { BundleLoaderSimple } from "./bundle-loader.js";
import { TrustStoreInMemory } from "./trust-store.js";

describe("BundleLoaderSimple", () => {
  it("loads bundle issuers into trust store", () => {
    const store = new TrustStoreInMemory();
    const loader = new BundleLoaderSimple();
    loader.loadBundle(
      {
        name: "test",
        version: "1.0",
        issuers: [
          {
            issuerId: "iss-1",
            publicKey: { format: "jwk", key: { kty: "OKP", crv: "Ed25519", x: "abc" } }
          }
        ]
      },
      store
    );
    expect(store.isTrusted("iss-1")).toBe(true);
  });

  it("unloads bundle issuers", () => {
    const store = new TrustStoreInMemory();
    const loader = new BundleLoaderSimple();
    loader.loadBundle(
      {
        name: "test",
        version: "1.0",
        issuers: [{ issuerId: "iss-1", publicKey: { format: "jwk", key: {} } }]
      },
      store
    );
    loader.unloadBundle("test", store);
    expect(store.isTrusted("iss-1")).toBe(false);
  });
});
