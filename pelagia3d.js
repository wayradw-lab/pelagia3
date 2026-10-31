import * as THREE from '../vendor/three.module.min.js';
/* PELAGIA 3D water cycle: real WebGL model, drag to orbit, synced with the step buttons. */
const NAMES = ['Evaporation', 'Transpiration', 'Condensation', 'Precipitation', 'Runoff', 'Infiltration'];
const COLORS = [0xcdf3ff, 0xa6ffb8, 0xffffff, 0x72c8ff, 0x55b8ff, 0x3a98e0];
const rnd = (a, b) => a + Math.random() * (b - a), lerp = (a, b, t) => a + (b - a) * t;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

function dot() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, '#fff'); r.addColorStop(.4, 'rgba(255,255,255,.7)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
}

function build(host) {
  const w = () => host.clientWidth, h = () => host.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(w(), h()); host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a2e45); scene.fog = new THREE.Fog(0x0a2e45, 16, 34);
  const cam = new THREE.PerspectiveCamera(50, w() / h(), .1, 80);
  const world = new THREE.Group(); scene.add(world);
  scene.add(new THREE.HemisphereLight(0xcfeaff, 0x1b3b4a, .9));
  const sunL = new THREE.DirectionalLight(0xfff0c8, 1.6); sunL.position.set(7, 8, 5); scene.add(sunL);

  const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .8, ...o });
  const box = (x0, x1, y0, y1, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, z), m); b.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0); world.add(b); return b; };
  box(-8, 8, -2.4, -1.8, 5, std(0xd9c28f));                                  // seabed
  box(-8, 0, -1.8, 0, 5, std(0x0f6f90, { transparent: true, opacity: .55, roughness: .2 })); // ocean body
  box(0, 8, -0.8, 0.2, 5, std(0x5b4331));                                    // soil
  box(0, 8, -1.8, -0.8, 5, std(0x2a7fb5, { transparent: true, opacity: .6 })); // groundwater
  box(0, 8, 0.2, 0.32, 5, std(0x3f8f4e));                                    // grass
  // ocean surface with live waves
  const sg = new THREE.PlaneGeometry(8, 5, 56, 28), sm = std(0x2aa4c8, { roughness: .18, metalness: .15, transparent: true, opacity: .92 });
  const sea = new THREE.Mesh(sg, sm); sea.rotation.x = -Math.PI / 2; sea.position.set(-4, 0, 0); world.add(sea);
  const base = sg.attributes.position.array.slice();
  // mountain, snow cap, tree, sun
  const mt = new THREE.Mesh(new THREE.ConeGeometry(2.3, 3.4, 7), std(0x6b8794, { flatShading: true })); mt.position.set(4.6, 1.95, -.4); world.add(mt);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(.78, 1.1, 7), std(0xffffff, { flatShading: true })); cap.position.set(4.6, 3.1, -.4); world.add(cap);
  for (let i = 0; i < 4; i++) { const t = new THREE.Group(), x = 1.3 + i * .55, z = rnd(-1, 1.2), s = rnd(.8, 1.15);
    const tr = new THREE.Mesh(new THREE.CylinderGeometry(.06, .09, .6 * s, 6), std(0x6b4a2a)); tr.position.y = .3 * s;
    const lf = new THREE.Mesh(new THREE.IcosahedronGeometry(.42 * s, 1), std(0x2f9e4f, { flatShading: true })); lf.position.y = .85 * s;
    t.add(tr, lf); t.position.set(x, .32, z); world.add(t); }
  const sun = new THREE.Mesh(new THREE.SphereGeometry(.7, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffd36b })); sun.position.set(7.2, 5.6, -2); world.add(sun);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot(), color: 0xffc860, transparent: true, opacity: .7, blending: THREE.AdditiveBlending, depthWrite: false })); halo.scale.set(4, 4, 1); sun.add(halo);
  const cloud = (x, y, z) => { const g = new THREE.Group(), m = std(0xf4fbff, { roughness: 1, emissive: 0x5a6a78 });
    [[0, 0, 0, .9], [.8, -.1, .1, .7], [-.8, -.12, 0, .68], [.3, .35, 0, .62], [-.3, .3, .1, .55]].forEach(([a, b, c, r]) => { const s = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), m); s.position.set(a, b, c); s.scale.y = .8; g.add(s); });
    g.position.set(x, y, z); world.add(g); return g; };
  const cA = cloud(-3, 3.6, 0), cB = cloud(2.6, 4.2, -.8);
  // particle emitters, one flow per water-cycle stage
  const tex = dot(), P = { x: -3, y: 3.5 };
  const paths = [
    (t, s) => [lerp(s.a, -3 + s.b * .5, t) + Math.sin(t * 9 + s.a) * .12, lerp(.1, 3.3, t), s.z],                       // evaporation
    (t, s) => [lerp(s.x, -3, t) , lerp(1.2, 3.4, t) + Math.sin(t * 3) * .3, lerp(s.z, 0, t)],                               // transpiration
    (t, s) => { const r = lerp(1.9, .2, t); return [-3 + Math.cos(s.a) * r, 3.5 + Math.sin(s.a) * r * .6, Math.sin(s.a * 2) * r * .5]; }, // condensation
    (t, s) => [s.q ? 2.6 + s.b * .9 : -3 + s.b * 1.1, lerp(s.q ? 3.9 : 3.3, s.q ? .5 : .05, t * t * .6 + t * .4), s.z * .5],  // precipitation
    (t, s) => t < .6 ? [lerp(4.2, 1.2, t / .6) + s.b * .2, lerp(3.1, .45, Math.pow(t / .6, .8)), s.z * .4 - .4] : [lerp(1.2, -.2, (t - .6) / .4), .4 - (t - .6) * .9, s.z * .4], // runoff
    (t, s) => t < .35 ? [lerp(s.x, s.x, t), lerp(.25, -1.3, t / .35), s.z * .6] : [lerp(s.x, -.4, (t - .35) / .65), -1.3 + Math.sin((t - .35) * 4) * .05, s.z * .6] // infiltration
  ];
  const flows = paths.map((fn, k) => {
    const n = 260, g = new THREE.BufferGeometry(), arr = new Float32Array(n * 3); g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const m = new THREE.PointsMaterial({ size: k === 3 ? .16 : .22, map: tex, color: COLORS[k], transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(g, m); pts.frustumCulled = false; world.add(pts);
    const seeds = Array.from({ length: n }, (_, i) => ({ o: i / n, a: k === 2 ? rnd(0, 6.28) : rnd(-4.2, -1.8), b: rnd(-1, 1), z: rnd(-1.8, 1.8), x: rnd(1.2, 3.4), q: i % 2 }));
    if (k === 2) seeds.forEach(s => s.a = rnd(0, 6.28));
    return { fn, arr, g, m, seeds, n };
  });

  let stage = 0, glow = 0, drag = null, az = .35, el = .32, tz = az, te = el, time = 0;
  const label = document.createElement('div'); label.className = 'w3d-label'; host.append(label);
  const hint = document.createElement('div'); hint.className = 'w3d-hint'; hint.textContent = 'Drag to rotate · scroll the steps to follow the water'; host.append(hint);
  const capEl = document.createElement('div'); capEl.className = 'w3d-cap'; host.append(capEl);
  const LB = [['Ocean', [-4, .5, 2.8], [0, 3]], ['Sun', [7.2, 6.8, -2], [0]], ['Cloud', [-3, 5, 0], [2, 3]], ['Mountain', [4.6, 5.2, -.4], [4]], ['Trees', [2.1, 2.2, 1.2], [1]], ['Groundwater', [4, -1.3, 2.8], [5]], ['Soil', [1.2, -.3, 2.8], []]].map(([t, p, st]) => { const e = document.createElement('span'); e.className = 'w3d-tag'; e.textContent = t; host.append(e); return { e, v: new THREE.Vector3(...p), st }; });
  const setStage = i => { stage = i; label.innerHTML = `<b>Step ${i + 1} / 6</b> ${NAMES[i]}`; capEl.textContent = (typeof W !== 'undefined' && W[i]) ? W[i][1] : ''; label.style.setProperty('--c', '#' + COLORS[i].toString(16).padStart(6, '0')); };
  host.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY, tz, te]; host.setPointerCapture(e.pointerId); hint.remove(); });
  host.addEventListener('pointermove', e => { if (!drag) return; tz = drag[2] - (e.clientX - drag[0]) * .006; te = Math.max(.05, Math.min(.9, drag[3] + (e.clientY - drag[1]) * .004)); });
  host.addEventListener('pointerup', () => drag = null);
  const resize = () => { renderer.setSize(w(), h()); cam.aspect = w() / h(); cam.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(host);

  const tick = () => {
    requestAnimationFrame(tick);
    if (!host.offsetParent) return;                       // slide hidden, skip work
    const dt = still ? 0 : .016; time += dt;
    if (!drag && !still) tz = .35 + Math.sin(time * .25) * .3;
    az += (tz - az) * .06; el += (te - el) * .06;
    cam.position.set(Math.sin(az) * 15.5, 3.2 + el * 9, Math.cos(az) * 15.5); cam.lookAt(0.3, 1.3, 0);
    const p = sg.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = base[i * 3], y = base[i * 3 + 1]; p.array[i * 3 + 2] = Math.sin(x * 1.3 + time * 1.6) * .08 + Math.cos(y * 1.7 + time * 1.2) * .06; }
    p.needsUpdate = true; sg.computeVertexNormals();
    glow += ((stage === 0 ? 1 : 0) - glow) * .05; halo.material.opacity = .55 + glow * .4 + Math.sin(time * 2) * .05; sun.scale.setScalar(1 + glow * .25);
    const pulse = stage === 2 ? 1 + Math.sin(time * 4) * .06 + .08 : 1; cA.scale.setScalar(lerp(cA.scale.x, pulse, .1)); cB.scale.setScalar(lerp(cB.scale.x, stage === 3 ? 1.08 : 1, .1));
    flows.forEach((f, k) => {
      f.m.opacity += ((k === stage ? .95 : (k === 0 && stage !== 0 ? .06 : 0)) - f.m.opacity) * .08;
      if (f.m.opacity < .01) return;
      for (let i = 0; i < f.n; i++) { const s = f.seeds[i], t = (time * (k === 3 ? .55 : .22) + s.o) % 1, v = f.fn(t, s); f.arr.set(v, i * 3); }
      f.g.attributes.position.needsUpdate = true;
    });
    LB.forEach(l => { const p = l.v.clone().project(cam); l.e.style.transform = `translate(${(p.x * .5 + .5) * w()}px,${(-p.y * .5 + .5) * h()}px) translate(-50%,-130%)`; l.e.classList.toggle('on', l.st.includes(stage)); });
    renderer.render(scene, cam);
  };
  tick(); setStage(typeof wi === 'number' ? wi : 0);
  return setStage;
}

function init() {
  const svg = document.getElementById('ws'); if (!svg || document.getElementById('w3d')) return;
  try { const t = document.createElement('canvas'); if (!(t.getContext('webgl2') || t.getContext('webgl'))) return; } catch { return; }
  const host = document.createElement('div'); host.id = 'w3d'; host.setAttribute('role', 'img');
  host.setAttribute('aria-label', 'Interactive 3D model of the water cycle: ocean, sun, clouds, mountain, trees and groundwater');
  svg.insertAdjacentElement('beforebegin', host); svg.style.display = 'none';
  const setStage = build(host);
  const orig = window.proc;                                  // wrap the existing step controller
  window.proc = i => { orig(i); setStage(wi); };
  setStage(wi);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
