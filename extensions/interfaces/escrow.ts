/**
 * Escrow interface - abstract contract only.
 * No implementation, no gateway integrations.
 */

export interface EscrowInitiateInput {
  partyA: string;
  partyB: string;
  amountCents: number;
  metadata?: Record<string, unknown>;
}

export interface EscrowInitiateResult {
  escrowId: string;
  status: "pending";
}

export interface EscrowReleaseInput {
  escrowId: string;
  releasedTo: "party_a" | "party_b";
}

export interface EscrowDisputeInput {
  escrowId: string;
  reason: string;
}

export interface EscrowInterface {
  initiateEscrow(input: EscrowInitiateInput): Promise<EscrowInitiateResult>;
  releaseEscrow(input: EscrowReleaseInput): Promise<void>;
  disputeEscrow(input: EscrowDisputeInput): Promise<void>;
}
