# MATEx $20 ETH/SOL perpetuals study

Historical research using Binance perpetual trade/mark prices and Hyperliquid funding. No live orders or wallet calls.

Plan frozen: 2026-11-05T20:37:58.907916+00:00. Baseline: 5x, $20 fresh collateral, 0.045% taker fee per fill, 2bps slippage per fill, 5% planned risk, $150 notional cap, $10 minimum opening order.

Candidates are selected per asset using development eligibility and validation ranking only. Every failure remains below. Later dates are new to this study, not globally untouched or prospective evidence.

## All ten fixed candidates at 5x

Each cell is net account P&L after modeled fees, slippage and funding; every window starts with a fresh $20.

| Asset | Candidate | Development | Validation | Reused test | Reused recent | Later 15 days |
|---|---|---:|---:|---:|---:|---:|
| ETH | trend_breakout | $-15.0040 | $-15.0077 | $-15.0273 | $-1.7591 | $-0.2932 |
| ETH | range_reversion | $-1.0419 | $-2.3911 | $-0.2007 | $-0.4137 | $+0.0797 |
| ETH | opening_range | $-15.1700 | $-8.9120 | $-15.0216 | $-2.4809 | $-3.8763 |
| ETH | hourly_bb_reentry | $-15.1085 | $-12.0959 | $-12.4143 | $-3.6079 | $+1.7723 |
| ETH | previous_day_failure | $-15.0150 | $-11.8195 | $-15.0559 | $+2.0403 | $-3.6195 |
| ETH | opening_range_fade | $-15.0155 | $-10.8244 | $-10.0022 | $-3.7098 | $-1.3535 |
| ETH | hourly_trend_breakout | $-15.1084 | $+23.8999 | $-9.4264 | $-2.0504 | $-0.6127 |
| ETH | ema_pullback | $-11.7960 | $-8.3101 | $-10.3965 | $-1.8972 | $+0.2279 |
| ETH | atr_channel | $-3.8243 | $+10.9567 | $+9.4719 | $+0.1582 | $-0.3515 |
| ETH | rsi_trend | $-15.0172 | $-7.9821 | $-14.2115 | $+2.3902 | $-0.0624 |
| SOL | trend_breakout | $-15.1643 | $-15.1183 | $-15.0907 | $-1.8354 | $-4.4639 |
| SOL | range_reversion | $-8.0302 | $-7.3640 | $-6.3668 | $-0.5670 | $-0.4986 |
| SOL | opening_range | $-15.2047 | $-12.1903 | $-15.0398 | $-2.1905 | $-1.6634 |
| SOL | hourly_bb_reentry | $-15.1659 | $-11.0862 | $-12.1550 | $-3.1079 | $+1.3432 |
| SOL | previous_day_failure | $-15.1044 | $-11.8265 | $-15.0895 | $-3.3923 | $-2.7358 |
| SOL | opening_range_fade | $-10.0307 | $-9.6999 | $-6.7267 | $-3.5745 | $-1.1762 |
| SOL | hourly_trend_breakout | $-15.0316 | $-13.1515 | $+5.0000 | $+2.4208 | $-2.3139 |
| SOL | ema_pullback | $-11.9645 | $+4.9195 | $-8.5012 | $-1.1709 | $-1.0856 |
| SOL | atr_channel | $-9.0378 | $-6.0330 | $+2.7177 | $+1.9542 | $-0.0761 |
| SOL | rsi_trend | $-14.6145 | $-5.7050 | $-13.2880 | $-0.9202 | $+3.6957 |

## ETH selection

Candidate: **hourly_trend_breakout**. Status: **failed_screen_fallback**.

| Case | Leverage | Window | Final $ | Net $ | Fees $ | Funding paid $ | Trades | Liquidations | Close-marked DD |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| baseline | 2x | development | 7.8997 | -12.1003 | 4.7681 | +0.4488 | 302 | 0 | 65.44% |
| baseline | 2x | validation | 30.7307 | +10.7307 | 3.6837 | +0.1593 | 105 | 0 | 17.01% |
| baseline | 2x | reused_test | 15.0974 | -4.9026 | 3.8919 | +0.0708 | 138 | 0 | 48.98% |
| baseline | 2x | reused_recent | 19.0734 | -0.9266 | 0.3126 | -0.0024 | 12 | 0 | 6.02% |
| baseline | 2x | later_check | 19.7116 | -0.2884 | 0.1346 | +0.0049 | 5 | 0 | 5.06% |
| baseline | 5x | development | 4.8916 | -15.1084 | 4.9157 | +0.5672 | 161 | 0 | 79.86% |
| baseline | 5x | validation | 43.8999 | +23.8999 | 9.4474 | +0.3777 | 105 | 0 | 31.00% |
| baseline | 5x | reused_test | 10.5736 | -9.4264 | 7.7697 | +0.1349 | 138 | 0 | 70.16% |
| baseline | 5x | reused_recent | 17.9496 | -2.0504 | 0.7009 | -0.0040 | 12 | 0 | 13.35% |
| baseline | 5x | later_check | 19.3873 | -0.6127 | 0.3084 | +0.0053 | 5 | 0 | 10.32% |
| baseline | 10x | development | 4.9689 | -15.0311 | 4.8713 | +0.5692 | 142 | 0 | 79.57% |
| baseline | 10x | validation | 44.4714 | +24.4714 | 9.6547 | +0.3851 | 105 | 0 | 30.91% |
| baseline | 10x | reused_test | 10.8490 | -9.1510 | 9.0662 | +0.1601 | 138 | 0 | 69.61% |
| baseline | 10x | reused_recent | 17.7373 | -2.2627 | 0.8602 | +0.0031 | 12 | 0 | 14.09% |
| baseline | 10x | later_check | 19.6096 | -0.3904 | 0.3230 | +0.0054 | 5 | 0 | 10.34% |
| baseline | 20x | development | 4.8016 | -15.1984 | 3.9267 | +0.5393 | 110 | 4 | 80.26% |
| baseline | 20x | validation | 37.8939 | +17.8939 | 8.9291 | +0.3827 | 105 | 1 | 35.87% |
| baseline | 20x | reused_test | 7.4668 | -12.5332 | 7.4246 | +0.1270 | 138 | 5 | 75.89% |
| baseline | 20x | reused_recent | 17.7489 | -2.2511 | 0.8669 | +0.0037 | 12 | 0 | 14.04% |
| baseline | 20x | later_check | 19.6096 | -0.3904 | 0.3230 | +0.0054 | 5 | 0 | 10.34% |
| stress | 2x | reused_test | 10.7998 | -9.2002 | 3.3168 | +1.5761 | 138 | 0 | 60.84% |
| stress | 2x | later_check | 19.4702 | -0.5298 | 0.1340 | +0.0655 | 5 | 0 | 5.60% |
| stress | 5x | reused_test | 6.6555 | -13.3445 | 5.3148 | +2.5323 | 138 | 0 | 77.37% |
| stress | 5x | later_check | 19.2201 | -0.7799 | 0.2482 | +0.1127 | 5 | 0 | 9.21% |
| stress | 10x | reused_test | 6.5991 | -13.4009 | 5.3679 | +2.5650 | 138 | 0 | 77.42% |
| stress | 10x | later_check | 19.2201 | -0.7799 | 0.2482 | +0.1127 | 5 | 0 | 9.21% |
| stress | 20x | reused_test | 4.9195 | -15.0805 | 4.2825 | +2.0601 | 133 | 6 | 81.14% |
| stress | 20x | later_check | 19.2201 | -0.7799 | 0.2482 | +0.1127 | 5 | 0 | 9.21% |

## SOL selection

Candidate: **ema_pullback**. Status: **failed_screen_fallback**.

| Case | Leverage | Window | Final $ | Net $ | Fees $ | Funding paid $ | Trades | Liquidations | Close-marked DD |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| baseline | 2x | development | 9.0163 | -10.9837 | 2.9514 | +0.2276 | 175 | 0 | 57.35% |
| baseline | 2x | validation | 24.1545 | +4.1545 | 1.9277 | +0.0744 | 71 | 0 | 13.38% |
| baseline | 2x | reused_test | 12.9065 | -7.0935 | 1.9577 | +0.0458 | 91 | 0 | 41.88% |
| baseline | 2x | reused_recent | 19.5800 | -0.4200 | 0.1836 | -0.0051 | 7 | 0 | 3.10% |
| baseline | 2x | later_check | 19.6317 | -0.3683 | 0.2351 | -0.0135 | 9 | 0 | 6.48% |
| baseline | 5x | development | 8.0355 | -11.9645 | 3.6209 | +0.2666 | 173 | 0 | 64.07% |
| baseline | 5x | validation | 24.9195 | +4.9195 | 2.6724 | +0.0912 | 71 | 0 | 16.96% |
| baseline | 5x | reused_test | 11.4988 | -8.5012 | 3.2705 | +0.0652 | 91 | 0 | 51.73% |
| baseline | 5x | reused_recent | 18.8291 | -1.1709 | 0.3290 | -0.0073 | 7 | 0 | 7.59% |
| baseline | 5x | later_check | 18.9144 | -1.0856 | 0.4206 | -0.0241 | 9 | 0 | 11.98% |
| baseline | 10x | development | 8.0355 | -11.9645 | 3.6209 | +0.2666 | 173 | 0 | 64.07% |
| baseline | 10x | validation | 24.8661 | +4.8661 | 2.6737 | +0.0910 | 71 | 0 | 17.00% |
| baseline | 10x | reused_test | 11.2777 | -8.7223 | 3.2739 | +0.0640 | 91 | 1 | 52.59% |
| baseline | 10x | reused_recent | 18.8291 | -1.1709 | 0.3290 | -0.0073 | 7 | 0 | 7.59% |
| baseline | 10x | later_check | 18.9144 | -1.0856 | 0.4206 | -0.0241 | 9 | 0 | 11.98% |
| baseline | 20x | development | 4.8912 | -15.1088 | 1.4589 | +0.1580 | 91 | 19 | 75.56% |
| baseline | 20x | validation | 18.2411 | -1.7589 | 2.1761 | +0.0814 | 71 | 9 | 24.98% |
| baseline | 20x | reused_test | 7.4314 | -12.5686 | 2.4056 | +0.0488 | 91 | 11 | 68.65% |
| baseline | 20x | reused_recent | 18.8291 | -1.1709 | 0.3290 | -0.0073 | 7 | 0 | 7.59% |
| baseline | 20x | later_check | 18.9144 | -1.0856 | 0.4206 | -0.0241 | 9 | 0 | 11.98% |
| stress | 2x | reused_test | 10.5670 | -9.4330 | 1.7702 | +0.8952 | 91 | 0 | 51.41% |
| stress | 2x | later_check | 19.1640 | -0.8360 | 0.2316 | +0.1170 | 9 | 0 | 7.31% |
| stress | 5x | reused_test | 9.0991 | -10.9009 | 2.4277 | +1.2401 | 91 | 0 | 59.49% |
| stress | 5x | later_check | 18.5035 | -1.4965 | 0.3420 | +0.1726 | 9 | 0 | 11.16% |
| stress | 10x | reused_test | 7.6333 | -12.3667 | 2.1369 | +1.0988 | 90 | 2 | 66.06% |
| stress | 10x | later_check | 18.5035 | -1.4965 | 0.3420 | +0.1726 | 9 | 0 | 11.16% |
| stress | 20x | reused_test | 6.3919 | -13.6081 | 1.8430 | +0.9916 | 89 | 12 | 71.41% |
| stress | 20x | later_check | 18.5035 | -1.4965 | 0.3420 | +0.1726 | 9 | 0 | 11.16% |

## Interpretation and limits

A positive historical cell is a simulated outcome, not a validated future-profit strategy. A failed or insufficient-sample selection is explicitly a fallback, even if a later cell happens to be positive.

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
- Ten hypotheses and multiple assets/leverage levels create selection bias. Previously examined dates are reused research; historical profit is not evidence of future profit.
- Seven hypotheses transfer from previously inspected research; three additional hourly definitions are fixed before this study's returns. All ten are disclosed.
- Development, validation, reused_test and reused_recent calendar data were already used in earlier research. Selection is adaptive research, not untouched confirmation.
- The 15-day later_check is new to this study, but its calendar dates already exist and are not claimed globally pristine or prospective.
- The 5x candidate is selected independently per asset from development eligibility and validation ranking only. Later returns, leverage sensitivity and stress never change the selected candidate.
- All ten candidates are published at baseline 5x in every window, including failures. Only the validation-selected candidate receives detailed leverage/stress runs.
- Positive results after modeled costs remain historical simulation. Small samples, multiple comparisons, proxy prices and parameter selection prevent a future-profit claim.
- Cost stress deliberately changes sizing through the same risk budget as well as fill/funding costs. It is a complete rerun, not a fee-only subtraction from baseline trades.
- Signal reward gates use fixed 0.045% fee plus 2bps slippage per side at signal close. Entry gaps may change reward/risk, and the simulator rejects entries beyond stop or target.

## Reproduction

Use the saved plan, summary.json, all-runs.csv, selected detail JSON and file hashes. Input filenames are relative dataset filenames; source hashes identify the exact engine, signals and loader used. No secrets or private absolute paths are included.
