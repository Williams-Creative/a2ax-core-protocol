# Federation Roadmap

## Current State

- Single registry per deployment
- No cross-registry trust
- Federation stub exists: `fetchRemoteIssuer`, `syncTrust` (no implementation)

## Future Direction

1. **Issuer discovery**: Resolve issuer ID to registry URL
2. **Remote issuer fetch**: Retrieve issuer public key from remote registry
3. **Trust sync**: Sync trust anchors across federated registries
4. **Cross-verification**: Verify certificates issued by federated registries

## Stub Interface

```typescript
interface FederationClient {
  fetchRemoteIssuer(issuerId: string): Promise<RemoteIssuer | null>;
  syncTrust(): Promise<void>;
}
```

Implementation deferred until federation design is finalized.
