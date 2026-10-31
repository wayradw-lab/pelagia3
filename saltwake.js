(() => {
'use strict';
const $ = s => document.querySelector(s), mix = (a, b, t) => a + (b - a) * t, cl = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const io = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2, out = k => 1 - Math.pow(1 - k, 3);
const still = matchMedia('(prefers-reduced-motion:reduce)').matches, NS = 'http://www.w3.org/2000/svg';
/* hand-drawn wave layers (values from the Saltwake spec, recoloured blue) */
const LY = [{ dy: -100, a: 20, k: 1.5, v: .9, ph: 0, f: '#126782' }, { dy: -52, a: 23, k: 1.9, v: 1.15, ph: 1.7, f: '#0f5a75' }, { dy: 0, a: 25, k: 1.7, v: 1.3, ph: 3.1, f: '#0c4a64' },
  { dy: 26, a: 18, k: 2.4, v: 1, ph: 4.4, sp: [.06, .44] }, { dy: 48, a: 22, k: 1.45, v: 1.4, ph: .6, f: '#093a52' }, { dy: 76, a: 15, k: 2.1, v: 1.2, ph: 5.1, sp: [.52, .97] },
  { dy: 104, a: 24, k: 1.8, v: 1.25, ph: 2.2, f: '#072c40' }, { dy: 130, a: 14, k: 2.7, v: 1, ph: 1.1, sp: [0, .62] }, { dy: 158, a: 20, k: 1.6, v: 1.1, ph: 3.8, f: '#04111d' }];
const svg = document.createElementNS(NS, 'svg'); svg.id = 'sw'; svg.setAttribute('aria-hidden', 'true'); document.body.prepend(svg);
const ps = LY.map(l => { const p = document.createElementNS(NS, 'path'); p.setAttribute('fill', l.f || 'none'); svg.append(p); return p; });
let lvl = -.2, W = innerWidth, H = innerHeight, sc = 1; const rest = () => -.2;
const size = () => { W = innerWidth; H = innerHeight; sc = cl(W / 1600, .6, 1.3); }; size(); addEventListener('resize', size);
const yAt = (l, x, t) => { const a = l.a * sc, f = 6.2832 / (1100 * sc) * l.k; return H * (1 - lvl) + l.dy * sc + a * Math.sin(f * x + t * l.v + l.ph) + a * .45 * Math.sin(f * 2.3 * x - t * l.v * .7 + l.ph * 1.7); };
/* sea rises over the slide, the slide swaps at the peak, the sea falls back */
const og = window.go; let busy = 0, pend = null;
window.go = i => {
  const to = cl(i, 0, 11); if (busy) { pend = to; return; } if (to == cur) return;
  busy = 1; svg.classList.add('up'); const l0 = lvl, T0 = performance.now(), UP = still ? 1 : 850, DN = still ? 1 : 1250; let sw = 0;
  (function f(n) { const k = n - T0;
    if (k < UP) lvl = mix(l0, 1.15, io(k / UP)); else { if (!sw) { sw = 1; og(to); } lvl = mix(1.15, rest(to), io(cl((k - UP) / DN))); }
    if (k < UP + DN) requestAnimationFrame(f); else { lvl = rest(to); busy = 0; svg.classList.remove('up'); if (pend != null) { const p = pend; pend = null; window.go(p); } } })(T0);
};
/* drifting frond-light shade */
const sh = document.createElement('canvas'); sh.id = 'shade'; sh.width = 64; sh.height = 36; const g = sh.getContext('2d'); g.scale(.5, .5); g.strokeStyle = 'rgba(184,229,222,.95)'; g.lineCap = 'round';
[[-10, 26, 38, -8, 8], [-8, 46, 58, -2, 5], [-10, 62, 74, 6, 4], [14, 78, 96, 16, 4], [40, 82, 118, 22, 3], [78, 80, 140, 34, 5], [-12, 74, 22, 56, 6]].forEach(([a, b, c, d, w]) => { g.lineWidth = w; g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo((a + c) / 2 + 6, (b + d) / 2 + 8, c, d); g.stroke(); }); document.body.append(sh);
/* ring cursor */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches; let cu, pg, mx = -100, my = -100, cx = -100, cy = -100, cs = 1, ts = 1, dn = 0, pT = -1, pX = 0, pY = 0;
if (fine) { document.documentElement.classList.add('fine'); cu = document.createElement('div'); cu.id = 'cur'; pg = document.createElement('div'); pg.id = 'ping'; document.body.append(pg, cu);
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; ts = dn ? .7 : (e.target.closest && e.target.closest('a,button,summary,[role=button]') ? 1.35 : 1); });
  addEventListener('pointerdown', e => { dn = 1; ts = .7; pT = performance.now(); pX = e.clientX; pY = e.clientY; }); addEventListener('pointerup', () => { dn = 0; ts = 1; }); }
let last = performance.now(), t = 0;
(function render(now) {
  requestAnimationFrame(render); const dt = Math.min(.05, (now - last) / 1000); last = now; t = still ? 0 : now / 1000;
  if (lvl > -.12) { svg.style.display = ''; ps.forEach((p, i) => { const l = LY[i], a = l.sp ? W * l.sp[0] : -20, b = l.sp ? W * l.sp[1] : W + 20; let d = ''; for (let x = a; x <= b + .1; x += 22 * sc) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + yAt(l, x, t).toFixed(1); if (l.f) d += `L${W + 20} ${H + 400}L-20 ${H + 400}Z`; p.setAttribute('d', d); }); } else svg.style.display = 'none';
  sh.style.transform = `translate(${Math.sin(t * .35) * 2.2}%,${Math.cos(t * .27) * 1.6}%) rotate(${Math.sin(t * .22) * .8}deg)`;
  if (fine) { const f = 1 - Math.exp(-dt * 22); cx += (mx - cx) * f; cy += (my - cy) * f; cs += (ts - cs) * f; cu.style.transform = `translate(${cx}px,${cy}px) scale(${cs})`;
    if (pT > 0) { const k = cl((now - pT) / 650); pg.style.transform = `translate(${pX}px,${pY}px) scale(${1 + out(k) * 1.9})`; pg.style.opacity = 1 - k; if (k >= 1) pT = -1; } }
})(last);
/* overview: numbered cards, current slide highlighted */
const bv = $('#bgv'); if (bv) { if (still) bv.pause(); else bv.play().catch(() => {}); }
const dg = $('#dg'); if (dg) new MutationObserver(() => dg.querySelectorAll('[data-g]:not([data-x])').forEach(b => { b.dataset.x = 1; const m = b.textContent.match(/^(\d\d) (.*)$/); if (m) b.innerHTML = `<small>${m[1]}</small><span>${m[2]}</span>`; if (+b.dataset.g == cur) b.classList.add('cur'); })).observe(dg, { childList: true });
})();
