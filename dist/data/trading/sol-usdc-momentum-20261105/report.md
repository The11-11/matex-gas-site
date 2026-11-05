# SOL daily momentum: native SOLUSDC study

Eight fixed cases, including the unchanged entry control, use native Binance USDC-margined perpetual prices, marks and published funding. All calendar periods are reused adaptive research.

Plan frozen: 2026-11-05T21:23:31.845161+00:00. Starting collateral is 20 USDC at a fixed 5x leverage ceiling. No live orders or wallet calls.

Native minimum opening notional is 5 USDC and stop/target tick is 0.01 USDC. Baseline fee assumption is 0.05% per fill, slippage 2bps. Stress uses 8bps and adverse 0.01% hourly funding scaled to each actual settlement interval; off-calendar hours have no funding charge.

The prior proxy used SOLUSDT prices, Hyperliquid funding and a $10 opening minimum. Changes here cannot be attributed only to USDC quoting. Maintenance margin remains an explicit conservative 2.5% research assumption; settlement payment prices use same-venue mark-open approximations.

First full input day: 2024-01-05; earliest daily-60 entry: 2024-03-06T00:00:00+00:00. Development dates remain fixed, retaining the no-entry warmup.

## Fresh-account baseline results

Each cell is net P&L after modeled costs, with completed trades in parentheses. Every window starts afresh with 20 USDC.

| Candidate | Development | Validation | Jan-Sep 2026 | Oct 1-20 | Oct 21-Nov 4 | All positive | Strong sample screen |
|---|---:|---:|---:|---:|---:|---|---|
| solm_control | -2.2133 (34) | +2.9371 (14) | +2.4443 (25) | -1.2053 (2) | +1.0411 (1) | False | False |
| solm_confirm2 | -2.8703 (31) | +4.6324 (11) | +8.8159 (19) | -0.6108 (2) | +0.8449 (1) | False | False |
| solm_deadband | -4.2819 (34) | +4.2137 (16) | +1.5514 (21) | -0.4921 (2) | +0.8694 (1) | False | False |
| solm_capital_fit | +2.7089 (44) | +4.2124 (14) | -4.9864 (31) | -1.3055 (2) | +1.5216 (1) | False | False |
| solm_hold72h | -1.5585 (50) | -0.5325 (17) | +0.5831 (33) | -1.0447 (2) | +0.2792 (1) | False | False |
| solm_trend_quality | -1.9505 (29) | +2.2902 (12) | -0.1234 (22) | -1.2053 (2) | +1.0411 (1) | False | False |
| solm_pullback | -3.2554 (11) | +1.0343 (7) | -2.2259 (7) | +0.5417 (1) | +0.4081 (1) | False | False |
| solm_funding_filter | +0.3653 (34) | +2.9371 (14) | +2.4443 (25) | -1.2053 (2) | +1.0411 (1) | False | False |

## Continuous baseline accounts

One 20-USDC account carries through all boundaries. Period cells are marked equity deltas, including open positions; fees/funding are full-run totals, not attributed from trade exit dates.

| Candidate | Final USDC | Development delta | Validation delta | Jan-Sep delta | Oct 1-20 delta | Oct 21-Nov 4 delta | Fees | Funding paid | Liquidations | All deltas positive |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| solm_control | 22.3943 | -2.2133 | +2.5796 | +1.4997 | +0.0476 | +0.4808 | 0.7504 | +0.1523 | 0 | False |
| solm_confirm2 | 28.7144 | -2.8703 | +3.7122 | +8.0268 | -0.8611 | +0.7068 | 0.6817 | +0.1059 | 0 | False |
| solm_deadband | 21.2729 | -4.2819 | +3.0540 | +1.6038 | -0.4832 | +1.3801 | 0.6840 | +0.1931 | 0 | False |
| solm_capital_fit | 21.4569 | +2.7089 | +4.8879 | -6.8716 | +0.0659 | +0.6657 | 1.5706 | +0.3320 | 0 | False |
| solm_hold72h | 18.0690 | -1.5585 | -0.2623 | +0.5761 | -0.9225 | +0.2362 | 0.9861 | +0.0779 | 0 | False |
| solm_trend_quality | 19.3680 | -1.9505 | +1.8585 | -0.9870 | +0.0403 | +0.4068 | 0.6033 | +0.1374 | 0 | False |
| solm_pullback | 16.0411 | -3.2554 | +0.7596 | -2.1766 | +0.3912 | +0.3222 | 0.3446 | +0.0462 | 0 | False |
| solm_funding_filter | 25.7790 | +0.3653 | +2.7805 | +2.0489 | +0.0296 | +0.5548 | 0.8402 | -0.0030 | 0 | True |
## Fresh-account stress results

Each cell is net P&L after modeled costs, with completed trades in parentheses. Every window starts afresh with 20 USDC.

| Candidate | Development | Validation | Jan-Sep 2026 | Oct 1-20 | Oct 21-Nov 4 | All positive | Strong sample screen |
|---|---:|---:|---:|---:|---:|---|---|
| solm_control | -2.7957 (33) | +1.1314 (14) | -1.4095 (25) | -1.1127 (2) | +0.6156 (1) | False | False |
| solm_confirm2 | -4.8175 (28) | +2.4932 (11) | +3.3192 (19) | -0.7676 (2) | +0.4675 (1) | False | False |
| solm_deadband | -4.1834 (31) | +1.3573 (16) | -1.0957 (21) | -0.6596 (2) | +0.5464 (1) | False | False |
| solm_capital_fit | -0.9108 (44) | +1.3746 (14) | -6.8575 (31) | -1.1429 (2) | +0.8618 (1) | False | False |
| solm_hold72h | -2.9227 (46) | -1.3742 (17) | -2.0277 (33) | -1.0538 (2) | +0.1619 (1) | False | False |
| solm_trend_quality | -6.1235 (23) | +0.7325 (12) | -2.9608 (22) | -1.1127 (2) | +0.6156 (1) | False | False |
| solm_pullback | -3.7869 (11) | +0.3905 (7) | -2.4443 (7) | +0.3179 (1) | +0.2159 (1) | False | False |
| solm_funding_filter | -1.7030 (30) | +1.1314 (14) | -1.4095 (25) | -1.1127 (2) | +0.6156 (1) | False | False |

## Continuous stress accounts

One 20-USDC account carries through all boundaries. Period cells are marked equity deltas, including open positions; fees/funding are full-run totals, not attributed from trade exit dates.

| Candidate | Final USDC | Development delta | Validation delta | Jan-Sep delta | Oct 1-20 delta | Oct 21-Nov 4 delta | Fees | Funding paid | Liquidations | All deltas positive |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| solm_control | 15.3448 | -2.7957 | +0.1278 | -2.0182 | -0.1677 | +0.1986 | 0.5264 | +6.4741 | 1 | False |
| solm_confirm2 | 18.8807 | -4.8175 | +1.9192 | +2.2187 | -0.7146 | +0.2749 | 0.4383 | +5.4714 | 0 | False |
| solm_deadband | 15.8956 | -4.1834 | +0.8563 | -0.8700 | -0.5034 | +0.5960 | 0.4894 | +5.5686 | 0 | False |
| solm_capital_fit | 13.5933 | -0.9108 | +1.3951 | -6.9231 | -0.2232 | +0.2553 | 0.9807 | +8.3216 | 0 | False |
| solm_hold72h | 13.0897 | -2.9227 | -1.8495 | -1.4574 | -0.7752 | +0.0945 | 0.7439 | +4.3800 | 0 | False |
| solm_trend_quality | 12.0782 | -6.1235 | -0.0029 | -1.8141 | -0.1514 | +0.1702 | 0.3298 | +3.8888 | 0 | False |
| solm_pullback | 14.7167 | -3.7869 | +0.3524 | -2.2439 | +0.2331 | +0.1619 | 0.2968 | +1.5140 | 0 | False |
| solm_funding_filter | 17.0871 | -1.7030 | +0.8534 | -2.0987 | -0.1916 | +0.2270 | 0.5534 | +6.7779 | 1 | False |

## Selection and control

Validation-only selection: `solm_confirm2`; status `insufficient_sample`. Later/stress/continuous returns cannot change selection.

Control: `solm_control`. Full control and selected-case logs are retained; if these are the same candidate, the files are shared rather than duplicated.

## Interpretation and limits

- All five calendar periods have already been examined in earlier proxy studies. This focused round is adaptive historical research, not untouched or prospective confirmation.
- Eight fixed cases include the unchanged daily-momentum entry control and seven declared modifications. No parameter, leverage or date search is performed after this round sees returns.
- Native Binance SOLUSDC trade candles, mark candles and published funding are used together. This is not SOLUSDT relabelled as USDC and is not a reconstruction of Hyperliquid execution.
- The native $5 minimum opening notional, $0.01 price tick, 0.05% taker-fee assumption and native funding calendar differ from the prior $10-minimum mixed-venue proxy. Performance changes cannot be attributed only to USDC quoting.
- The 0.05% taker fee per fill is a conservative research assumption with no promotional, VIP or BNB discount. It is not an account-specific fee quote.
- Maintenance margin is held at a conservative research assumption of 2.5%; Binance historical leverage brackets are not reconstructed. Isolated liquidation loses remaining collateral and absorbs any clearance cost within that loss rather than debiting unrelated free cash.
- Funding rates are whole published settlement-interval rates, charged only at the declared native settlement times. No hourly charges are invented between native settlements.
- Every funding payment uses the same-venue mark-candle open as the settlement-price approximation, including dates where REST also supplies a precise settlement mark. No unavailable historical price is invented.
- Funding stress and missing-rate fallback are hourly assumptions multiplied by the actual published settlement interval. The strict native loader rejects undeclared gaps instead of substituting another market.
- Signals use completed UTC days and enter at the next 15-minute open. Funding-filter decisions use only sufficiently lagged settled funding; no future rate selects a trade.
- Public onboarding metadata differs from observed trade coverage: marks begin January 3, 2024 at 00:00 UTC, metadata onboarding is January 3 at 12:45 UTC, and trades begin January 4 at 12:45 UTC. The first aligned complete day is January 5. The partial aligned day is excluded, and daily warmup remains inside development without shifting dates or fabricating earlier candles.
- Positions may cross midnight for up to seven days. Sizing reserves funding for at least 24 hours or the full maximum planned hold. Actual losses and funding can exceed that planned risk estimate.
- Stops and targets are rounded to the native tick, against profitability. Average taker fill prices may lie between ticks. Failed stops, latency and depth are unavailable.
- Known open exits precede later intrabar mark extremes. Unknown intrabar ordering is conservative: liquidation before stop, stop before target. Drawdown is close-marked, not tick-by-tick.
- Each fresh window starts with $20 USDC and finishes flat. Continuous cases start once and carry positions and equity through all five boundaries, without cash or funding resets.
- Continuous period changes are marked-equity deltas including open positions. Fees and funding are reported for the full account rather than incorrectly allocating aggregate trade funding to exit periods.
- Positive P&L with one trade per period is only a strict descriptive screen. The stronger sample screen requires 30 development, 30 validation, 20 long-test and three trades in each short window; even those short samples are weak evidence.
- Adverse-cost stress changes sizing as well as fills and funding; it is not a cost subtraction from an unchanged set of baseline trades.
- The $20 is assumed already funded collateral. USDC acquisition, deposits, withdrawals, bridging, network fees, conversion, depeg and tax costs are excluded.
- USDC quoting and settlement support Circle ecosystem alignment but do not establish a Circle integration, endorsement, partnership, sponsored gas flow or grant award.
- Simulation only. No wallet, signatures, fund transfers, trading permissions or real exchange orders are used. Historical profit cannot establish future profitability.

## Evidence and reproduction

The 96-row CSV contains all 80 fresh-window and 16 continuous cases. Summary JSON includes every case, source/data hashes, strict and sample-aware verdicts, and continuous boundary deltas. Detailed selected/control JSON records replay these same cases; they are not independent extra evidence. Private source and absolute paths are excluded.
