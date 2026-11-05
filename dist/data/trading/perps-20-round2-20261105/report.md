# MATEx $20 ETH/SOL perpetuals: bounded round two

Ten new fixed strategies at 5x with fees, funding, slippage and isolated liquidation. ALL dates are reused adaptive research; no future-profit claim.

Plan frozen: 2026-11-05T21:00:58.269602+00:00. Each fresh-window run starts with $20. Continuous runs start with $20 once and never reset at a period boundary.

Base: 0.045% taker fee per fill, 2bps slippage. Stress: 8bps slippage and adverse 0.01% funding each hour. Multi-day holds allowed; full planned holding-time funding reserve. Same 5% planned risk, 75% margin allocation, $150 notional cap and $10 entry minimum.

## All fresh-account baseline results

Each cell is net P&L after all modeled costs. Every window begins afresh with $20.

| Asset | Candidate | Development | Validation | Reused test | Reused recent | Reused 15 days | All positive | Sample sufficient |
|---|---|---:|---:|---:|---:|---:|---|---|
| ETH | r2_vwap_trend | $-15.0517 | $-14.2652 | $-15.0260 | $-0.8588 | $-5.4244 | False | False |
| ETH | r2_vwap_fade | $-11.7288 | $-6.2849 | $-9.9504 | $+2.0481 | $-0.5837 | False | False |
| ETH | r2_rsi2_exhaustion | $-7.0340 | $-2.9369 | $+0.1708 | $-1.4329 | $+0.0000 | False | False |
| ETH | r2_shock_reversal | $-0.2363 | $-2.7220 | $+8.4613 | $+0.5753 | $-0.9696 | False | False |
| ETH | r2_compression_breakout | $-1.6400 | $+2.4255 | $-4.7041 | $+1.7685 | $-0.5488 | False | False |
| ETH | r2_slow_ema_cross | $+14.4717 | $-2.6288 | $-6.0012 | $+1.8385 | $+0.0000 | False | False |
| ETH | r2_daily_momentum | $+0.4656 | $-2.2407 | $+1.5428 | $-0.5787 | $+0.8700 | False | False |
| ETH | r2_breakout_retest | $-6.9031 | $+2.0661 | $-2.3198 | $+0.0000 | $+0.0000 | False | False |
| ETH | r2_overnight_rejection | $-15.0205 | $-10.8360 | $-10.5259 | $+0.1997 | $-0.0356 | False | False |
| ETH | r2_regime_router | $-15.1196 | $-12.4737 | $-14.5641 | $-0.3201 | $-3.4174 | False | False |
| SOL | r2_vwap_trend | $-15.1877 | $-15.0347 | $-15.0064 | $-7.2619 | $-1.5043 | False | False |
| SOL | r2_vwap_fade | $-15.2192 | $-11.1737 | $-8.1861 | $-0.0741 | $+0.8399 | False | False |
| SOL | r2_rsi2_exhaustion | $-3.4402 | $-2.8019 | $-3.7108 | $+2.3841 | $+0.4094 | False | False |
| SOL | r2_shock_reversal | $-2.0600 | $-2.3667 | $+5.1680 | $+0.0000 | $+0.0000 | False | False |
| SOL | r2_compression_breakout | $+4.2659 | $+4.7514 | $-6.9152 | $+1.7478 | $-1.2790 | False | False |
| SOL | r2_slow_ema_cross | $+7.2095 | $+4.1374 | $-0.3071 | $-0.9029 | $+0.0000 | False | False |
| SOL | r2_daily_momentum | $-0.9000 | $+2.2747 | $+1.4352 | $-1.2036 | $+1.0453 | False | False |
| SOL | r2_breakout_retest | $-9.3692 | $-2.3464 | $+7.2670 | $+0.0462 | $+1.3770 | False | False |
| SOL | r2_overnight_rejection | $-15.0670 | $-12.0498 | $-12.0502 | $+0.6282 | $-0.9373 | False | False |
| SOL | r2_regime_router | $-13.7891 | $-13.7525 | $-13.0795 | $-7.0305 | $-2.2687 | False | False |
## All fresh-account stress results

Each cell is net P&L after all modeled costs. Every window begins afresh with $20.

| Asset | Candidate | Development | Validation | Reused test | Reused recent | Reused 15 days | All positive | Sample sufficient |
|---|---|---:|---:|---:|---:|---:|---|---|
| ETH | r2_vwap_trend | $-15.0635 | $-15.0796 | $-15.1268 | $-4.0079 | $-7.1596 | False | False |
| ETH | r2_vwap_fade | $-15.1437 | $-8.1265 | $-11.9582 | $+1.1233 | $-1.0567 | False | False |
| ETH | r2_rsi2_exhaustion | $-7.3483 | $-3.3677 | $-1.0287 | $-1.4923 | $+0.0000 | False | False |
| ETH | r2_shock_reversal | $-2.1422 | $-3.1580 | $+4.8894 | $+0.4520 | $-0.8846 | False | False |
| ETH | r2_compression_breakout | $-6.9479 | $+0.1150 | $-7.0081 | $+1.2024 | $-0.6566 | False | False |
| ETH | r2_slow_ema_cross | $+1.9147 | $-3.6451 | $-6.6576 | $+0.7749 | $+0.0000 | False | False |
| ETH | r2_daily_momentum | $-0.0487 | $-0.4588 | $-2.2883 | $-0.8904 | $+0.4630 | False | False |
| ETH | r2_breakout_retest | $-7.6584 | $+0.4173 | $-3.4266 | $+0.0000 | $+0.0000 | False | False |
| ETH | r2_overnight_rejection | $-15.0247 | $-13.5238 | $-14.2253 | $-0.3951 | $-0.7324 | False | False |
| ETH | r2_regime_router | $-15.0082 | $-15.0018 | $-15.0917 | $-2.5462 | $-4.8620 | False | False |
| SOL | r2_vwap_trend | $-15.0785 | $-15.0037 | $-15.0844 | $-9.1135 | $-3.8803 | False | False |
| SOL | r2_vwap_fade | $-15.0766 | $-12.1195 | $-12.1423 | $-1.0659 | $+0.5727 | False | False |
| SOL | r2_rsi2_exhaustion | $-3.6290 | $-2.7369 | $-4.0488 | $+1.7297 | $+0.2915 | False | False |
| SOL | r2_shock_reversal | $-2.4348 | $-2.5639 | $+3.5739 | $+0.0000 | $+0.0000 | False | False |
| SOL | r2_compression_breakout | $+0.1872 | $+1.7419 | $-7.7231 | $+1.2936 | $-1.2686 | False | False |
| SOL | r2_slow_ema_cross | $-0.7736 | $+1.9937 | $-3.6344 | $-0.7882 | $+0.0000 | False | False |
| SOL | r2_daily_momentum | $+1.4574 | $+0.0000 | $+0.3097 | $-0.8170 | $+0.6044 | False | False |
| SOL | r2_breakout_retest | $-9.1709 | $-3.3451 | $+2.1115 | $-0.1337 | $+0.6204 | False | False |
| SOL | r2_overnight_rejection | $-15.0352 | $-14.3430 | $-15.0170 | $-0.3779 | $-1.6474 | False | False |
| SOL | r2_regime_router | $-15.1411 | $-15.1448 | $-15.0600 | $-8.2479 | $-3.4273 | False | False |

## Uninterrupted baseline accounts

Period cells are close-marked equity changes, including carried positions. Fees/funding below belong to the full account, not individual periods. No boundary cash reset.

| Asset | Candidate | Final $ | Development delta | Validation delta | Reused test delta | Reused recent delta | Reused 15d delta | Fees $ | Funding paid $ | Liquidations | All deltas positive |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| ETH | r2_vwap_trend | 4.9483 | $-15.0517 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 14.5602 | +0.7895 | 0 | False |
| ETH | r2_vwap_fade | 4.9589 | $-11.7288 | $-2.5946 | $-0.7177 | $+0.0000 | $+0.0000 | 6.5049 | -0.0829 | 0 | False |
| ETH | r2_rsi2_exhaustion | 10.3621 | $-7.0340 | $-1.8974 | $+0.0922 | $-0.7987 | $+0.0000 | 1.5767 | -0.0309 | 0 | False |
| ETH | r2_shock_reversal | 23.7749 | $-0.2363 | $-2.6946 | $+7.2192 | $+0.6987 | $-1.2120 | 2.8417 | -0.0756 | 0 | False |
| ETH | r2_compression_breakout | 16.0685 | $-1.6199 | $+1.4660 | $-4.6675 | $+1.3445 | $-0.4545 | 2.6986 | +0.5406 | 0 | False |
| ETH | r2_slow_ema_cross | 22.7808 | $+14.4717 | $-4.5695 | $-9.0291 | $+1.9076 | $+0.0000 | 2.1607 | +0.6428 | 0 | False |
| ETH | r2_daily_momentum | 20.6481 | $+0.4656 | $-1.5276 | $+1.4409 | $-0.5873 | $+0.8564 | 0.7452 | +0.7855 | 0 | False |
| ETH | r2_breakout_retest | 12.7879 | $-6.9031 | $+1.3355 | $-1.6445 | $+0.0000 | $+0.0000 | 2.2558 | +0.9895 | 0 | False |
| ETH | r2_overnight_rejection | 4.9795 | $-15.0205 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 6.6108 | -0.1496 | 0 | False |
| ETH | r2_regime_router | 4.8804 | $-15.1196 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 10.3118 | +0.4241 | 0 | False |
| SOL | r2_vwap_trend | 4.8123 | $-15.1877 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 4.4670 | +0.8178 | 0 | False |
| SOL | r2_vwap_fade | 4.7808 | $-15.2192 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 3.9954 | -0.0916 | 0 | False |
| SOL | r2_rsi2_exhaustion | 13.2421 | $-3.4402 | $-2.2996 | $-2.6414 | $+1.3573 | $+0.2661 | 1.1186 | +0.0002 | 0 | False |
| SOL | r2_shock_reversal | 19.9323 | $-2.0392 | $-2.1142 | $+4.0858 | $+0.0000 | $+0.0000 | 1.0852 | -0.0453 | 0 | False |
| SOL | r2_compression_breakout | 18.8843 | $+4.2847 | $+3.9961 | $-9.7307 | $+1.6133 | $-1.2790 | 2.5000 | +0.7061 | 0 | False |
| SOL | r2_slow_ema_cross | 29.2038 | $+7.2327 | $+3.6449 | $-0.2999 | $-1.3740 | $+0.0000 | 1.9908 | +0.2855 | 0 | False |
| SOL | r2_daily_momentum | 23.4882 | $-0.9000 | $+1.9778 | $+1.8792 | $+0.0115 | $+0.5197 | 0.4135 | +0.2204 | 0 | False |
| SOL | r2_breakout_retest | 12.1200 | $-9.3692 | $-0.6287 | $+1.3266 | $+0.0261 | $+0.7652 | 1.8797 | +0.7405 | 0 | False |
| SOL | r2_overnight_rejection | 4.9330 | $-15.0670 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 6.5657 | -0.1158 | 0 | False |
| SOL | r2_regime_router | 4.9605 | $-13.7891 | $-1.2504 | $+0.0000 | $+0.0000 | $+0.0000 | 15.3978 | +0.7276 | 0 | False |

## Uninterrupted stress accounts

Period cells are close-marked equity changes, including carried positions. Fees/funding below belong to the full account, not individual periods. No boundary cash reset.

| Asset | Candidate | Final $ | Development delta | Validation delta | Reused test delta | Reused recent delta | Reused 15d delta | Fees $ | Funding paid $ | Liquidations | All deltas positive |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| ETH | r2_vwap_trend | 4.9365 | $-15.0635 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 5.1930 | +1.7050 | 0 | False |
| ETH | r2_vwap_fade | 4.8563 | $-15.1437 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 3.8891 | +0.8631 | 0 | False |
| ETH | r2_rsi2_exhaustion | 9.2507 | $-7.3483 | $-2.1206 | $-0.5358 | $-0.7446 | $+0.0000 | 1.2814 | +0.9469 | 0 | False |
| ETH | r2_shock_reversal | 18.2864 | $-2.1422 | $-2.8125 | $+3.6648 | $+0.4224 | $-0.8461 | 2.1806 | +1.1468 | 0 | False |
| ETH | r2_compression_breakout | 8.9018 | $-6.9269 | $-0.3691 | $-4.0225 | $+0.5200 | $-0.2996 | 1.5678 | +7.3061 | 0 | False |
| ETH | r2_slow_ema_cross | 12.4142 | $+1.9147 | $-4.0274 | $-5.9289 | $+0.4558 | $+0.0000 | 1.0185 | +9.5638 | 0 | False |
| ETH | r2_daily_momentum | 18.3160 | $-0.0487 | $-0.1232 | $-1.1001 | $-0.8205 | $+0.4086 | 0.4119 | +5.5825 | 0 | False |
| ETH | r2_breakout_retest | 10.4475 | $-7.6584 | $+0.2580 | $-2.1521 | $+0.0000 | $+0.0000 | 1.4736 | +4.2407 | 0 | False |
| ETH | r2_overnight_rejection | 4.9753 | $-15.0247 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 4.4015 | +0.7593 | 0 | False |
| ETH | r2_regime_router | 4.9918 | $-15.0082 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 6.1048 | +1.8732 | 0 | False |
| SOL | r2_vwap_trend | 4.9215 | $-15.0785 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 3.1237 | +1.0856 | 0 | False |
| SOL | r2_vwap_fade | 4.9234 | $-15.0766 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 2.9050 | +0.6391 | 0 | False |
| SOL | r2_rsi2_exhaustion | 12.3769 | $-3.6290 | $-2.2192 | $-2.9161 | $+0.9663 | $+0.1749 | 0.9404 | +0.6843 | 0 | False |
| SOL | r2_shock_reversal | 18.0068 | $-2.3999 | $-2.3384 | $+2.7451 | $+0.0000 | $+0.0000 | 0.8907 | +0.4570 | 0 | False |
| SOL | r2_compression_breakout | 12.6297 | $+0.2116 | $+0.6296 | $-8.1395 | $+0.8008 | $-0.8728 | 1.6300 | +7.4422 | 0 | False |
| SOL | r2_slow_ema_cross | 15.7047 | $-0.7532 | $+0.6406 | $-3.5422 | $-0.6404 | $+0.0000 | 0.9124 | +8.0715 | 0 | False |
| SOL | r2_daily_momentum | 20.3377 | $+1.4574 | $+0.6239 | $-1.7681 | $-0.2558 | $+0.2803 | 0.2482 | +3.2581 | 0 | False |
| SOL | r2_breakout_retest | 11.3235 | $-9.1709 | $-1.2209 | $+1.4205 | $-0.0704 | $+0.3652 | 1.3713 | +3.6618 | 0 | False |
| SOL | r2_overnight_rejection | 4.9648 | $-15.0352 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 4.3786 | +0.5601 | 0 | False |
| SOL | r2_regime_router | 4.8589 | $-15.1411 | $+0.0000 | $+0.0000 | $+0.0000 | $+0.0000 | 4.8465 | +1.7826 | 0 | False |

## Selection, unchanged by later results

- ETH: `r2_vwap_fade`; status `failed_screen_fallback`. Dev/validation eligibility and baseline validation ranking only.
- SOL: `r2_vwap_fade`; status `failed_screen_fallback`. Dev/validation eligibility and baseline validation ranking only.

## Interpretation and limits

A positive retrospective cell or all-period screen is exploratory discovery. Earlier outcomes informed the new hypotheses; there is no untouched confirmation. Breakeven and no-trade periods never qualify.

- Research only. No wallet, order, account-permission or live leverage changes.
- Binance USD-M trade and mark candles proxy Hyperliquid execution and liquidation. This is not a single-venue reconstruction.
- Observed Hyperliquid funding uses Binance mark-open as an oracle-price proxy; exact historical oracle prices are unavailable.
- Hourly funding is settled at the open for carried positions, before new entries. Scheduled preceding-close exits precede settlement; exact same-time matching cannot be reconstructed.
- Missing funding uses an explicit adverse 0.00125% per hour for either direction; stress uses adverse 0.01% per hour.
- Liquidation conservatively loses remaining isolated collateral. Actual order-book liquidation may retain some margin; no liquidation clearance fee is added.
- Known open gap exits precede later mark extremes. When intrabar order is unknown, liquidation precedes stops, and stops precede targets.
- Current mainnet quantity precision and small-notional maintenance tiers are held constant historically. Testnet and historical tiers can differ.
- Drawdown is marked at 15-minute closes and modeled exits, not tick-by-tick. Failed stops, latency and market depth are unavailable.
- Each run starts with fresh collateral and ends flat. Separate ETH/SOL runs are not a simultaneous shared-$20 portfolio.
- The $20 is assumed already deposited collateral. Deposit, withdrawal, bridge, network and tax costs are excluded.
- This is adaptive round-two research: every calendar period, including October 21-November 4, was examined previously. None is an untouched or prospective test.
- Ten new fixed hypotheses and two assets are disclosed, with no parameter tuning or leverage search after returns. Baseline leverage is 5x throughout.
- Round two permits positions across UTC midnight for up to seven days. Entries are allowed all UTC hours. This differs from the original daily-flat study.
- Sizing reserves funding for at least 24 hours or the full planned holding limit, whichever is longer. Other account, risk, margin and minimum-order rules are unchanged.
- Daily momentum requires 60 prior completed daily candles, but source history starts January 1, 2024 and development starts February 1. Its first development month is therefore no-entry warmup; that flat period stays in the reported development ROI. No dates are shifted or synthetic context added.
- Candidate selection uses baseline development eligibility and validation ranking only. Later windows, stress and continuous outcomes cannot change selection.
- Strict all-period positivity requires positive net P&L and at least one completed trade in each fresh-account window. The stronger sample screen requires 30 development, 30 validation, 20 reused-test and three trades in each short window.
- A positive short window with three trades remains a small historical sample, not evidence of a durable live edge.
- Fresh-window tests each start with $20 and force an evaluation-end exit. Continuous cases start once with $20 and carry account state and open positions across all five boundaries without funding or cash resets.
- Continuous period changes are close-marked equity deltas including open positions. Fees and funding are reported for the full continuous run, not allocated across periods from completed trade logs.
- Adverse-cost stress reruns the full strategy and sizing with 8bps slippage per fill and an adverse 0.01% hourly funding charge in either direction. Its changed sizing means it is not a fee-only subtraction from baseline trades.
- USDT prices and USDC collateral are treated at dollar parity. Depeg and conversion costs are excluded alongside deposits, withdrawals, bridges, network fees and tax.

## Evidence files

The 240-row CSV preserves all 200 fresh-window and 40 continuous cases. Summary JSON records all candidates, strict/sufficient/stress verdicts and all continuous boundary deltas. Selected baseline/stress cases retain complete trade/equity logs. Source/data SHA256 hashes identify exact inputs; private code and absolute paths are excluded.
