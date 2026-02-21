/**
 * TrustScoring interface - abstract contract only.
 * No implementation, no Nexus-specific references.
 */

import type { AttestationGraph } from "@nexus/protocol";

export type RiskTier = "Low" | "Medium" | "High";

export interface TrustScoringInput {
  agentId: string;
  attestationGraph: AttestationGraph;
}

export interface TrustScoringResult {
  score: number;
  riskTier: RiskTier;
}

export interface TrustScoringInterface {
  compute(input: TrustScoringInput): Promise<TrustScoringResult>;
}
