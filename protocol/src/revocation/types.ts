/**
 * Revocation provider interface.
 * Protocol defines the contract; implementation is injectable.
 * Revocation must not depend on Nexus-operated infrastructure.
 */

export interface RevocationProvider {
  isRevoked(agentId: string): Promise<boolean>;
}
