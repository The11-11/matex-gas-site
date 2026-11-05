const DATA_ROOT = '/data/trading/';
const MANIFEST_URL = `${DATA_ROOT}manifest.json`;
const SHA256 = /^[0-9a-f]{64}$/i;
const SOURCE_KINDS = new Set(['bundled-sample', 'local-binance-cache', 'historical-perpetuals']);
const MAX_DATA_BYTES = 24 * 1024 * 1024;
const metricNames = ['finalEquity', 'netPnl', 'returnPct', 'feesPaid', 'slippageCost', 'maxDrawdownPct', 'completedTrades'];
const finite = value => typeof value === 'number' && Number.isFinite(value);
const plainText = (value, maximum = 400) => typeof value === 'string' ? value.slice(0, maximum) : '';
const date = value => new Date(Number(value) * 1000);
export function utcDate(value, time = false) {
  const instant = date(value);
  if (!Number.isFinite(instant.getTime())) return 'Unavailable';
  return time ? `${instant.toISOString().slice(11, 19)} UTC` : instant.toISOString().slice(0, 10);
}
export function researchDataUrl(value, origin = globalThis.location?.origin || 'https://local.invalid') {
  if (typeof value !== 'string' || value.length > 500 || !value.startsWith(DATA_ROOT) || /[%\\]/.test(value)) throw new Error('The snapshot contains an invalid data-file link.');
  const parsed = new URL(value, origin);
  if (parsed.origin !== origin || !parsed.pathname.startsWith(DATA_ROOT) || parsed.search || parsed.hash || !/\.(?:csv|json|txt|zip)$/i.test(parsed.pathname)) throw new Error('Only files in this public research snapshot can be loaded.');
  return parsed.pathname;
}
export function validateResearchManifest(value) {
  if (!value || value.schemaVersion !== 1 || value.mode !== 'historical-research-snapshot' || !Array.isArray(value.datasets)
      || !value.datasets.length || value.datasets.length > 20 || !Array.isArray(value.reports) || value.reports.length > 60) throw new Error('The public research catalog has an unsupported format.');
  const ids = new Set();
  for (const item of value.datasets) {
    if (!item || !/^[a-z0-9-]{1,80}$/.test(item.id || '') || ids.has(item.id) || !SOURCE_KINDS.has(item.sourceKind)
        || typeof item.label !== 'string' || typeof item.available !== 'boolean') throw new Error('Dataset metadata is incomplete or ambiguous.');
    ids.add(item.id);
    if (item.available) {
      if (!Number.isSafeInteger(item.candleCount) || item.candleCount < 2 || item.candleCount > 150000 || !Number.isSafeInteger(item.firstTs)
          || !Number.isSafeInteger(item.lastTs) || item.lastTs <= item.firstTs || !finite(item.intervalSeconds) || item.intervalSeconds <= 0
          || !SHA256.test(item.sha256 || '')) throw new Error('The historical dataset coverage or checksum is invalid.');
      researchDataUrl(item.csvUrl); researchDataUrl(item.jsonUrl);
    }
    if (item.auxDownloads !== undefined && (!Array.isArray(item.auxDownloads) || item.auxDownloads.length > 10)) throw new Error('Supporting dataset links exceed this snapshot’s limit.');
    for (const auxiliary of item.auxDownloads || []) { researchDataUrl(auxiliary.url); if (!SHA256.test(auxiliary.sha256 || '')) throw new Error('A supporting data checksum is missing.'); }
  }
  const reportIds = new Set();
  for (const report of value.reports) {
    if (!report || !ids.has(report.datasetId) || !['sma_cross', 'rsi_reversion'].includes(report.strategy) || !/^[a-z0-9_-]{1,100}$/.test(report.id || '') || reportIds.has(report.id)) throw new Error('The fixed-report catalog is invalid.');
    reportIds.add(report.id); researchDataUrl(report.url);
  }
  if (value.archivedResearch !== undefined && (!Array.isArray(value.archivedResearch) || value.archivedResearch.length > 100)) throw new Error('The research archive list exceeds this snapshot’s limit.');
  for (const archive of value.archivedResearch || []) researchDataUrl(archive.url);
  researchDataUrl(value.bundleUrl);
  return value;
}
export function validateHistoricalCandles(value, dataset) {
  if (!value || JSON.stringify(value.columns) !== JSON.stringify(['ts', 'open', 'high', 'low', 'close', 'volume'])
      || !Array.isArray(value.candles) || value.candles.length !== dataset.candleCount || value.candles.length > 150000) throw new Error('The candle file does not match the published dataset count or columns.');
  let previous = -1;
  for (const row of value.candles) {
    if (!Array.isArray(row) || row.length !== 6 || !Number.isSafeInteger(row[0]) || row[0] <= previous
        || row[0] < 0 || row[0] > 4102444800 || !row.slice(1).every(finite) || row.slice(1, 5).some(number => number <= 0)
        || row[5] < 0 || row[3] > Math.min(row[1], row[4]) || row[2] < Math.max(row[1], row[4]) || row[3] > row[2]) throw new Error('The candle file contains inconsistent historical rows.');
    previous = row[0];
  }
  if (value.candles[0][0] !== dataset.firstTs || value.candles.at(-1)[0] !== dataset.lastTs) throw new Error('The candle file differs from its published coverage.');
  return value.candles;
}
/** Largest-triangle sampling keeps a useful close-price outline within a fixed SVG bound. */
export function sampleHistoricalCloses(rows, threshold = 600) {
  if (!Number.isSafeInteger(threshold) || threshold < 3 || threshold > 600) throw new Error('Choose a chart bound from 3 to 600 points.');
  if (rows.length <= threshold) return rows.slice();
  const sampled = [rows[0]], every = (rows.length - 2) / (threshold - 2);
  let previousIndex = 0;
  for (let bucket = 0; bucket < threshold - 2; bucket++) {
    const averageStart = Math.floor((bucket + 1) * every) + 1;
    const averageEnd = Math.min(Math.floor((bucket + 2) * every) + 1, rows.length);
    let averageX = 0, averageY = 0;
    for (let index = averageStart; index < averageEnd; index++) { averageX += rows[index][0]; averageY += rows[index][4]; }
    const count = Math.max(1, averageEnd - averageStart); averageX /= count; averageY /= count;
    const rangeStart = Math.floor(bucket * every) + 1, rangeEnd = Math.min(Math.floor((bucket + 1) * every) + 1, rows.length - 1);
    const prior = rows[previousIndex]; let area = -1, selected = rangeStart;
    for (let index = rangeStart; index < rangeEnd; index++) {
      const candidate = rows[index], triangle = Math.abs((prior[0] - averageX) * (candidate[4] - prior[4]) - (prior[0] - candidate[0]) * (averageY - prior[4]));
      if (triangle > area) { area = triangle; selected = index; }
    }
    sampled.push(rows[selected]); previousIndex = selected;
  }
  sampled.push(rows.at(-1)); return sampled;
}
export function validateFixedReport(report, entry, dataset) {
  if (!report || report.service !== 'backtest' || report.mode !== 'historical-simulation' || report.strategy?.name !== entry.strategy
      || !SHA256.test(String(report.inputHash || '').replace(/^0x/, '')) || !report.dataset || report.dataset.id !== dataset.id
      || !Number.isSafeInteger(report.dataset.candleCount) || report.dataset.candleCount < 50 || report.dataset.candleCount > 500
      || !SHA256.test(report.dataset.candlesSha256 || '') || report.assumptions?.leverage !== 1 || report.assumptions?.executionModel !== 'next-open-spot'
      || !['zeroCost', 'baseline', 'stress'].every(name => report.scenarios?.[name] && metricNames.every(key => finite(report.scenarios[name][key])))
      || !report.buyHold || !metricNames.every(key => finite(report.buyHold[key]))) throw new Error('The recorded cost report does not match this dataset and fixed strategy.');
  return report;
}

async function boundedBytes(url, signal, maximum = MAX_DATA_BYTES) {
  let response;
  try { response = await fetch(researchDataUrl(url), { signal, credentials: 'omit', redirect: 'error', cache: 'no-cache' }); }
  catch (error) { if (error.name === 'AbortError') throw error; throw new Error('The public research files could not be reached. Check your connection and try again.'); }
  if (!response.ok) throw new Error(`A research snapshot file is unavailable (HTTP ${response.status}).`);
  if (Number(response.headers.get('content-length')) > maximum) throw new Error('This snapshot file exceeds the browser’s research-data limit.');
  const reader = response.body?.getReader();
  if (!reader) { const bytes = new Uint8Array(await response.arrayBuffer()); if (bytes.length > maximum) throw new Error('The research file is too large.'); return bytes; }
  const parts = []; let size = 0;
  try {
    while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > maximum) throw new Error('The research file is too large.'); parts.push(value); }
  } finally { await reader.cancel().catch(() => {}); }
  const bytes = new Uint8Array(size); let offset = 0; for (const part of parts) { bytes.set(part, offset); offset += part.byteLength; } return bytes;
}
async function readJson(url, signal, maximum = MAX_DATA_BYTES) {
  const bytes = await boundedBytes(url, signal, maximum);
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new Error('A public research file could not be read as JSON.'); }
}

function bootResearch() {
  const $ = id => document.getElementById(id);
  const state = { manifest: null, dataset: null, rows: [], datasetEpoch: 0, reportEpoch: 0, controller: null, reportController: null, width: 0 };
  const number = (value, digits = 4) => finite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: digits }) : '—';
  const node = (tag, text, className) => { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (className) e.className = className; return e; };
  function error(message) { $('research-error').hidden = !message; $('research-error-detail').textContent = message || ''; }
  function link(id, url) { const target = $(id); target.href = researchDataUrl(url); target.setAttribute('aria-disabled', 'false'); target.setAttribute('download', ''); }
  function pendingLink(id) { $(id).href = '#research-downloads'; $(id).setAttribute('aria-disabled', 'true'); $(id).removeAttribute('download'); }
  const interval = seconds => seconds % 86400 === 0 ? `${seconds / 86400} day` : seconds % 3600 === 0 ? `${seconds / 3600} hour` : `${seconds / 60} minute`;
  function placeholder(text) { const wrap = node('div', undefined, 'chart-placeholder'); wrap.append(node('span', '↗'), node('p', text)); $('research-chart').replaceChildren(wrap); }

  function drawChart() {
    if (!state.rows.length || !state.dataset) return;
    const rows = $('research-window').value === '500' ? state.rows.slice(-500) : state.rows;
    const points = sampleHistoricalCloses(rows), container = $('research-chart');
    const W = Math.max(320, Math.round(container.clientWidth || 1000)), H = W < 600 ? 260 : 330, left = W < 600 ? 53 : 66, right = 16, top = 18, bottom = H - 34;
    state.width = W;
    let min = Infinity, max = -Infinity; for (const row of rows) { min = Math.min(min, row[4]); max = Math.max(max, row[4]); }
    const padding = Math.max((max - min) * .08, max * .005, .01); min -= padding; max += padding;
    const first = rows[0][0], last = rows.at(-1)[0], x = timestamp => left + (timestamp - first) / Math.max(1, last - first) * (W - left - right), y = value => bottom - (value - min) / (max - min) * (bottom - top);
    const ns = 'http://www.w3.org/2000/svg';
    const svgNode = (name, attributes = {}, text) => { const e = document.createElementNS(ns, name); Object.entries(attributes).forEach(([key, value]) => e.setAttribute(key, String(value))); if (text !== undefined) e.textContent = text; return e; };
    const svg = svgNode('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', tabindex: 0, 'aria-labelledby': 'research-svg-title research-svg-description' });
    svg.append(svgNode('title', { id: 'research-svg-title' }, `${state.dataset.label}: historical close prices`), svgNode('desc', { id: 'research-svg-description' }, `${points.length} displayed points from ${rows.length} candles, ${utcDate(first)} to ${utcDate(last)}, UTC. Use left and right arrows to inspect displayed points. Complete OHLCV data can be downloaded.`));
    const defs = svgNode('defs'), gradient = svgNode('linearGradient', { id: 'research-price-fill', x1: 0, y1: 0, x2: 0, y2: 1 });
    gradient.append(svgNode('stop', { offset: '0%', 'stop-color': '#c8ef9a', 'stop-opacity': .15 }), svgNode('stop', { offset: '100%', 'stop-color': '#c8ef9a', 'stop-opacity': 0 })); defs.append(gradient); svg.append(defs);
    const ticks = W < 600 ? 3 : 4;
    for (let index = 0; index <= ticks; index++) {
      const value = min + (max - min) * index / ticks, at = y(value);
      svg.append(svgNode('line', { x1: left, x2: W - right, y1: at, y2: at, stroke: '#9bb78c', 'stroke-opacity': .13, 'stroke-dasharray': '3 6' }),
        svgNode('text', { x: left - 10, y: at + 3, fill: '#849e7c', 'text-anchor': 'end', 'font-size': W < 600 ? 9 : 10, 'font-family': 'DM Sans, sans-serif' }, number(value, max < 10 ? 3 : 0)));
    }
    const xTicks = W < 600 ? 2 : 4;
    for (let index = 0; index <= xTicks; index++) {
      const ts = first + (last - first) * index / xTicks;
      svg.append(svgNode('text', { x: x(ts), y: H - 9, fill: '#849e7c', 'text-anchor': index === 0 ? 'start' : index === xTicks ? 'end' : 'middle', 'font-size': W < 600 ? 9 : 10, 'font-family': 'DM Sans, sans-serif' }, utcDate(ts)));
    }
    const path = points.map((row, index) => `${index ? 'L' : 'M'}${x(row[0]).toFixed(2)},${y(row[4]).toFixed(2)}`).join(' ');
    svg.append(svgNode('path', { d: `${path} L${x(last)},${bottom} L${x(first)},${bottom} Z`, fill: 'url(#research-price-fill)' }),
      svgNode('path', { d: path, fill: 'none', stroke: '#c8ef9a', 'stroke-width': 1.65, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const crosshair = svgNode('line', { x1: 0, x2: 0, y1: top, y2: bottom, stroke: '#b8cea5', 'stroke-opacity': .5, 'stroke-dasharray': '3 4', visibility: 'hidden' });
    const dot = svgNode('circle', { r: 3, fill: '#d9f4b6', stroke: '#172b25', 'stroke-width': 2, visibility: 'hidden' }); svg.append(crosshair, dot);
    const tooltip = $('research-tooltip'); let selected = points.length - 1;
    function show(index) {
      selected = Math.max(0, Math.min(points.length - 1, index)); const row = points[selected], px = x(row[0]);
      crosshair.setAttribute('x1', px); crosshair.setAttribute('x2', px); crosshair.setAttribute('visibility', 'visible');
      dot.setAttribute('cx', px); dot.setAttribute('cy', y(row[4])); dot.setAttribute('visibility', 'visible');
      tooltip.replaceChildren(node('strong', `${utcDate(row[0])} · ${utcDate(row[0], true)}`));
      for (const [label, value] of [['Open', row[1]], ['High', row[2]], ['Low', row[3]], ['Close', row[4]], ['Volume', row[5]]]) { const line = node('span'); line.append(document.createTextNode(`${label}  `), node('b', number(value, 6))); tooltip.append(line); }
      tooltip.hidden = false;
    }
    function hide() { tooltip.hidden = true; crosshair.setAttribute('visibility', 'hidden'); dot.setAttribute('visibility', 'hidden'); }
    svg.addEventListener('pointermove', event => { const bounds = svg.getBoundingClientRect(), px = (event.clientX - bounds.left) / bounds.width * W; let nearest = 0, distance = Infinity; points.forEach((row, index) => { const delta = Math.abs(x(row[0]) - px); if (delta < distance) { nearest = index; distance = delta; } }); show(nearest); });
    svg.addEventListener('pointerleave', hide); svg.addEventListener('blur', hide);
    svg.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); show(event.key === 'Home' ? 0 : event.key === 'End' ? points.length - 1 : selected + (event.key === 'ArrowLeft' ? -1 : 1)); } });
    container.replaceChildren(svg); tooltip.hidden = true;
    $('research-chart-range').textContent = `${utcDate(first)} → ${utcDate(last)} · UTC`;
    $('research-chart-note').textContent = `${number(points.length, 0)} displayed close-price points from ${number(rows.length, 0)} candles in this view. Complete dataset: ${number(state.rows.length, 0)} OHLCV candles in the CSV.`;
  }

  function drawAuxiliary(dataset) {
    const target = $('research-auxiliary'); target.replaceChildren(); target.hidden = !(dataset.auxDownloads || []).length;
    for (const entry of dataset.auxDownloads || []) {
      const card = node('div', undefined, 'auxiliary-card'), text = node('div');
      text.append(node('strong', plainText(entry.label || (entry.type === 'funding' ? 'Historical funding series' : 'Historical mark prices'))),
        node('small', `${number(entry.rowCount, 0)} rows${finite(entry.firstTs) && finite(entry.lastTs) ? ` · ${utcDate(entry.firstTs)} → ${utcDate(entry.lastTs)} UTC` : ''}`));
      const a = node('a', 'Download CSV ↓'); a.href = researchDataUrl(entry.url); a.setAttribute('download', ''); a.title = `SHA-256: ${entry.sha256}`;
      card.append(text, a); target.append(card);
    }
  }
  function drawDatasetMetadata(dataset, rows) {
    $('research-first').textContent = utcDate(dataset.firstTs); $('research-first-time').textContent = utcDate(dataset.firstTs, true);
    $('research-last').textContent = utcDate(dataset.lastTs); $('research-last-time').textContent = utcDate(dataset.lastTs, true);
    $('research-count').textContent = number(rows.length, 0); $('research-interval').textContent = `${interval(dataset.intervalSeconds)} candles · complete file`;
    $('research-close').textContent = number(rows.at(-1)[4], rows.at(-1)[4] < 100 ? 4 : 2);
    $('research-close-unit').textContent = `${dataset.symbol?.includes('USDT') ? 'USDT quote' : 'Quote units'} · ${utcDate(dataset.lastTs)} UTC`;
    const kind = $('research-kind'); kind.className = 'research-badge';
    if (dataset.sourceKind === 'bundled-sample') { kind.textContent = 'SYNTHETIC DEMONSTRATION'; kind.classList.add('synthetic'); }
    else if (dataset.sourceKind === 'historical-perpetuals') { kind.textContent = 'HISTORICAL PERPETUALS'; kind.classList.add('perpetuals'); }
    else kind.textContent = 'HISTORICAL MARKET DATA';
    $('research-symbol').textContent = plainText(dataset.symbol, 30);
    $('research-chart-title').textContent = plainText(dataset.label, 150);
    $('research-source').textContent = dataset.sourceKind === 'bundled-sample' ? 'Bundled synthetic sample. Useful for checking the research pipeline; it is not an observed market-price history.'
      : dataset.sourceKind === 'historical-perpetuals' ? 'Archived perpetual-futures market candles. Available mark-price and funding-rate series are linked separately; their effects are not included in a spot report.'
        : 'Archived Binance market candles from the local research cache, exported to a normalized public OHLCV file.';
    $('research-gap-note').textContent = Number.isSafeInteger(dataset.gapCount) ? `${number(dataset.gapCount, 0)} irregular interval steps in the supplied history. Coverage is recorded, not a claim of live data availability.` : 'Coverage dates refer to this historical snapshot.';
    $('research-checksum').textContent = dataset.sha256;
    $('research-checksum-state').textContent = 'Published CSV checksum. Use “Verify” to compare the downloaded bytes in your browser.';
    $('research-verify').disabled = false; $('research-verify').textContent = 'Verify CSV checksum ↗';
    link('research-csv', dataset.csvUrl); link('research-json', dataset.jsonUrl); drawAuxiliary(dataset);
  }
  async function loadDataset(id) {
    const dataset = state.manifest?.datasets.find(item => item.id === id && item.available); if (!dataset) return;
    state.controller?.abort(); state.reportController?.abort(); state.controller = new AbortController(); const epoch = ++state.datasetEpoch;
    state.dataset = dataset; state.rows = []; $('research-window').disabled = true; $('research-verify').disabled = true;
    pendingLink('research-csv'); pendingLink('research-json'); $('research-tooltip').hidden = true; placeholder('Loading the complete historical candle file…');
    $('research-report-content').hidden = true; $('research-no-report').hidden = true; error('');
    try {
      const value = await readJson(dataset.jsonUrl, state.controller.signal); if (epoch !== state.datasetEpoch) return;
      state.rows = validateHistoricalCandles(value, dataset); drawDatasetMetadata(dataset, state.rows); $('research-window').disabled = false; drawChart();
      const reports = state.manifest.reports.filter(report => report.datasetId === dataset.id), select = $('research-report'); select.replaceChildren();
      pendingLink('research-report-download');
      if (!reports.length) {
        const option = node('option', 'No fixed spot comparison for this dataset'); select.append(option); select.disabled = true;
        $('research-no-report').hidden = false;
        $('research-no-report-detail').textContent = dataset.sourceKind === 'historical-perpetuals'
          ? 'This is a derivatives dataset. Its supporting mark/funding data and archived simulations are available for download below. The fixed SMA/RSI spot reports use the separate BTC 4-hour and synthetic sample datasets.'
          : 'No fixed strategy report is included for this historical dataset. The raw data remains available to inspect and download.';
      } else {
        for (const report of reports) { const option = node('option', plainText(report.label || report.strategy, 130)); option.value = report.id; select.append(option); }
        select.disabled = false; await loadReport(reports[0].id);
      }
    } catch (e) { if (e.name === 'AbortError' || epoch !== state.datasetEpoch) return; placeholder('This historical series is temporarily unavailable.'); error(e.message); }
  }
  function metricRow(label, metrics, className, detail) {
    const row = node('tr', undefined, className), first = node('td', label); if (detail) first.append(node('span', detail)); row.append(first);
    const values = [number(metrics.finalEquity, 6), number(metrics.netPnl, 6), `${number(metrics.returnPct, 4)}%`, number(metrics.feesPaid, 6), number(metrics.slippageCost, 6), `${number(metrics.maxDrawdownPct, 2)}%`, number(metrics.completedTrades, 0)];
    values.forEach((value, index) => { const cell = node('td', value); if (index === 1 || index === 2) cell.className = metrics.netPnl < 0 ? 'negative' : metrics.netPnl > 0 ? 'positive' : ''; row.append(cell); }); return row;
  }
  async function loadReport(id) {
    const entry = state.manifest?.reports.find(report => report.id === id && report.datasetId === state.dataset?.id); if (!entry) return;
    state.reportController?.abort(); state.reportController = new AbortController(); const epoch = ++state.reportEpoch, dataset = state.dataset;
    $('research-report-content').hidden = true; pendingLink('research-report-download');
    try {
      const report = validateFixedReport(await readJson(entry.url, state.reportController.signal, 1_048_576), entry, dataset);
      if (epoch !== state.reportEpoch || state.dataset?.id !== dataset.id) return;
      const a = report.assumptions, d = report.dataset;
      $('report-capital').textContent = number(a.startingCash, 2); $('report-fee').textContent = `${number(a.feeRate * 100, 4)}%`; $('report-slippage').textContent = `${number(a.slippageBps, 2)} bps`;
      $('report-execution').textContent = `Spot · ${a.leverage}×`; $('report-window').textContent = `${number(d.candleCount, 0)} frozen candles · ${utcDate(d.firstTs)} ${utcDate(d.firstTs, true)} → ${utcDate(d.lastTs)} ${utcDate(d.lastTs, true)}. Amounts below use simulation quote units.`;
      const table = $('report-scenarios'); table.replaceChildren(metricRow('Zero costs', report.scenarios.zeroCost, '', 'Trading fees 0 · slippage 0'),
        metricRow('Baseline', report.scenarios.baseline, 'baseline', `${number(report.scenarios.baseline.feeRate * 100, 4)}% fee · ${number(report.scenarios.baseline.slippageBps, 2)} bps slippage`),
        metricRow('Higher-cost stress', report.scenarios.stress, '', `${number(report.scenarios.stress.feeRate * 100, 4)}% fee · ${number(report.scenarios.stress.slippageBps, 2)} bps slippage`),
        metricRow('Buy & hold reference', report.buyHold, '', '95% allocation · second-open entry · final-close exit'));
      const params = report.strategy.params || {};
      $('report-strategy').textContent = report.strategy.name === 'sma_cross' ? `SMA crossover · fast ${params.fast} / slow ${params.slow}. Fixed defaults, not a parameter search.`
        : `RSI reversion · period ${params.period}, entry below ${params.entry}, exit above ${params.exit}. Fixed defaults, not a parameter search.`;
      $('report-risk').textContent = `Position cap ${number(a.positionFraction * 100, 2)}% · stop loss ${number(a.stopLoss * 100, 2)}% · drawdown halt ${number(a.maxDrawdown * 100, 2)}%. Remaining strategy positions are liquidated at the final close.`;
      $('report-input-hash').textContent = report.inputHash; $('report-data-hash').textContent = `Frozen ${d.candleCount}-candle SHA-256: ${d.candlesSha256}`;
      const notes = $('report-notes'); notes.replaceChildren();
      for (const note of (Array.isArray(report.notes) ? report.notes : []).slice(0, 15)) if (typeof note === 'string') notes.append(node('li', plainText(note, 1200)));
      $('research-report-content').hidden = false; link('research-report-download', entry.url);
    } catch (e) { if (e.name !== 'AbortError' && epoch === state.reportEpoch) error(e.message); }
  }
  function drawArchives(manifest) {
    const list = $('research-archive-list'); list.replaceChildren();
    for (const archive of manifest.archivedResearch || []) {
      const card = node('article', undefined, 'archive-card'), label = node('div', undefined, 'archive-label');
      label.append(node('span', 'ARCHIVED SIMULATION'), node('b', plainText(archive.format || 'file', 10).toUpperCase()));
      card.append(label, node('h3', plainText(archive.label || archive.id || 'Research record', 150)), node('p', plainText(archive.description || 'Archived research output. Inspect its assumptions and outcomes, including unsuccessful cases.', 650)));
      if (SHA256.test(archive.sha256 || '')) card.append(node('small', `SHA-256: ${archive.sha256}`));
      const a = node('a', 'Download research record'); a.append(node('span', '↓')); a.href = researchDataUrl(archive.url); a.setAttribute('download', ''); card.append(a); list.append(card);
    }
    if (!list.children.length) list.append(node('p', 'This snapshot includes the fixed comparison reports above. No additional archived derivatives reports are listed in its manifest.', 'archive-empty'));
    link('research-bundle', manifest.bundleUrl); link('research-bundle-top', manifest.bundleUrl);
    const limitations = $('research-limitations');
    if (Array.isArray(manifest.limitations) && manifest.limitations.length) {
      limitations.replaceChildren(); for (const text of manifest.limitations.slice(0, 15)) if (typeof text === 'string') limitations.append(node('li', plainText(text, 1200)));
    }
  }
  async function loadManifest() {
    error(''); $('research-dataset').disabled = true; $('research-report').disabled = true;
    try {
      const manifest = validateResearchManifest(await readJson(MANIFEST_URL, undefined, 1_048_576)); state.manifest = manifest;
      const generated = new Date(manifest.generatedAt); $('research-generated').textContent = Number.isFinite(generated.getTime()) ? `EXPORTED ${generated.toISOString().slice(0, 10)} · UTC` : 'DATED RESEARCH SNAPSHOT';
      const catalog = $('research-dataset'); catalog.replaceChildren();
      for (const item of manifest.datasets) { const option = node('option', `${item.label}${item.available ? '' : ' · unavailable in this snapshot'}`); option.value = item.id; option.disabled = !item.available; catalog.append(option); }
      const first = manifest.datasets.find(item => item.id === 'btc-usdt-4h' && item.available) || manifest.datasets.find(item => item.available);
      if (!first) throw new Error('This snapshot has no available historical candle datasets.');
      catalog.value = first.id; catalog.disabled = false;
      $('research-state').replaceChildren(node('i'), document.createTextNode(`${manifest.datasets.filter(item => item.available).length} public datasets · ${manifest.reports.length} fixed spot reports · historical snapshot`));
      drawArchives(manifest); await loadDataset(first.id);
    } catch (e) { error(e.message); $('research-state').replaceChildren(node('i'), document.createTextNode('Research files unavailable · retry when connected')); placeholder('The research snapshot is not available in this browser yet.'); }
  }
  $('research-dataset').addEventListener('change', () => loadDataset($('research-dataset').value));
  $('research-window').addEventListener('change', drawChart);
  $('research-report').addEventListener('change', () => loadReport($('research-report').value));
  $('research-retry').addEventListener('click', loadManifest);
  $('research-verify').addEventListener('click', async () => {
    const dataset = state.dataset, epoch = state.datasetEpoch; if (!dataset) return;
    $('research-verify').disabled = true; $('research-checksum-state').textContent = 'Downloading the complete CSV to verify its exact bytes…';
    try {
      if (!globalThis.crypto?.subtle) throw new Error('CSV verification needs a secure browser context. The complete file and published checksum are available for independent checking.');
      const bytes = await boundedBytes(dataset.csvUrl, state.controller.signal);
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2, '0')).join('');
      if (epoch !== state.datasetEpoch) return;
      if (digest !== dataset.sha256.toLowerCase()) throw new Error('CSV checksum mismatch. The downloaded file differs from this manifest; retry the published snapshot before relying on it.');
      $('research-checksum-state').textContent = `Verified in this browser: all ${number(bytes.length, 0)} downloaded CSV bytes match the published SHA-256.`;
      $('research-verify').textContent = 'CSV checksum verified ✓';
    } catch (e) { if (e.name !== 'AbortError' && epoch === state.datasetEpoch) { $('research-checksum-state').textContent = 'CSV verification did not complete.'; error(e.message); $('research-verify').disabled = false; } }
  });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => { if (state.rows.length && Math.abs($('research-chart').clientWidth - state.width) > 4) requestAnimationFrame(drawChart); }).observe($('research-chart'));
  loadManifest();
}

if (typeof document !== 'undefined' && document.getElementById('research-main')) bootResearch();
