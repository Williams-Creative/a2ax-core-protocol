import { describe, it, expect } from "vitest";
import { PolicyEngineSimple } from "./policy-engine.js";

describe("PolicyEngineSimple", () => {
  it("FAIL when assurance level below minimum", () => {
    const engine = new PolicyEngineSimple({ minimumAssuranceLevel: 2 });
    expect(
      engine.evaluate({ issuerMetadata: { issuerId: "i1", assuranceLevel: 1 } })
    ).toBe("FAIL");
    expect(
      engine.evaluate({ issuerMetadata: { issuerId: "i1", assuranceLevel: 2 } })
    ).toBe("PASS");
  });

  it("FAIL when jurisdiction not allowed", () => {
    const engine = new PolicyEngineSimple({ allowedJurisdictions: ["UK", "EU"] });
    expect(
      engine.evaluate({ issuerMetadata: { issuerId: "i1", jurisdiction: "US" } })
    ).toBe("FAIL");
    expect(
      engine.evaluate({ issuerMetadata: { issuerId: "i1", jurisdiction: "UK" } })
    ).toBe("PASS");
  });

  it("CONDITIONAL when revocation check required but not done", () => {
    const engine = new PolicyEngineSimple({ requireRevocationCheck: true });
    expect(
      engine.evaluate({ certificateMetadata: {} })
    ).toBe("CONDITIONAL");
    expect(
      engine.evaluate({ certificateMetadata: { revocation_checked: true } })
    ).toBe("PASS");
  });
});
