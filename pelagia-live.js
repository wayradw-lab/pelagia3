(() => {
'use strict';
const q = s => document.querySelector(s), still = matchMedia('(prefers-reduced-motion:reduce)').matches;
const R = (a, b) => a + Math.random() * (b - a), cl = (n, a, b) => Math.max(a, Math.min(b, n));
const box = (cls) => { const d = document.createElement('div'); d.className = 'live-wrap ' + (cls || ''); return d; };
function cv(host, ratio) {
  const c = document.createElement('canvas'), x = c.getContext('2d'); c.className = 'live'; host.append(c);
  const f = () => { const r = devicePixelRatio || 1, w = host.clientWidth || 600; c.width = w * r; c.height = w * ratio * r; c.style.height = w * ratio + 'px'; x.setTransform(r, 0, 0, r, 0, 0); c.W = w; c.H = w * ratio; };
  f(); new ResizeObserver(f).observe(host); return [c, x];
}
const loop = (c, fn) => { let t = 0; (function f() { requestAnimationFrame(f); if (!c.offsetParent) return; t += still ? 0 : .016; fn(t, c.W, c.H); })(); };
const hideImgs = id => document.querySelectorAll(id + ' img').forEach(i => { if (!i.closest('.live-wrap')) (i.closest('figure') || i.parentElement).style.display = 'none'; });

/* ---------- 1. DEPTH DIVE (slide 3): every zone looks different ---------- */
function dive() {
  const zv = q('#zv'); if (!zv) return;
  const wrap = box(); zv.parentElement.insertBefore(wrap, zv); const [c, x] = cv(wrap, .66);
  const B = [0, 200, 1000, 4000, 6000, 11000], PAL = [[47, 163, 184], [18, 103, 130], [10, 38, 56], [6, 21, 33], [3, 13, 21], [1, 5, 10]];
  const mm = v => { const i = cl(v / 100 | 0, 0, 4); return B[i] + (B[i + 1] - B[i]) * cl(v / 100 - i, 0, 1); };
  const col = v => { const i = cl(Math.floor(v / 100), 0, 4), f = cl(v / 100 - i, 0, 1); return PAL[i].map((a, k) => a + (PAL[i + 1][k] - a) * f | 0).join(); };
  const fish = (p, y, s, co, d, gl) => { x.save(); x.translate(p, y); x.scale(d, 1); if (gl) { x.shadowColor = gl; x.shadowBlur = 14; } x.fillStyle = co; x.beginPath(); x.ellipse(0, 0, s, s * .45, 0, 0, 7); x.fill(); x.beginPath(); x.moveTo(-s * .8, 0); x.lineTo(-s * 1.5, -s * .45); x.lineTo(-s * 1.5, s * .45); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(s * .5, -s * .1, s * .1, 0, 7); x.fill(); x.restore(); };
  const D = {
    fish: (p, y, s, co, d) => fish(p, y, s, co, d),
    lantern: (p, y, s, co, d) => { fish(p, y, s, co, d, '#9ff'); x.fillStyle = '#cff'; for (let k = -1; k < 2; k++) { x.beginPath(); x.arc(p + k * s * .4 * d, y + s * .25, 2, 0, 7); x.fill(); } },
    angler: (p, y, s, co, d, t) => { fish(p, y, s, co, d); x.save(); x.shadowColor = '#ffe27a'; x.shadowBlur = 24; x.strokeStyle = '#8a7a50'; x.beginPath(); x.moveTo(p + d * s * .5, y - s * .35); x.quadraticCurveTo(p + d * s, y - s * 1.3, p + d * s * 1.3, y - s * .9); x.stroke(); x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(p + d * s * 1.3, y - s * .9, 4 + Math.sin(t * 4), 0, 7); x.fill(); x.restore(); },
    jelly: (p, y, s, co, d, t) => { x.save(); x.shadowColor = co; x.shadowBlur = 16; x.fillStyle = co; x.globalAlpha = .65; x.beginPath(); x.arc(p, y, s * (1 + Math.sin(t * 2) * .06), Math.PI, 0); x.fill(); x.globalAlpha = .8; x.strokeStyle = co; for (let k = -2; k < 3; k++) { x.beginPath(); x.moveTo(p + k * s * .35, y); x.quadraticCurveTo(p + k * s * .35 + Math.sin(t * 2 + k) * 7, y + s, p + k * s * .35, y + s * 1.8); x.stroke(); } x.restore(); },
    squid: (p, y, s, co, d, t) => { x.fillStyle = co; x.beginPath(); x.ellipse(p, y, s * .4, s, 0, 0, 7); x.fill(); x.strokeStyle = co; x.lineWidth = 2; for (let k = -2; k < 3; k++) { x.beginPath(); x.moveTo(p + k * 3, y + s); x.quadraticCurveTo(p + k * 6 + Math.sin(t * 3 + k) * 6, y + s * 1.6, p + k * 5, y + s * 2.1); x.stroke(); } x.lineWidth = 1; x.fillStyle = '#fff'; x.beginPath(); x.arc(p - 5, y + s * .8, 2, 0, 7); x.arc(p + 5, y + s * .8, 2, 0, 7); x.fill(); },
    turtle: (p, y, s, co, d, t) => { x.fillStyle = co; x.beginPath(); x.ellipse(p, y, s, s * .65, 0, 0, 7); x.fill(); x.beginPath(); x.arc(p + d * s * 1.1, y, s * .3, 0, 7); x.fill(); const f = Math.sin(t * 2) * .4; [[-.3, -1], [-.3, 1]].forEach(([a, b]) => { x.save(); x.translate(p + a * s, y + b * s * .6); x.rotate(b * (.6 + f)); x.beginPath(); x.ellipse(0, b * s * .5, s * .22, s * .6, 0, 0, 7); x.fill(); x.restore(); }); },
    blob: (p, y, s, co) => { x.fillStyle = co; x.beginPath(); x.ellipse(p, y, s, s * .38, 0, 0, 7); x.fill(); x.fillStyle = '#0003'; for (let k = -2; k < 3; k++) { x.beginPath(); x.arc(p + k * s * .35, y - s * .1, 2, 0, 7); x.fill(); } },
    amph: (p, y, s, co) => { x.strokeStyle = co; x.lineWidth = s * .5; x.lineCap = 'round'; x.beginPath(); x.arc(p, y, s, .4, Math.PI * 1.4); x.stroke(); x.lineWidth = 1; }
  };
  const L = [[18, .15, 'fish', 9, '#ffd166', 'Tuna'], [26, .55, 'fish', 7, '#ffd166', ''], [40, .4, 'turtle', 22, '#7bb36b', 'Sea turtle'], [72, .8, 'fish', 16, '#aebfc9', 'Dolphin'],
    [118, .3, 'lantern', 10, '#7fb7c9', 'Lanternfish'], [140, .75, 'lantern', 9, '#7fb7c9', ''], [172, .5, 'squid', 15, '#e07a7a', 'Squid'],
    [232, .38, 'angler', 22, '#3b2f3f', 'Anglerfish · glowing lure'], [262, .78, 'jelly', 16, '#a58bff', 'Deep jelly'], [285, .2, 'squid', 22, '#b04a4a', 'Giant squid'],
    [330, .3, 'blob', 18, '#c98a6b', 'Sea cucumber'], [368, .72, 'fish', 14, '#e8c9d6', 'Abyssal fish'], [350, .55, 'jelly', 12, '#8fd6c8', 'Ghost jelly'],
    [432, .35, 'amph', 11, '#f0b38a', 'Amphipod'], [462, .7, 'fish', 13, '#f4dede', 'Hadal snailfish']];
  const snow = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), s: R(.4, 1.2) }));
  let v = 50, tv = 50; const oz = window.zone; window.zone = i => { oz(i); tv = i * 100 + 50; };
  const ZN = ['SUNLIGHT ZONE', 'TWILIGHT ZONE', 'MIDNIGHT ZONE', 'ABYSSAL ZONE', 'HADAL ZONE'];
  loop(c, (t, W, H) => {
    v += (tv - v) * (still ? 1 : .03); const m = mm(v), ppv = H / 120;
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, `rgb(${col(v - 55)})`); g.addColorStop(1, `rgb(${col(v + 55)})`); x.fillStyle = g; x.fillRect(0, 0, W, H);
    const ra = Math.max(0, 1 - m / 350) * .16; if (ra > .005) for (let i = 0; i < 6; i++) { const bx = W * (.1 + i * .17) + Math.sin(t * .4 + i) * 30; x.fillStyle = `rgba(255,255,255,${ra})`; x.beginPath(); x.moveTo(bx, 0); x.lineTo(bx + 50, 0); x.lineTo(bx - 60 + Math.sin(t + i) * 20, H); x.lineTo(bx - 130, H); x.fill(); }
    const fy = H / 2 + (495 - v) * ppv; if (fy < H) { x.fillStyle = '#0b1b24'; x.beginPath(); x.moveTo(0, H); for (let i = 0; i <= 20; i++) x.lineTo(W * i / 20, fy + Math.sin(i * 1.7) * 8); x.lineTo(W, H); x.fill(); }
    x.fillStyle = 'rgba(220,240,245,.55)'; snow.forEach(p => { const yy = ((p.y * H + t * 14 * p.s - v * ppv * p.s * .6) % H + H) % H; x.beginPath(); x.arc(p.x * W + Math.sin(t + p.y * 9) * 4, yy, 1.4 * p.s, 0, 7); x.fill(); });
    x.font = '600 11px system-ui'; x.textAlign = 'center';
    L.forEach(([cv_, fx, k, s, co, n], i) => {
      const py = H / 2 + (cv_ - v) * ppv; if (py < -60 || py > H + 60) return; const sc = W / 640, d = i % 2 ? -1 : 1, px = ((fx * W + t * 14 * d * (1 + i % 3 * .3) + W * 9) % (W + 160)) - 80, ss = s * sc;
      x.save(); x.globalAlpha = cl(1 - Math.abs(py - H / 2) / (H * .7), .25, 1); D[k](px, py + Math.sin(t + i) * 5, ss, co, d, t); x.restore();
      if (n && Math.abs(py - H / 2) < H * .4) { x.fillStyle = 'rgba(255,255,255,.85)'; x.fillText(n, px, py + ss * 2.3 + 12); }
    });
    x.save(); x.translate(W / 2, H / 2 + Math.sin(t * 1.6) * 4); const sc = Math.max(.7, W / 700) * 1.1; x.scale(sc, sc);
    const ba = .12 + Math.min(.4, m / 6000), bg = x.createLinearGradient(34, 0, 200, 0); bg.addColorStop(0, `rgba(255,240,180,${ba})`); bg.addColorStop(1, 'rgba(255,240,180,0)'); x.fillStyle = bg; x.beginPath(); x.moveTo(34, 0); x.lineTo(200, -55); x.lineTo(200, 55); x.fill();
    x.fillStyle = '#ffc93c'; x.beginPath(); x.ellipse(0, 0, 38, 17, 0, 0, 7); x.fill(); x.fillRect(-8, -27, 16, 12); x.fillRect(-1, -36, 3, 10); x.fillStyle = '#0a2e45'; x.beginPath(); x.arc(14, -2, 7, 0, 7); x.fill(); x.strokeStyle = '#fff8'; x.stroke();
    x.save(); x.translate(-40, 0); x.rotate(t * 14); x.fillStyle = '#c9971f'; x.fillRect(-2, -11, 4, 22); x.restore(); x.restore();
    const info = [['DEPTH', Math.round(m).toLocaleString() + ' m'], ['PRESSURE', '≈ ' + Math.round(m / 10 + 1).toLocaleString() + ' atm'], ['WATER TEMP', '≈ ' + Math.max(2, Math.round(26 - m / 40)) + ' °C'], ['LIGHT', m < 250 ? Math.max(.1, 100 * Math.exp(-m / 45)).toFixed(1) + '%' : 'none']];
    x.fillStyle = 'rgba(3,13,21,.62)'; x.fillRect(10, 10, 150, 86); x.textAlign = 'left'; info.forEach(([a, b], i) => { x.fillStyle = '#45c6c0'; x.font = '700 9px system-ui'; x.fillText(a, 18, 28 + i * 20); x.fillStyle = '#fff'; x.font = '600 13px system-ui'; x.fillText(b, 88, 28 + i * 20); });
    x.textAlign = 'right'; x.fillStyle = 'rgba(3,13,21,.62)'; x.fillRect(W - 150, 10, 140, 26); x.fillStyle = '#b8e5de'; x.font = '700 11px system-ui'; x.fillText(ZN[cl(v / 100 | 0, 0, 4)], W - 18, 27);
  });
}

/* ---------- 2. OCEAN CURRENTS MAP (slide 6) ---------- */
function currents() {
  const svg = q('#s5 svg'); if (!svg) return; const wrap = box(); svg.style.display = 'none'; svg.parentElement.insertBefore(wrap, svg); const [c, x] = cv(wrap, .56);
  const LAND = [[[.06, .12], [.2, .08], [.3, .14], [.28, .3], [.22, .4], [.16, .36], [.1, .26]], [[.22, .46], [.3, .46], [.33, .6], [.28, .8], [.24, .7]], [[.44, .12], [.54, .1], [.58, .2], [.5, .26], [.45, .22]], [[.46, .3], [.56, .3], [.6, .48], [.54, .7], [.48, .58]], [[.58, .1], [.8, .08], [.9, .2], [.84, .36], [.7, .4], [.62, .3]], [[.78, .58], [.88, .58], [.9, .7], [.8, .72]], [[.1, .91], [.9, .91], [.9, 1], [.1, 1]]];
  const P = [['Gulf Stream', 'warm', [[.25, .46], [.31, .36], [.35, .25], [.43, .17], [.49, .1]]], ['Kuroshio', 'warm', [[.9, .46], [.92, .36], [.95, .24], [.98, .16]]], ['Equatorial', 'warm', [[.56, .52], [.44, .53], [.35, .52], [.26, .5]]], ['Equatorial', 'warm', [[.95, .53], [.85, .52], [.75, .53], [.65, .52]]],
    ['Humboldt', 'cold', [[.17, .82], [.16, .68], [.15, .54]]], ['Canary', 'cold', [[.43, .26], [.42, .38], [.44, .5]]], ['Labrador', 'cold', [[.32, .08], [.31, .2], [.28, .3]]], ['Antarctic Circumpolar', 'cold', [[.02, .86], [.3, .88], [.55, .88], [.8, .88], [.98, .86]]],
    ['Deep conveyor belt', 'deep', [[.48, .12], [.4, .4], [.37, .7], [.5, .84], [.75, .8], [.9, .58], [.88, .38]]]];
  const at = (pts, u) => { const n = pts.length - 1, f = u * n, i = Math.min(n - 1, f | 0), k = f - i, a = pts[i], b = pts[i + 1]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; };
  const CO = { warm: '255,154,92', cold: '92,214,255', deep: '69,198,192' }, MODES = { Wind: { warm: 1, cold: 1, deep: 0 }, Temperature: { warm: 1, cold: 1, deep: 0 }, Salinity: { warm: .3, cold: .3, deep: 0 }, Density: { warm: .25, cold: .25, deep: 1 } };
  let mode = 'Wind'; document.querySelectorAll('#cl button').forEach(b => b.addEventListener('click', () => mode = b.textContent.trim())); const fl = P.map(p => Array.from({ length: 34 }, () => Math.random()));
  loop(c, (t, W, H) => {
    const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0d4a66'); bg.addColorStop(1, '#06202f'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    const m = MODES[mode] || MODES.Wind, X = p => [p[0] * W, p[1] * H];
    if (mode == 'Salinity') [[.4, .4, 'Saltier ↑ evaporation', '255,230,160'], [.5, .06, 'Fresher · melting ice', '160,230,255'], [.8, .55, 'Fresher · monsoon rain', '160,230,255']].forEach(([a, b, n, k]) => { const r = x.createRadialGradient(a * W, b * H, 0, a * W, b * H, W * .16); r.addColorStop(0, `rgba(${k},.4)`); r.addColorStop(1, `rgba(${k},0)`); x.fillStyle = r; x.fillRect(0, 0, W, H); x.fillStyle = '#fff'; x.font = '600 11px system-ui'; x.textAlign = 'center'; x.fillText(n, a * W, b * H); });
    x.fillStyle = '#3e6b6b'; LAND.forEach(l => { x.beginPath(); l.forEach((p, i) => x[i ? 'lineTo' : 'moveTo'](...X(p))); x.closePath(); x.fill(); });
    if (mode == 'Wind') { x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 1.5;[[.34, 1], [.5, -1], [.7, 1]].forEach(([y, d]) => { for (let i = 0; i < 9; i++) { const px = ((i / 9 + t * .02 * d) % 1 + 1) % 1 * W, py = y * H; x.beginPath(); x.moveTo(px - 7 * d, py - 5); x.lineTo(px, py); x.lineTo(px - 7 * d, py + 5); x.stroke(); } }); x.fillStyle = 'rgba(255,255,255,.7)'; x.font = '600 10px system-ui'; x.textAlign = 'left'; x.fillText('Westerlies →', 8, H * .34 - 8); x.fillText('← Trade winds', 8, H * .5 - 8); x.fillText('Westerlies →', 8, H * .7 - 8); }
    P.forEach(([n, k, pts], pi) => {
      const a = m[k]; if (!a) return; x.strokeStyle = `rgba(${CO[k]},${.18 * a})`; x.lineWidth = k == 'deep' ? 5 : 8; x.lineCap = 'round'; x.setLineDash(k == 'deep' ? [8, 8] : []); x.beginPath(); pts.forEach((p, i) => x[i ? 'lineTo' : 'moveTo'](...X(p))); x.stroke(); x.setLineDash([]);
      fl[pi].forEach((o, i) => { for (let tr = 0; tr < 6; tr++) { const u = ((o + t * .09 - tr * .006) % 1 + 1) % 1, [px, py] = X(at(pts, u)); x.fillStyle = `rgba(${CO[k]},${a * (1 - tr / 6) * .9})`; x.beginPath(); x.arc(px, py, 2.6 - tr * .3, 0, 7); x.fill(); } });
      if (a > .5) { const [lx, ly] = X(at(pts, .5)); x.fillStyle = '#fff'; x.font = '700 11px system-ui'; x.textAlign = 'center'; x.strokeStyle = '#03131c'; x.lineWidth = 3; x.strokeText(n, lx, ly - 10); x.fillText(n, lx, ly - 10); }
    });
    if (mode == 'Density') [[.48, .12, 'Cold, salty water SINKS'], [.3, .88, 'Sinks near Antarctica']].forEach(([a, b, n]) => { const px = a * W, py = b * H + Math.sin(t * 3) * 3; x.fillStyle = '#fff'; x.beginPath(); x.moveTo(px - 7, py); x.lineTo(px + 7, py); x.lineTo(px, py + 12); x.fill(); x.font = '700 11px system-ui'; x.textAlign = 'center'; x.fillText(n, px, py - 8); });
    x.fillStyle = 'rgba(3,13,21,.65)'; x.fillRect(W - 168, H - 62, 158, 52); x.font = '600 10px system-ui'; x.textAlign = 'left'; [['warm', 'Warm surface current'], ['cold', 'Cold surface current'], ['deep', 'Deep return flow']].forEach(([k, n], i) => { x.fillStyle = `rgb(${CO[k]})`; x.fillRect(W - 160, H - 54 + i * 15, 14, 5); x.fillStyle = '#fff'; x.fillText(n, W - 140, H - 49 + i * 15); });
  });
}

/* ---------- 3. CONNECTION WEB (slide 9) ---------- */
function web() {
  const h = q('#s8 h2'); if (!h) return; const wrap = box(); h.insertAdjacentElement('afterend', wrap); const [c, x] = cv(wrap, .4);
  wrap.insertAdjacentHTML('afterbegin', '<p class="webhint">The ocean is linked to everything. This diagram plays by itself, one link at a time. Click any circle to take control.</p>'); const cap = document.createElement('div'); cap.className = 'g webcap'; cap.innerHTML = 'Click a glowing node to see how it connects to the ocean.'; wrap.append(cap);
  const N = [['Ocean basins', 1, 'Five basins form one connected ocean that stores heat and water.'], ['Water cycle', 4, 'Evaporation from the ocean makes clouds; rain and rivers return water to it.'], ['Currents', 5, 'Currents carry heat and nutrients around the planet.'], ['Marine life', 3, 'Phytoplankton and food webs depend on light, nutrients and temperature.'], ['People & climate', 7, 'The ocean regulates climate, and our choices affect its health.'], ['Atmosphere', 4, 'The ocean and air trade heat, moisture and gases.'], ['Land & rivers', 4, 'Runoff and groundwater carry fresh water and nutrients to the sea.']];
  const EL = ['one connected sea', 'evaporation & rain', 'carry heat around', 'feeds food webs', 'shapes our climate', 'swaps heat & gas', 'rivers bring water back'];
  const pos = N.map((n, i) => { const a = i / N.length * 6.283 - 1.57; return [.5 + .36 * Math.cos(a) * .95, .5 + .36 * Math.sin(a)]; }); let sel = -1, hov = -1, mx = 0, my = 0;
  const pick = e => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; return pos.findIndex(p => Math.hypot(p[0] * c.W - mx, p[1] * c.H - my) < 34); };
  c.onmousemove = e => { hov = pick(e); c.style.cursor = hov > -1 ? 'pointer' : 'default'; }; const show = i => { sel = i; cap.innerHTML = `<b>${N[i][0]}</b> — ${N[i][2]} <button class="on" style="margin-left:10px" onclick="go(${N[i][1]})">Visit slide ›</button>`; }; let user = 0; c.onclick = e => { const i = pick(e); if (i < 0) return; user = 1; show(i); };
  loop(c, (t, W, H) => {
    if (!user) { const i = Math.floor(t / 4.5) % N.length; if (i !== sel) show(i); }
    const g = x.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W * .55); g.addColorStop(0, '#0f4a63'); g.addColorStop(1, '#04111d'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    pos.forEach((p, i) => { const q2 = pos[(i + 1) % pos.length], on = i == sel; x.strokeStyle = on ? 'rgba(184,229,222,.9)' : 'rgba(69,198,192,.3)'; x.lineWidth = on ? 2.5 : 1; x.beginPath(); x.moveTo(W / 2, H / 2); x.lineTo(p[0] * W, p[1] * H); x.stroke(); x.font = '600 11px system-ui'; x.textAlign = 'center'; x.strokeStyle = '#03131c'; x.lineWidth = 3; x.fillStyle = on ? '#fff' : '#bfe3df'; const lx = (W / 2 + p[0] * W) / 2, ly = (H / 2 + p[1] * H) / 2 - 6; x.strokeText(EL[i], lx, ly); x.fillText(EL[i], lx, ly); x.lineWidth = 1; x.strokeStyle = 'rgba(69,198,192,.12)'; x.beginPath(); x.moveTo(p[0] * W, p[1] * H); x.lineTo(q2[0] * W, q2[1] * H); x.stroke(); for (let k = 0; k < 2; k++) { const u = ((t * .25 + i * .13 + k * .5) % 1); x.fillStyle = '#b8e5de'; x.beginPath(); x.arc(W / 2 + (p[0] * W - W / 2) * u, H / 2 + (p[1] * H - H / 2) * u, 3, 0, 7); x.fill(); } });
    x.save(); x.shadowColor = '#45c6c0'; x.shadowBlur = 30 + Math.sin(t * 2) * 8; x.fillStyle = '#126782'; x.beginPath(); x.arc(W / 2, H / 2, 44, 0, 7); x.fill(); x.restore(); x.fillStyle = '#fff'; x.font = '700 15px Georgia,serif'; x.textAlign = 'center'; x.fillText('THE OCEAN', W / 2, H / 2 + 5);
    pos.forEach((p, i) => { const px = p[0] * W, py = p[1] * H + Math.sin(t * 1.4 + i) * 4, on = i == sel || i == hov; x.save(); x.shadowColor = '#45c6c0'; x.shadowBlur = on ? 28 : 12; x.fillStyle = on ? '#b8e5de' : '#1b7f95'; x.beginPath(); x.arc(px, py, on ? 30 : 26, 0, 7); x.fill(); x.restore(); x.fillStyle = on ? '#04111d' : '#fff'; x.font = '700 14px system-ui'; x.fillText(String(i + 1).padStart(2, '0'), px, py + 5); x.fillStyle = '#fff'; x.font = '600 13px system-ui'; x.fillText(N[i][0], px, py + 46); });
  });
}

/* ---------- 4. TEAM AVATARS ---------- */
function team() { const E = ['🐋', '🐢', '🐬', '🐙', '🦑', '🐠']; document.querySelectorAll('#s10 .em>div').forEach((d, i) => { const a = document.createElement('span'); a.className = 'av'; a.textContent = E[i % 6]; d.prepend(a); }); }

/* ---------- 5. QUIZ: descent meter, big icons, bubble bursts ---------- */
function quiz() {
  const IC = { s2: '🌍', s3: '🔦', s4: '🐙', s5: '☁️', s6: '✨', s7: '🦠' };
  const burst = (el, n = 22) => { const r = (el || document.body).getBoundingClientRect(), o = document.createElement('div'); o.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + 10}px;z-index:999;pointer-events:none`; document.body.append(o);
    for (let i = 0; i < n; i++) { const b = document.createElement('i'); b.style.cssText = `position:absolute;width:${R(8, 18)}px;height:${R(8, 18)}px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,#45c6c0 60%,#126782);opacity:.9`; o.append(b); b.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${R(-160, 160)}px,${R(-200, -40)}px) scale(.3)`, opacity: 0 }], { duration: R(800, 1500), easing: 'cubic-bezier(.2,.8,.3,1)' }); } setTimeout(() => o.remove(), 1700); };
  const sq = window.showQ; window.showQ = () => { sq(); const by = q('#s11 .by'), m = Math.round(qi / 14 * 11000); if (by) by.insertAdjacentHTML('afterend', `<div class="track"><div class="tk">${Array.from({ length: 14 }, (_, i) => `<b class="${i <= qi ? 'd' : ''}"></b>`).join('')}<i style="left:calc(${qi / 13 * 100}% - 14px)">🤿</i></div><span>Depth reached: ${m.toLocaleString()} m</span></div>`); const h = q('#s11 .g h2'); if (h) h.insertAdjacentHTML('afterbegin', `<span class="qe">${IC[Q[qi][4]] || '🌊'}</span>`); };
  const ca = window.confirmA; window.confirmA = () => { const b = score; ca(); if (score > b) burst(q('#fb'), 26); else q('#s11 .g')?.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 350 }); };
  const rs = window.results; window.results = () => { rs(); setTimeout(() => burst(q('#s11 .ring'), score >= 11 ? 60 : 24), 400); };
}

function init() { dive(); currents(); web(); (q('#s8') || document).querySelectorAll('section').forEach(e => { if (/Everything is connected/i.test(e.textContent)) e.style.display = 'none'; }); document.querySelectorAll('#s8 > .g svg').forEach(v => v.style.display = 'none'); team(); quiz(); ['#s2', '#s4', '#s5'].forEach(hideImgs); setTimeout(() => ['#s2', '#s4', '#s5'].forEach(hideImgs), 1200); }
addEventListener('load', () => setTimeout(init, 400));
})();
