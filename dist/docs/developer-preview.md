# MATEx GAS developer preview

Status snapshot: 5 November 2026.

MATEx GAS is the gas and payment layer being developed alongside MateX trading,
research and agent wallets. Its goal is one shared funding account while funded
sponsors pay the native fees on supported networks. Shared-credit native-gas
dispatch is currently disabled on all five test networks.

## Access and publication

The current workspace is private and local. The public project website contains
documentation, the product demo and historical research downloads. Its GitHub
repository contains the website, not the private payment backend.

The keyless MCP developer preview provides 15 tools over stdio. The user's MCP
client supplies the model; the connector itself needs no model-provider API key.
This preview is separate from the prepared connector release. npm and official
MCP Registry publication remain pending. There is no public package installation
command or hosted payment endpoint in this guide.

Developers with workspace access start the local workspace with Node.js 22 or
later, copy its generated MCP configuration from the Agents section into their
own MCP-compatible client, list the actual tools and load the relevant skill.
The command and script arguments are separate client fields. A workspace web
page is not a stdio MCP endpoint.

## Three project-owned agent skills

### Arc tMGAS purchase: `matex-gas-arc-purchase`

- `matex_gas_arc_quote_purchase`
- `matex_gas_arc_request_purchase`
- `matex_gas_arc_get_purchase`

Arc testnet only, chain ID 5042002. The immutable conversion rate is 1 test USDC
to 100 tMGAS. USDC and tMGAS token amounts both use six decimals. The purchase
preview accepts 1 to 10,000,000 raw USDC units, at most 10 test USDC.

Quote the exact buyer and amount, then create one request with a stable request
key. The owner reviews the exact USDC allowance and purchase separately in
MetaMask. The buyer pays native Arc USDC network fees. This is not gasless;
the conversion itself has no 10% sale markup. The quote reserves no inventory.

Keep the original request ID during submitted or uncertain outcomes. A quote,
approval or balance change is not purchase success. Success requires confirmed
state and a verified receipt matching the actual buyer, USDC collection, tMGAS
delivery, allowance transaction and purchase transaction. The MCP never signs,
submits, mints, funds inventory or automatically resends wallet actions.

The internal owner-operated purchase of 1 test USDC for 100 tMGAS is verified:
https://explorer.testnet.arc.io/tx/0x6df97078cb952fcf7768f97470bb45e4264d07632f42b78dec855f9d934239e2

Its recorded final state was 10,000 tMGAS total supply, 9,900 converter inventory,
100 tMGAS delivered to the buyer and zero residual buyer allowances. These are
internal test results, not external users, revenue or a production launch.

### Arc account snapshot: `matex-gas-arc-snapshot`

- `matex_gas_arc_status`
- `matex_gas_arc_request_payment`
- `matex_gas_arc_get_payment`

This is the separate Circle Facilitator Service / x402 checkout adapter. A
snapshot costs 0.011 test USDC: 0.010 service price plus 0.001 markup. The buyer
reviews the payment authorization and the seller separately reviews its proof
in the browser. This purchase does not buy tMGAS. An owner-signed live settlement
proof remains an outstanding milestone.

### Network inspection: `matex-gas-network-inspect`

- `matex_gas_status`
- `matex_gas_networks`
- `matex_gas_setup_checklist`
- `matex_gas_balances`
- `matex_gas_receipt`

Public reads cover Ethereum Sepolia, Base Sepolia, BNB Testnet and Solana Devnet.
Arc has separate tools. These reads do not prepare or execute a payment.
Readiness is not evidence of successful sponsored execution.

The three documented skills cover a subset of the 15 connector tools. The local
registry is a project-owned resource, not an official global skill listing.

## Agent Control Center

The local Control Center implements owner-approved policies for the new managed
Arc-report connector. A policy sets the agent's per-request, daily and weekly
USDC limits, allowed report services, report networks, seller recipients and
expiry. Its owner can pause requests or rotate the private agent connection
key through a fresh wallet review.

Budgets use six-decimal USDC service payments and UTC day/week windows. They
exclude separate native network fees. Open reservations stay counted across
window changes until payment is verified or the backend proves an authorization
cannot spend. A reservation is not a payment. Pausing blocks new authorizations
but cannot reverse a payment already submitted.

These controls apply only to requests made through this registered-agent report
workflow. Existing manual and legacy connectors remain separate. Signing a
policy does not give the agent a wallet signing key or enable unattended spending.
Each report still needs the buyer and seller wallet approvals described below.

## Managed Arc USDC reports

The new local workflow connects useful backtest and reconciliation reports to
exact Arc testnet USDC checkout. Its prices are separate from Base MGAS credits:

| Report | Base price | 10% markup | Exact payment |
| --- | --- | --- | --- |
| Historical backtest | 0.050 test USDC | 0.005 test USDC | 0.055 test USDC |
| Transaction check | 0.010 test USDC | 0.001 test USDC | 0.011 test USDC |

Report preparation freezes the selected inputs and their hash. A registered
agent reserves its permitted budget for that exact report and returns the
original human review link. Its maximum must cover the fixed price and fit the
active owner policy. The report's subject network is separate from the Arc
payment network.

The buyer authorizes the exact USDC collection, then the separate seller reviews
the Circle settlement proof. The backend verifies canonical transaction, token
transfer and authorization evidence before recording payment and running the
frozen report. Delivery returns the result with matching payment and delivery
receipts, including the frozen input and result hashes.

An uncertain payment keeps its original request and budget hold. It is not reset
or automatically resent. If report delivery fails after payment, the charge
remains recorded; the same paid job can retry delivery without another payment.
This workflow does not perform an automatic refund or convert USDC into MGAS.

Canonical payment verification and receipt-bound report delivery are tested with
cryptographic fixtures. A live user-wallet policy activation and paid report
purchase have not yet been demonstrated. These are implementation checks, not
external usage, revenue or an independent audit.

## Separate authenticated managed MCP preview

This connector exposes four tools over local stdio:

- `matex_managed_status`: the registered agent's policy and remaining budgets.
- `matex_managed_catalog`: fixed report prices and available local datasets.
- `matex_managed_request`: one bounded report request and human review link.
- `matex_managed_get`: the original result, payment and delivery evidence.

Developers with workspace access approve an agent policy in the local Control
Center, then reveal or copy the agent connection key only for a trusted MCP
client. The key is shown once; the server stores its hash. The registered agent
identity and private capability belong in the local client environment. Never
put the capability in a model prompt, tool argument, URL or published example.

Discover the actual tool schemas before use, keep one stable key for each exact
report intent and return the original wallet review to the owner. The connector
cannot change policy, approve a payment, sign, submit a wallet transaction or
trade. A connection key does not replace the human buyer and seller approvals.

The four-tool managed connector is separate from the existing 15-tool keyless
preview and its three documented skills. It does not add managed-payment tools
to the optional OpenAI copilot. Public package and official Registry publication
remain pending; no hosted execution endpoint is provided by this website.

## Optional local OpenAI copilot

A separate local chat uses the operator's configured OpenAI connection. It has
two modes with three tools each: Arc purchase quote/request/receipt, and Solana
read-only status/balances/setup checklist. These are six copilot capabilities;
the separate MCP preview still exposes 15 tools. The provider connection and
actual browser-to-model Solana balance/setup flow have been verified.

This chat is separate from the user's Codex conversation and from a model supplied
by their own MCP client. The copilot cannot sign or submit wallet transactions,
mint, change policies or trade. Provider credentials belong in the local setup
form, never chat or the MCP configuration. Wallet signing stays in the wallet.

## Solana status

A MetaMask Solana wallet connection and read-only copilot checks have been
verified. The browser flow returned the selected wallet's balance and missing
mint/sponsor setup steps without preparing or sending a transaction.

To use it, select Solana Devnet in the local copilot and choose the public Solana
address to inspect, then ask for balances or missing setup steps. Solana mode
uses that Solana address, not the Arc EVM buyer, and only exposes its three
read-only tools.

The current local setup
has no configured SPL mint or sponsor. Sponsored execution still requires token
and sponsor configuration, sponsor funding and an actual verified transaction.
Read-only checks and wallet connection do not establish that proof.

## Separate accounting

Arc tMGAS and the canonical Base tMGAS service-credit account are separate. A
token purchase on Arc does not bridge tokens or fund the Base credit ledger.
Arc native USDC uses 18 decimals, while its ERC-20 interface uses six. Both
represent the same underlying balance and must not be added together.

The Base-funded read-only backtest report costs 0.055 MGAS credits (0.050 base
plus 0.005 markup); reconciliation costs 0.011 (0.010 plus 0.001). These services
add zero chain gas. Funding gas is reviewed separately. The operator controls
the treasury tokens and records prepaid credits in a local ledger. Test credits
have no cash value.

The broader gas-sponsorship design, public hosted execution and mainnet use
remain future work. No universal support, bridge, redemption, independent audit,
Circle partnership or grant award is claimed.

Project brief: /project.html
Developer status: /developers.html
Historical research: /trading-data.html
Website source: https://github.com/The11-11/matex-gas-site
