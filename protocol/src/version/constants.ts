/**
 * Protocol version constant and compatibility rules.
 */

export const PROTOCOL_VERSION = "1.0.0";

export type VersionCheckResult =
  | { compatible: true }
  | { compatible: false; reason: string };

/**
 * Check if client protocol version is compatible.
 * - Same major: compatible
 * - Different major: incompatible
 * - Minor/patch differences: compatible (server may support older minors)
 */
export function checkProtocolVersion(clientVersion: string): VersionCheckResult {
  const [clientMajor] = parseVersion(clientVersion);
  const [serverMajor] = parseVersion(PROTOCOL_VERSION);

  if (clientMajor !== serverMajor) {
    return {
      compatible: false,
      reason: `protocol_version_mismatch: client=${clientVersion} server=${PROTOCOL_VERSION}`
    };
  }

  return { compatible: true };
}

function parseVersion(v: string): [number, number, number] {
  const parts = v.split(".").map((p) => parseInt(p, 10));
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}
