/**
 * Policy engine interface.
 * Evaluates issuer and certificate metadata against verifier policy.
 * No embedded defaults; policy is external.
 */

export type PolicyConfig = {
  minimumAssuranceLevel?: number;
  allowedJurisdictions?: string[];
  requireRevocationCheck?: boolean;
};

export type PolicyEvaluationInput = {
  issuerMetadata?: {
    issuerId: string;
    jurisdiction?: string;
    assuranceLevel?: number;
  };
  certificateMetadata?: Record<string, unknown>;
};

export type PolicyResult = "PASS" | "FAIL" | "CONDITIONAL";

export interface PolicyEngine {
  evaluate(input: PolicyEvaluationInput): PolicyResult;
}

/**
 * Simple policy engine. Policy must be provided; no defaults.
 */
export class PolicyEngineSimple implements PolicyEngine {
  constructor(private policy: PolicyConfig) {}

  evaluate(input: PolicyEvaluationInput): PolicyResult {
    const { issuerMetadata, certificateMetadata } = input;

    if (this.policy.minimumAssuranceLevel !== undefined) {
      const level = issuerMetadata?.assuranceLevel ?? 0;
      if (level < this.policy.minimumAssuranceLevel) {
        return "FAIL";
      }
    }

    if (
      this.policy.allowedJurisdictions !== undefined &&
      this.policy.allowedJurisdictions.length > 0
    ) {
      const jurisdiction = issuerMetadata?.jurisdiction;
      if (!jurisdiction || !this.policy.allowedJurisdictions.includes(jurisdiction)) {
        return "FAIL";
      }
    }

    if (this.policy.requireRevocationCheck && certificateMetadata?.revocation_checked !== true) {
      return "CONDITIONAL";
    }

    return "PASS";
  }
}
