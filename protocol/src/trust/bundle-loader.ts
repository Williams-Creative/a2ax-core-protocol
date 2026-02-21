/**
 * Trust bundle loader interface.
 * Bundles add issuer keys to trust store.
 * No modification of core protocol logic.
 * Bundles are installable and removable.
 */

import type { TrustStore } from "./trust-store.js";

export type TrustBundle = {
  name: string;
  version: string;
  issuers: Array<{
    issuerId: string;
    publicKey: { format: "jwk"; key: Record<string, unknown> } | { format: "pem"; key: string };
    metadata?: { displayName?: string; jurisdiction?: string; assuranceLevel?: number };
  }>;
};

export interface BundleLoader {
  loadBundle(bundle: TrustBundle, trustStore: TrustStore): void;
  unloadBundle(bundleName: string, trustStore: TrustStore): void;
}

/**
 * Loads bundle issuers into trust store. Unload removes them.
 */
export class BundleLoaderSimple implements BundleLoader {
  private loadedBundles = new Map<string, string[]>();

  loadBundle(bundle: TrustBundle, trustStore: TrustStore): void {
    const issuerIds: string[] = [];
    for (const issuer of bundle.issuers) {
      trustStore.addIssuer(issuer.issuerId, issuer.publicKey, {
        issuerId: issuer.issuerId,
        displayName: issuer.metadata?.displayName,
        jurisdiction: issuer.metadata?.jurisdiction,
        assuranceLevel: issuer.metadata?.assuranceLevel
      });
      issuerIds.push(issuer.issuerId);
    }
    this.loadedBundles.set(bundle.name, issuerIds);
  }

  unloadBundle(bundleName: string, trustStore: TrustStore): void {
    const issuerIds = this.loadedBundles.get(bundleName);
    if (issuerIds) {
      for (const id of issuerIds) {
        trustStore.removeIssuer(id);
      }
      this.loadedBundles.delete(bundleName);
    }
  }
}
