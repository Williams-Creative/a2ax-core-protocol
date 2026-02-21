import { describe, it, expect } from "vitest";
import { hashJsonBody } from "./signing.js";

describe("hashJsonBody", () => {
  it("returns deterministic SHA256 hex for same input", () => {
    const input = { a: 1, b: "test" };
    const h1 = hashJsonBody(input);
    const h2 = hashJsonBody(input);
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[a-f0-9]{64}$/);
  });

  it("returns different hashes for different inputs", () => {
    const h1 = hashJsonBody({ a: 1 });
    const h2 = hashJsonBody({ a: 2 });
    expect(h1).not.toBe(h2);
  });

  it("handles null/undefined as empty object", () => {
    const hNull = hashJsonBody(null);
    const hUndef = hashJsonBody(undefined);
    expect(hNull).toBe(hUndef);
  });
});
