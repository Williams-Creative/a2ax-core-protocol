import { describe, it, expect } from "vitest";
import { validateHandshakePayload } from "./verify.js";

describe("validateHandshakePayload", () => {
  it("returns valid when payload matches expected input", () => {
    const expected = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n1",
      timestamp: 1700000000000
    };
    const actual = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n1",
      ts: 1700000000000
    };
    const result = validateHandshakePayload(expected, actual);
    expect(result.valid).toBe(true);
  });

  it("returns invalid when agent_id mismatches", () => {
    const expected = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n1",
      timestamp: 1700000000000
    };
    const actual = {
      agent_id: "agt_other",
      scope: "read:data",
      nonce: "n1",
      ts: 1700000000000
    };
    const result = validateHandshakePayload(expected, actual);
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.reason).toBe("payload_mismatch");
  });

  it("returns invalid when nonce mismatches", () => {
    const expected = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n1",
      timestamp: 1700000000000
    };
    const actual = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n2",
      ts: 1700000000000
    };
    const result = validateHandshakePayload(expected, actual);
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.reason).toBe("payload_mismatch");
  });

  it("returns invalid when timestamp mismatches", () => {
    const expected = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n1",
      timestamp: 1700000000000
    };
    const actual = {
      agent_id: "agt_abc123",
      scope: "read:data",
      nonce: "n1",
      ts: 1700000000001
    };
    const result = validateHandshakePayload(expected, actual);
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.reason).toBe("payload_mismatch");
  });
});
