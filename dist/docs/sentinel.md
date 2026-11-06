# Sentinel — MATEx preventive security

Sentinel is MATEx's opt-in security agent, designed to flag potentially risky
Solidity code and onchain contract changes before users approve transactions.
It combines source review, contract observations and exact-transaction analysis
with clear findings and proposed remediation. Users retain control of their
wallets; fixes and protective actions require review.

## Local preview scope — 6 November 2026

- Fixed owned-source catalogue or a bounded Solidity snippet. Pattern leads
  include lines, source hashes, context and proposed validation steps. Source
  checks are local and do not use an AI provider or expose a raw scanner API.
- Pinned Arc testnet tMGAS, converter and expected wrapper observations at a
  block checkpoint. Missing wrapper code means deployment is unverified.
- Opt-in 30-second contract polling while the local security page is open;
  polling pauses when hidden. No deployed continuous background monitor.
- Requested preflight of an exact unsigned legacy Arc transaction: fixed action
  coverage, bounded approvals, runtime/configuration checks and simulation.
  Results bind an intent hash and expire. Unknown, unsupported or unavailable
  requests require review; an allow result is limited to the listed checks.
- A separate five-tool local MCP connector: `sentinel_status`,
  `sentinel_snapshot`, `sentinel_review_source`, `sentinel_preflight` and
  `sentinel_remediation_plan`. Existing payment/research connector counts remain
  unchanged. Sentinel npm and MCP Registry publication are not claimed.

Suggested flow: discover scope → review code and exact request → read findings
and freshness → propose a fix → validate → obtain the owner's applicable
approval → verify the resulting receipt. The first preview only reads,
simulates and proposes; it cannot execute that remediation flow itself.

This is not wallet-wide interception, a formal or independent security audit,
automatic contract patching, guaranteed exploit prevention or mainnet readiness.
The immutable wrapper has no pause or upgrade function. No verified wrapper
deployment, liquidity pool or market trade is implied by this addition.

The private implementation stays outside the public website repository. This
public site describes the feature and does not receive source code, connect a
wallet or perform live checks.

Official guidance:
[Solidity security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html),
[OpenZeppelin access control](https://docs.openzeppelin.com/contracts/5.x/access-control).
