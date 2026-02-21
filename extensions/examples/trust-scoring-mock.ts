/**
 * Mock TrustScoring implementation for testing/examples only.
 */

import type {
  TrustScoringInterface,
  TrustScoringInput,
  TrustScoringResult,
  RiskTier
} from "../interfaces/trust-scoring.js";

export class MockTrustScoring implements TrustScoringInterface {
  async compute(input: TrustScoringInput): Promise<TrustScoringResult> {
    const attestationCount = input.attestationGraph.attestations?.length ?? 0;
    const score = Math.min(100, 50 + attestationCount * 10);
    const riskTier: RiskTier =
      score >= 75 ? "Low" : score >= 45 ? "Medium" : "High";
    return { score, riskTier };
  }
}
