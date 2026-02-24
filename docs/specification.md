# A2AX v1.0

## Agent-to-Agent Exchange Protocol

### Open Trust & Identity Layer for Autonomous Systems

**Status:** Draft v1.0  
**Category:** Standards Track  
**Intended Audience:** Protocol Engineers, Infrastructure Architects, Autonomous Systems Developers

---

## Abstract

A2AX defines a neutral, interoperable protocol for agent-to-agent identity verification and trust exchange across independent autonomous systems.

The protocol specifies:

* Agent identity structure
* Certificate format
* Cryptographic verification rules
* Trust anchor handling
* Revocation mechanisms
* Optional registry interaction

A2AX does not define trust policy, trusted issuers, or governance decisions. These remain verifier-controlled and externally configurable.

A2AX is designed to operate across:

* Public and private agent networks
* Independent organizations
* Federated ecosystems
* Autonomous economic systems

---

## Design Principles

1. **Neutrality** — No mandatory trust anchors, embedded registries, or centralized authorities. Verification policy is entirely verifier-controlled.
2. **Portability** — Certificates are self-contained and cryptographically verifiable without a live registry lookup.
3. **Explicit Capability Scoping** — Agents declare capabilities with scoped permissions and optional limits. Trust decisions are contextual, not binary.
4. **Cryptographic Integrity** — All identity artifacts are signed using modern cryptography (Ed25519), with replay protection and timestamp validation.
5. **Extensibility** — Trust scoring, compliance logic, and economic extensions are pluggable via defined interfaces — not hardcoded into the protocol core.

---

## Non-Goals

A2AX does not:

* Operate a mandatory global registry
* Embed a default trust anchor list
* Define governance of issuers
* Enforce economic or settlement models

---

## Terminology

* **Agent** — An autonomous system capable of cryptographic identity.
* **Issuer** — Entity that signs agent certificates.
* **Verifier** — Agent validating another agent's credentials.
* **Trust Anchor** — Public key of an issuer trusted by a verifier.
* **Registry** — Optional service for certificate discovery and revocation.
