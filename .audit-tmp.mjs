import { chromium, webkit } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE = 'http://127.0.0.1:4173';
const SHOTS = process.argv[2] || '/tmp/shots';
fs.mkdirSync(SHOTS, { recursive: true });

const ROUTES = [
  '/', '/sicc', '/solucoes', '/institucional', '/fornecedor',
  '/cadastro', '/contato', '/noticias', '/trabalhe-conosco',
  '/rota-que-nao-existe',
];

const DEVICES = [
  {
    key: 'iphone13',
    browserType: webkit,
    contextOpts: {
      viewport: { width: 390, height: 664 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
  },
  {
    key: 'galaxyS9',
    browserType: chromium,
    contextOpts: {
      viewport: { width: 360, height: 740 },
      userAgent: 'Mozilla/5.0 (Linux; Android 9; SM-G965F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
    },
  },
];

// --- injected audit function, run in-page ---
async function scanPage(page, ctx) {
  const findings = [];

  // 1. horizontal overflow
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const docOverflow = doc.scrollWidth - doc.clientWidth;
    const bodyOverflow = body.scrollWidth - body.clientWidth;
    let worstEl = null;
    let worstAmount = 0;
    if (docOverflow > 1 || bodyOverflow > 1) {
      // find offending elements: any element whose right edge exceeds clientWidth
      const all = document.querySelectorAll('body *');
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.right - doc.clientWidth > worstAmount && r.width > 0) {
          worstAmount = r.right - doc.clientWidth;
          worstEl = el;
        }
      }
    }
    const describe = (el) => el ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).join('.') : ''}` : null;
    return {
      docOverflow, bodyOverflow,
      worstOffender: describe(worstEl),
      worstAmount,
    };
  });
  if (overflow.docOverflow > 1 || overflow.bodyOverflow > 1) {
    findings.push({ type: 'horizontal-overflow', ...overflow });
  }

  // 2. touch targets < 44px for interactive elements
  const smallTargets = await page.evaluate(() => {
    const sel = 'a[href], button, [role="button"], [role="tab"], input, select, textarea, summary';
    const els = Array.from(document.querySelectorAll(sel));
    const out = [];
    for (const el of els) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.width < 44 || r.height < 44) {
        const describe = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).join('.') : ''}`;
        out.push({ el: describe, w: Math.round(r.width), h: Math.round(r.height), text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40), top: Math.round(r.top + window.scrollY) });
      }
    }
    return out;
  });
  for (const t of smallTargets) findings.push({ type: 'small-touch-target', ...t });

  // 3. text overflow inside buttons/pills/chips/cards (scrollWidth > clientWidth on non-scrollable containers)
  const textOverflow = await page.evaluate(() => {
    const sel = '.btn, .tab, .chip, .pill, .card, .tag, .badge, .faq-q, .video-ponto, .nav-links a, nav a';
    const els = Array.from(document.querySelectorAll(sel));
    const out = [];
    for (const el of els) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none') continue;
      if (el.scrollWidth - el.clientWidth > 2) {
        const describe = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).join('.') : ''}`;
        out.push({ el: describe, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, text: (el.textContent || '').trim().slice(0, 60) });
      }
    }
    return out;
  });
  for (const t of textOverflow) findings.push({ type: 'text-overflow', ...t });

  // 4. contrast check (rough) for visible text nodes
  const contrastIssues = await page.evaluate(() => {
    function parseColor(str) {
      const m = str.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(',').map(s => parseFloat(s.trim()));
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    }
    function luminance({ r, g, b }) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
    function contrastRatio(fg, bg) {
      const L1 = luminance(fg) + 0.05;
      const L2 = luminance(bg) + 0.05;
      return L1 > L2 ? L1 / L2 : L2 / L1;
    }
    function effectiveBg(el) {
      let node = el;
      while (node) {
        const cs = getComputedStyle(node);
        const bg = parseColor(cs.backgroundColor);
        if (bg && bg.a > 0.5) return bg;
        node = node.parentElement;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    }
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const cs = getComputedStyle(p);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return NodeFilter.FILTER_REJECT;
        const r = p.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    const seen = new Set();
    while ((node = walker.nextNode())) {
      const p = node.parentElement;
      if (seen.has(p)) continue;
      seen.add(p);
      const cs = getComputedStyle(p);
      const fg = parseColor(cs.color);
      if (!fg) continue;
      const bg = effectiveBg(p);
      const ratio = contrastRatio(fg, bg);
      const fontSize = parseFloat(cs.fontSize);
      const bold = parseInt(cs.fontWeight) >= 700;
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && bold);
      const threshold = isLarge ? 3 : 4.5;
      if (ratio < threshold) {
        const describe = `${p.tagName.toLowerCase()}${p.id ? '#' + p.id : ''}${p.className && typeof p.className === 'string' ? '.' + p.className.split(' ').filter(Boolean).join('.') : ''}`;
        out.push({ el: describe, ratio: Math.round(ratio * 100) / 100, threshold, text: node.nodeValue.trim().slice(0, 40), fontSize, color: cs.color, bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})` });
      }
    }
    return out;
  });
  for (const c of contrastIssues) findings.push({ type: 'low-contrast', ...c });

  return findings;
}

async function scrollAndCheckOpacity(page) {
  // Scroll the whole page in small steps with generous settle time so every
  // whileInView animation gets a chance to fire and finish. Then flag any
  // element whose bottom edge has fully scrolled above the viewport (the
  // scroll has "passed by" it) but whose computed opacity is still < 0.9 —
  // that is the exact "stuck invisible section" symptom.
  const stuck = await page.evaluate(async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const total = document.documentElement.scrollHeight;
    const step = Math.max(150, Math.floor(window.innerHeight * 0.45));
    const results = [];
    const seen = new Set();
    const describe = (el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).join('.') : ''}`;

    const scanPassed = () => {
      const all = document.querySelectorAll('body *');
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // fully scrolled above the viewport already (rolagem passou por ele)
        if (r.bottom >= -20) continue;
        const cs = getComputedStyle(el);
        const op = parseFloat(cs.opacity);
        if (Number.isNaN(op) || op >= 0.9) continue;
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const key = describe(el) + '|' + (el.textContent || '').trim().slice(0, 30);
        if (seen.has(key)) continue;
        seen.add(key);
        results.push({ el: describe(el), opacity: op, text: (el.textContent || '').trim().slice(0, 50) });
      }
    };

    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await sleep(650);
      scanPassed();
    }
    // settle at the very bottom, then a final pass
    window.scrollTo(0, total);
    await sleep(1200);
    scanPassed();
    window.scrollTo(0, 0);
    await sleep(200);
    return results;
  });
  return stuck;
}

async function run() {
  const report = {};
  for (const dev of DEVICES) {
    const browser = await dev.browserType.launch();
    const context = await browser.newContext(dev.contextOpts);
    const page = await context.newPage();
    report[dev.key] = {};

    for (const route of ROUTES) {
      const routeKey = route === '/' ? 'home' : route.replace(/\//g, '_');
      const consoleErrors = [];
      page.removeAllListeners('console');
      page.removeAllListeners('pageerror');
      page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
      page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));

      let navError = null;
      try {
        const resp = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
        report[dev.key][routeKey] = { status: resp ? resp.status() : null };
      } catch (e) {
        navError = String(e);
        report[dev.key][routeKey] = { status: null, navError };
        continue;
      }
      await page.waitForTimeout(400);

      const opacityStuck = await scrollAndCheckOpacity(page);
      const findings = await scanPage(page, { device: dev.key, route });

      report[dev.key][routeKey].opacityStuck = opacityStuck;
      report[dev.key][routeKey].findings = findings;
      report[dev.key][routeKey].consoleErrors = [...new Set(consoleErrors)].filter(e => !/recaptcha|gstatic|googleapis|_vercel|ERR_BLOCKED|Failed to load resource/i.test(e));

      // full page screenshot for evidence
      const shotPath = path.join(SHOTS, `${dev.key}${routeKey}.png`);
      try {
        await page.screenshot({ path: shotPath, fullPage: true, timeout: 15000 });
        report[dev.key][routeKey].screenshot = shotPath;
      } catch (e) {
        report[dev.key][routeKey].screenshotError = String(e);
      }
    }

    await context.close();
    await browser.close();
  }

  fs.writeFileSync(path.join(SHOTS, 'report.json'), JSON.stringify(report, null, 2));
  console.log('DONE');
}

run().catch(e => { console.error(e); process.exit(1); });
