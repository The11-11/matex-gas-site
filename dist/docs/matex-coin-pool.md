# MATEx Coin / USDC — local testnet liquidity lab

Updated 7 November 2026. **Public deployment and live pool receipts are pending.**

MATEx Coin is the proposed native currency/trading asset of the future MateX
chain. MGAS is the gas mechanism: quoting, sponsorship and fee settlement. The
first implementation is a separate ERC-20 test representation on Base Sepolia,
not a deployed native MateX chain. Existing tMGAS/wtMGAS assets retain their own
separate purpose and accounting.

## Implemented local scope

- Test coin: MATEx Coin (Testnet), tMATEX, 18 decimals, zero initial supply and
  owner minting capped at 1,000,000 test coins. Production supply and ticker
  remain undecided.
- Approved initial liquidity: 1,000 tMATEX + 10 canonical Base Sepolia test USDC.
  This plans a 0.01 test-USDC marginal quote before fees and price impact.
  Trading and unsolicited donations can change observed reserves and price.
- A custom test AMM charges 30 bps per exact-input swap, retained in the pool.
  Only the protocol treasury adds/removes liquidity. LP shares are
  nontransferable, with permanently locked minimum-liquidity dust.
- The existing MGAS/Alchemy ERC-20 paymaster quotes smart-wallet approvals,
  liquidity and swaps in separate tMGAS gas credits. The configured gas-service
  markup is 10%; trading principal and the AMM fee are distinct.
- One-time deployments and initial mint require owner-paid test ETH. Wallet
  signatures are completed by the owner, with exact calldata/amounts and gas
  maxima reviewed first.
- The local page supports exact allowances, initial liquidity, small two-way
  swaps, treasury withdrawals and original-request receipt tracking. It uses
  the blue/purple trading palette.

The backend fixes the network, owner/smart treasury and token identities. It
verifies deployment calldata/runtime/getters and a canonical block, builds a
bounded single pool call, caps gas, and verifies the matching operation-segment
pool effects plus separate gas collection. Unknown submission outcomes remain
saved without an automatic resend. User service-credit balances are not trading
capital and are not debited by these pool actions.

## Validation and remaining proof

**71 focused checks passed:** 14 real-EVM contract tests, 19 wallet-controller
tests, 18 pool-service tests, two RPC/HTTP checks and 18 existing server tests.
The exact compiled artifacts were exercised. Solidity 0.8.38, Shanghai,
optimiser 200; zero compiler warnings. These are internal tests, not an audit.

The local UI and fresh Base reads are available. Public coin/pool deployments,
test-USDC funding, seeded liquidity and a complete MGAS-paid live swap still
need owner wallet actions and independently verified receipts. The API faucet
attempt did not supply funds; no paid account upgrade was made.

Testnet tokens have no monetary value. A pool quote is not a dollar peg,
all-supply redemption value, proof of profitable HFT or a production market
price. This is not an audited Uniswap deployment. No mainnet launch, bridge,
exchange listing or guaranteed appreciation is claimed. A future own-chain
deployment and any production treasury economics remain separate work.

Sources:
[Circle USDC contracts](https://developers.circle.com/stablecoins/usdc-contract-addresses),
[Alchemy token gas payments](https://www.alchemy.com/docs/wallets/transactions/pay-gas-with-any-token).
