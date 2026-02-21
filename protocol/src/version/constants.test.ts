import { describe, it, expect } from "vitest";
import { PROTOCOL_VERSION, checkProtocolVersion } from "./constants.js";

describe("checkProtocolVersion", () => {
  it("returns compatible for same major version", () => {
    const result = checkProtocolVersion(PROTOCOL_VERSION);
    expect(result.compatible).toBe(true);
  });

  it("returns compatible for same major, different minor", () => {
    const [major] = PROTOCOL_VERSION.split(".");
    const result = checkProtocolVersion(`${major}.99.0`);
    expect(result.compatible).toBe(true);
  });

  it("returns incompatible for different major", () => {
    const result = checkProtocolVersion("2.0.0");
    expect(result.compatible).toBe(false);
    expect("reason" in result && result.reason).toContain("protocol_version_mismatch");
  });
});
