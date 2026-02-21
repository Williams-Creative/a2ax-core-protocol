import { describe, it, expect } from "vitest";
import { evaluateScope } from "./policy.js";

describe("evaluateScope", () => {
  it("allows when scope is granted", () => {
    const manifest = {
      scopes: [{ name: "read:data" }]
    };
    const result = evaluateScope(manifest, { requestedScope: "read:data" });
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("allowed");
  });

  it("denies when scope not granted", () => {
    const manifest = {
      scopes: [{ name: "read:data" }]
    };
    const result = evaluateScope(manifest, { requestedScope: "write:data" });
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("scope_not_granted");
  });

  it("denies when scope is restricted", () => {
    const manifest = {
      scopes: [{ name: "read:data" }],
      restricted_operations: ["read:data"]
    };
    const result = evaluateScope(manifest, { requestedScope: "read:data" });
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("scope_restricted");
  });
});
