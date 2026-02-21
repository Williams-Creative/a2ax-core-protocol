export type RiskTier = "Low" | "Medium" | "High";

export type TrustExplanation = {
  successRate: number;
  failureRate: number;
  disputeRate: number;
  slaRate: number;
  uptimeScore: number;
  identityAgeDays: number;
  orgTierWeight: number;
  trustModelVersion: string;
};
