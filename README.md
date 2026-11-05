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
- Clearly labelled interactive illustration of Arc USDC and MGAS shared-credit payment flows.
- Existing MATEx double-M identity with charcoal, green, cream and warm metallic accents.
- Links to this repository and official Circle documentation.
- No wallet integration, payments, connected accounts, API credentials or data collection on the site.

Current implementations and proposed milestones are distinguished. Arc user-signed settlement, public hosted execution and mainnet readiness are not claimed. The connector’s npm and MCP Registry publication is still pending.

## License boundary

No platform license is granted by this website repository. Website content and MATEx branding remain reserved unless separately licensed. The MIT license selected for the separate `matex-gas-mcp` connector does not apply to this repository or the private platform.

## Hosting

The static directory is `dist/`. `.openai/hosting.json` binds the managed Site identity. The public website and this website-only repository were explicitly authorised by the project owner. No grant application or external message is sent by deployment.
