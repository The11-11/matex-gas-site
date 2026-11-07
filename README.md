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
- MATEx Coin/USDC local liquidity-lab status, separate from the MGAS gas mechanism: 71 focused internal checks, approved test seed, owner-paid setup and pending public execution. See `dist/docs/matex-coin-pool.md`.
- Sentinel preventive security description and icon: local owned-source review, pinned Arc observations and requested transaction preflight through a separate five-tool MCP preview. Opt-in page-open polling; no deployed background monitor, wallet-wide interception or automatic remediation. See `dist/docs/sentinel.md`.
- Developer feature status, three local agent skills, the 15-tool MCP preview and downloadable developer notes.
- Registered-agent policy budgets and Arc USDC paid reports through a separate four-tool local connector, with live wallet proof clearly marked pending.
- A documented US/USD Funding hub: installed local Circle Onramp Kit 1.0.8 sandbox integration, a separate external Arc Portal handoff and explicit off-ramp limits. Live provider-session and deposit proof remain pending.
- Narrated 100-second product demo with English captions, a public transcript link and the verified internal Arc testnet conversion receipt.
- Clearly labelled interactive illustration of Arc USDC and MGAS shared-credit payment flows.
- Existing MATEx double-M identity with charcoal, green, cream and warm metallic accents.
- Links to this repository and official Circle documentation.
- Verified Solana Devnet RPC readiness before operator setup, with separate wallet and sponsor status.
- Market-aware BTC/ETH/SOL trading research with explicit capital and slippage, plus checked paper-trading candle recovery.
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

## Wrapped MGAS preparation — November 6, 2026

The private local workspace now contains an Arc testnet wtMGAS wrapper and
wallet-review page. One deposited tMGAS backs one wtMGAS, both with six decimals
and zero initial wrapped supply. Standard transfers move the holder's right to
burn wtMGAS for the same amount of underlying tMGAS. The underlying token is
pinned to `0x28d0369964820248fc3f34c708d6d1d7288dbbbb` on chain 5042002.

There is no wrapper administrator mint, upgrade or recovery withdrawal; the
underlying tMGAS retains owner-controlled minting. Exact allowance, wrap and
unwrap actions require separate human wallet review and native Arc test-USDC
gas. Arc assets remain separate from Base-funded service credits.

The wallet page now offers explicit EIP-6963 MetaMask selection, a visibly
unverified legacy fallback and read-only provider diagnostics for account access,
network, block, nonce and native balance. It records safe request stages and
error categories. User inputs are captured before the busy render can change
their displayed values.

Eight isolated EVM tests, twenty-nine controller tests and eighteen wallet tests
passed internally (**55 focused checks**). Bounded same-nonce recovery retains
up to three candidate plans. At that limit, the owner can review and reopen the
exact saved candidate without changing its nonce, gas, gas price or maximum
fee. No financial request starts automatically. A canonical matching receipt
resolves that one deployment. Internal review identifiers are not transaction
hashes. These checks are not an independent audit or proof of a live MetaMask
prompt. **Live deployment verification is pending.** No
verified deployment, wtMGAS pool, market-trade proof, mainnet release, USDC peg or
cash-redemption promise is claimed. No new MCP wrapping tools are claimed. Public status is documented at
`/developers.html#wrapped-mgas` and in the downloadable developer notes; private
implementation code is excluded from this website repository.

## License boundary

No platform license is granted by this website repository. Website content and MATEx branding remain reserved unless separately licensed. The MIT license selected for the separate `matex-gas-mcp` connector does not apply to this repository or the private platform.

## Hosting

The static directory is `dist/`. `.openai/hosting.json` binds the managed Site identity. The public website and this website-only repository were explicitly authorised by the project owner. No grant application or external message is sent by deployment.

## Leveraged ETH/SOL research — November 5, 2026

The public trading-data page now links the complete $20 perpetuals study: ten fixed hypotheses, notional fees, hourly funding, minimum orders and conservative isolated liquidation. Neither asset passed the development-and-validation screen. The 156-row comparison CSV and full selected-case evidence ZIP preserve failures, cost stress and mixed-venue data limitations. Private platform source is excluded.

## Perpetual research round two

Ten additional fixed strategies, including VWAP and multi-day momentum, bring the local catalogue to twenty. The Python research MCP remains eleven tools. Overnight funding reserves and uninterrupted $20 accounts complement fresh-window comparisons. All 240 comparison rows, fixed rules and failed cases are public at `/trading-data.html#perps-round2`. No strategy was profitable in all five reused periods under baseline or stress. Original study files are retained. Private platform source and wallet capabilities are excluded.

## Focused native SOLUSDC momentum

Eight cases add a native USDC quote/margin/settlement source to the local lab (28 strategy IDs; eleven research MCP tools). Actual funding dates, tick and minimum orders stay separate from legacy proxies. The funding-filter baseline continuous account has five positive marked period changes, but fresh-start consistency and higher-cost stress fail; it is not a qualified live strategy. All 96 rows, hashes, native market inputs and review exports are public at `/trading-data.html#sol-usdc-momentum`. USDC denomination does not claim a new Circle API integration or partnership.
