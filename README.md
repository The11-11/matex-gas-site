# MATEx GAS project site

Public showcase for MateX trading, AI agent wallets and the MATEx GAS single-token gas vision, with a Circle Developer Grants preparation brief. This repository contains the **website only**. The private MateX workspace, credentials, wallet journals, payment backend and trading implementation are excluded.

## Preview

Requires Node.js 22 or later. No dependencies or build step.

```sh
node preview.mjs
```

Open the printed loopback URL. Source is in `dist/`. Run `node check.mjs` to verify local links, required disclosures and JavaScript syntax.

## Scope

- Responsive project landing page and printable project brief.
- Developer feature status, three local agent skills, the 15-tool MCP preview and downloadable developer notes.
- Registered-agent policy budgets and Arc USDC paid reports through a separate four-tool local connector, with live wallet proof clearly marked pending.
- A documented US/USD Funding hub: installed local Circle Onramp Kit 1.0.8 sandbox integration, a separate external Arc Portal handoff and explicit off-ramp limits. Live provider-session and deposit proof remain pending.
- Narrated 100-second product demo with English captions, a public transcript link and the verified internal Arc testnet conversion receipt.
- Clearly labelled interactive illustration of Arc USDC and MGAS shared-credit payment flows.
- Existing MATEx double-M identity with charcoal, green, cream and warm metallic accents.
- Links to this repository and official Circle documentation.
- Verified Solana Devnet RPC readiness before operator setup, with separate wallet and sponsor status.
- No wallet integration, payments, connected accounts, API credentials or data collection on the site.

Current implementations and proposed milestones are distinguished. Arc user-signed settlement, public hosted execution and mainnet readiness are not claimed. The connector’s npm and MCP Registry publication is still pending.

As features change, update `dist/developers.html`, `dist/docs/developer-preview.md`
and the home/project status summaries after verification. Keep completed public
reads, wallet setup and transaction execution as separate status observations.
Private operator settings and machine-specific connection details stay outside
this website repository.

## US/USD funding scope

The local Funding hub separates the embedded Circle onramp sandbox from the
official Arc Portal's external real-money flow. The sandbox integration uses a
separate server-only sandbox credential, an EIP-191 wallet-ownership proof and
USDC/Arc asset filters. It is installed locally; a live provider session and
verified deposit have not yet been demonstrated. The existing MATEx payment
workflows remain testnet previews.

Sandbox accepts dummy details only and moves no real funds. Its bank-transfer
test currently delivers test tokens only on Ethereum. Providers independently
determine eligible US states, payment methods, identity checks and business
onboarding. Provider fees are separate from MATEx service markup.

Direct Arc cash-out is unverified. A separately owner-reviewed CCTP route from
Arc USDC to Base USDC and an eligible Coinbase USD checkout is planned, not
implemented. There is no enabled bridge, cash-out or MGAS redemption flow.
See `/developers.html#usd-funding` and `dist/docs/developer-preview.md` for the
official integration sources and validation boundaries.

## License boundary

No platform license is granted by this website repository. Website content and MATEx branding remain reserved unless separately licensed. The MIT license selected for the separate `matex-gas-mcp` connector does not apply to this repository or the private platform.

## Hosting

The static directory is `dist/`. `.openai/hosting.json` binds the managed Site identity. The public website and this website-only repository were explicitly authorised by the project owner. No grant application or external message is sent by deployment.
