# A2AX-Core Governance

## Purpose

This document defines the governance model for the A2AX-Core Protocol.

A2AX-Core is an **open, neutral trust standard**. Governance exists to:

- Maintain protocol clarity
- Preserve neutrality
- Ensure backward compatibility discipline
- Provide transparent change processes
- Prevent structural centralization of trust authority

> Trust policy remains fully **verifier-controlled**. Governance does not determine who is trusted or what issuers are valid.

---

## Contribution Model

- Contributions are welcome via **Pull Requests**.
- Follow the **code style** and **test requirements** in the repo.
- Breaking changes to the protocol must be clearly documented and require a **semantic version bump** (major release) and open discussion.
- All contributions must preserve **protocol neutrality**, **fork legitimacy**, and **verifier sovereignty**.

---

## Specification Update Rules

Protocol changes that affect:

- Handshake
- Verification
- Identity
- Capability scoping

require:

1. Updating the `protocol/version` constant
2. Updating `VERSION.md` and release notes
3. Verification of **SDK and reference implementation compatibility**

> Neutrality must be preserved. No change may introduce mandatory registries, default trust anchors, or centralized verification.

---

## Version Release Process

1. Update `PROTOCOL_VERSION` in `protocol/src/version/constants.ts`
2. Update `VERSION.md` with the changelog
3. Run full test suite:
   - Protocol isolation
   - Backend reference implementation
   - SDKs (TypeScript, Python)
4. Tag the release (e.g., `v1.1.0`)
5. Document **any compatibility considerations** clearly

> Versioning is **semantic**. Release numbers do not confer trust authority.

---

## Separation Policy (Core vs Extensions)

- **Core (`/protocol`)**:
  - Identity issuance
  - Cryptographic verification
  - Handshake protocol
  - Permissions and capability scoping
  - Attestation and events
  - Audit logging
  - Version management
- **Extensions (`/extensions`)**:
  - Optional interfaces (TrustScoring, Escrow, Compliance)
  - Implementations reside in server or third-party packages
- **Rules**:
  - Protocol **must run independently of extensions**
  - Extensions **depend on protocol**; protocol **does not depend on extensions**
  - Extensions may provide reference implementations, but must not embed centralized trust or enforce policy

---

## Neutrality Commitment

- The protocol is **vendor-neutral** and **forkable**
- No hardcoded A2AX-Core endpoints, commercial hooks, or mandatory services
- All trust evaluation, revocation, and storage mechanisms are **injectable**
- Implementations can use any infrastructure without affecting protocol validity
- No governance decision may restrict independent deployments or forks

---

## Transparency and Process

- All proposals, discussions, and changes are **public**:
  - GitHub Issues
  - Pull Requests
  - Documentation updates
- Changes focus on:
  - Security
  - Neutrality
  - Compatibility
  - Spec clarity
- Reference implementations demonstrate protocol behavior only; they **do not define the standard**.

---

## Security Governance

- Vulnerabilities should be reported according to `SECURITY.md`
- Security fixes may be prioritized over feature development
- Changes to cryptographic primitives require:
  - Security justification
  - Migration guidance
  - Public documentation

---

## Closing Statement

A2AX-Core governance exists to **protect neutrality** and ensure **specification clarity**.  

The protocol defines **trust mechanics**, **not trust authorities**.  

Structural neutrality must remain intact.