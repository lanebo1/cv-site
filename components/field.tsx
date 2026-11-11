"use client";

import { useEffect, useRef } from "react";

/*
 * ПОЛЕ COBALT — вариант A: один сквозной canvas-фон на всю страницу.
 *
 * Сетка 8x16. Шум по ячейкам в символьный ramp: слева — raw («·:-=+*#%@»),
 * справа — resolved (braille); слои raw→resolved идут слева направо.
 * «Трафик» продукта — деплой-пульсы бегут по вертикальным lane сверху вниз:
 * непрерывный поток символов вдоль всей страницы.
 * 30 fps, pointer-линза по ячейкам, пауза при скрытой вкладке, DPR cap 2,
 * reduced motion — один композиционный кадр.
 */

const CW = 8;
const CH = 16;
const MONO = '"JetBrains Mono", ui-monospace, monospace';
const RAMP = [" ", "·", ":", "-", "=", "+", "*", "#", "%", "@"];
const BRAILLE = [" ", "⠁", "⠃", "⠇", "⡇", "⣇", "⣧", "⣷", "⣿", "⣿"];
const TRAIL = "┆";
const HEAD = "⣿";

/* Gradient noise, seeded — каждый визит рисует одну и ту же «погоду» */
const P = new Uint8Array(512);
{
  const p = Array.from({ length: 256 }, (_, i) => i);
  let s = 1042;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = p[i];
    p[i] = p[j];
    p[j] = t;
  }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];
}
const GX = [1, -1, 1, -1, 1, -1, 0, 0];
const GY = [1, 1, -1, -1, 0, 0, 1, -1];

function noise(x: number, y: number): number {
  const X = Math.floor(x),
    Y = Math.floor(y),
    xf = x - X,
    yf = y - Y,
    xi = X & 255,
    yi = Y & 255;
  const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
  const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
  const aa = P[P[xi] + yi] & 7,
    ab = P[P[xi] + yi + 1] & 7,
    ba = P[P[xi + 1] + yi] & 7,
    bb = P[P[xi + 1] + yi + 1] & 7;
  const n00 = GX[aa] * xf + GY[aa] * yf,
    n10 = GX[ba] * (xf - 1) + GY[ba] * yf;
  const n01 = GX[ab] * xf + GY[ab] * (yf - 1),
    n11 = GX[bb] * (xf - 1) + GY[bb] * (yf - 1);
  const a = n00 + u * (n10 - n00),
    b = n01 + u * (n11 - n01);
  return a + v * (b - a);
}

/* Погода поля, дрейфующая ВНИЗ: паттерн течёт сверху вниз */
const fieldAt = (px: number, py: number, t: number): number =>
  0.5 +
  0.62 * noise(px / 300 + t * 0.02, (py - t * 64) / 230) +
  0.3 * noise(px / 105 - t * 0.04, (py - t * 96) / 90);

function makeAtlas(glyphs: string[], tints: string[], dpr: number) {
  const c = document.createElement("canvas");
  c.width = glyphs.length * CW * dpr;
  c.height = tints.length * CH * dpr;
  const x = c.getContext("2d");
  if (!x) return c;
  x.scale(dpr, dpr);
  x.font = `400 13.333px ${MONO}`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  tints.forEach((tint, r) => {
    x.fillStyle = tint;
    glyphs.forEach((g, i) => x.fillText(g, i * CW + CW / 2, r * CH + CH / 2 + 1));
  });
  return c;
}

export function Field() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv0 = canvasRef.current;
    if (!cv0) return;
    const ctx0 = cv0.getContext("2d");
    if (!ctx0) return;
    const cv = cv0 as HTMLCanvasElement;
    const ctx = ctx0 as CanvasRenderingContext2D;

    const css = getComputedStyle(document.documentElement);
    const tok = (n: string, f: string) =>
      css.getPropertyValue(n).trim() || f;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const C = {
      g1: tok("--color-glyph-1", "#e3e8f2"),
      g2: tok("--color-glyph-2", "#c7d2e4"),
      g3: tok("--color-glyph-3", "#a3b6d4"),
      g4: tok("--color-glyph-4", "#829ec9"),
      accent: tok("--color-accent", "#2457d6"),
      deep: tok("--color-accent-deep", "#1d3fa8"),
      gg1: tok("--color-graphite-glyph-1", "#3c4252"),
      gg2: tok("--color-graphite-glyph-2", "#525d76"),
      gg3: tok("--color-graphite-glyph-3", "#777f96"),
    };

    const GLYPHS = [...RAMP.slice(1), ...BRAILLE.slice(1, 9), TRAIL, HEAD];
    const TINTS = [
      C.g1, C.g2, C.g3, C.g4, C.accent, C.deep,
      C.gg1, C.gg2, C.gg3,
    ];
    const RAMP_I = RAMP.map((g) => (g === " " ? -1 : GLYPHS.indexOf(g)));
    const BR_I = BRAILLE.map((g) => (g === " " ? -1 : GLYPHS.indexOf(g)));
    const TRAIL_I = GLYPHS.indexOf(TRAIL);
    const HEAD_I = GLYPHS.indexOf(HEAD);
    /* уровень плотности → тинт: бледные у кромки, глубокий кобальт в ядре */
    const TINT_OF = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5];
    const GG_OF = (lv: number) => (lv < 4 ? 6 : lv < 7 ? 7 : 8);

    let W = 0,
      H = 0,
      cols = 0,
      rows = 0,
      dpr = 1,
      sheet: HTMLCanvasElement | null = null;
    let CALM = new Float32Array(0);
    let relBoxes: { l: number; r: number; t: number; b: number }[] = [];
    let calmTop = -1e9;
    let calmRoot: HTMLElement | null = null;
    let darkEl: HTMLElement | null = null;
    let laneCol: number[] = [];
    let laneG = new Float32Array(0);
    let pulses: { y: number; v: number }[] = [];
    let last = 0;
    let clock = 37;
    let running = false;
    let raf = 0;
    let calmBuiltAt = -1e9;
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, k: 0, tk: 0 };

    function layout() {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / CW);
      rows = Math.ceil(H / CH);
      sheet = makeAtlas(GLYPHS, TINTS, dpr);
      calmRoot = document.querySelector<HTMLElement>("[data-field-calm]");
      darkEl = document.querySelector<HTMLElement>("[data-field-dark]");
      relBoxes = [];
      if (calmRoot) {
        const cr = calmRoot.getBoundingClientRect();
        calmTop = cr.top;
        for (const el of Array.from(calmRoot.children)) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          relBoxes.push({
            l: r.left - cr.left - 20,
            r: r.right - cr.left + 28,
            t: r.top - cr.top - 12,
            b: r.bottom - cr.top + 12,
          });
        }
      }
      /* lane деплой-пульсов: вертикальные линии трафика по ширине */
      const nb = W >= 900 ? 6 : 3;
      laneCol = [];
      for (let i = 0; i < nb; i++) {
        laneCol.push(
          Math.round(
            cols * (0.12 + (0.76 * i) / Math.max(1, nb - 1)),
          ) + ((i * 7) % 3) - 1,
        );
      }
      laneG = new Float32Array(cols);
      for (let c = 0; c < cols; c++) {
        let g = 0;
        for (const lc of laneCol) {
          const d = c - lc;
          g = Math.max(g, Math.exp(-(d * d) / 6.5));
        }
        laneG[c] = g;
      }
      pulses = laneCol.map((_, i) => ({
        y: -(i * rows) / Math.max(1, nb) - 8,
        v: 4 + ((i * 2.3) % 4),
      }));
      calmBuiltAt = -1e9;
    }

    /* спокойный патч под текстом hero: rebuild при сдвиге >= полклетки */
    function rebuildCalm() {
      if (!calmRoot || !relBoxes.length) {
        CALM = new Float32Array(0);
        return;
      }
      const cr = calmRoot.getBoundingClientRect();
      if (Math.abs(cr.top - calmBuiltAt) < CH / 2) return;
      calmBuiltAt = cr.top;
      if (cr.bottom < -80 || cr.top > H + 80) {
        CALM = new Float32Array(0);
        return;
      }
      CALM = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * CW + CW / 2,
            py = y * CH + CH / 2;
          let m = 0;
          for (const bx of relBoxes) {
            const d = Math.hypot(
              Math.max(bx.l + cr.left - px, 0, px - (bx.r + cr.left)),
              Math.max(bx.t + cr.top - py, 0, py - (bx.b + cr.top)),
            );
            const k = d <= 0 ? 1 : Math.max(0, 1 - d / 64);
            if (k > m) m = k;
          }
          CALM[y * cols + x] = m * m * (3 - 2 * m);
        }
      }
    }

    function step(dt: number) {
      for (const p of pulses) {
        p.y += p.v * dt;
        if (p.y * CH > H + 40 * CH) {
          p.y = -(20 + Math.random() * 60);
          p.v = 3.5 + Math.random() * 5;
        }
      }
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H);
      if (!sheet) return;
      const dr = darkEl ? darkEl.getBoundingClientRect() : null;
      const darkTop = dr ? dr.top : 1e5;
      const darkBot = dr ? dr.bottom : -1e5;
      const hasCalm = CALM.length === cols * rows;
      const k = pointer.k,
        mx = pointer.x,
        my = pointer.y;
      const lensR = 200;
      for (let y = 1; y < rows - 1; y++) {
        const py = y * CH;
        const inDark = py > darkTop + 12 && py < darkBot - 12;
        /* интенсивность пульсов lane на этой строке */
        const pl: number[] = [];
        for (const p of pulses) {
          const d = py - p.y * CH;
          pl.push(Math.exp(-(d * d) / 25088)); /* sigma = 7 клеток */
        }
        for (let x = 1; x < cols - 1; x++) {
          let v = fieldAt(x * CW, py, t);
          const lg = laneG[x];
          if (lg > 0.01) {
            let pv = 0;
            for (let i = 0; i < pulses.length; i++) pv = Math.max(pv, pl[i]);
            v += lg * (0.22 + pv * 0.75);
          }
          /* pointer-линза: поднимает шум вокруг курсора */
          if (k > 0.01) {
            const dx = x * CW - mx,
              dy = py - my,
              d2 = dx * dx + dy * dy;
            if (d2 < lensR * lensR) {
              const f = (1 - Math.sqrt(d2) / lensR) ** 2 * k;
              v += f * 0.55;
            }
          }
          if (hasCalm) v *= 1 - CALM[y * cols + x] * 0.95;
          /* сырьё слева реже, resolved справа плотнее */
          const gate = 0.56 - 0.14 * (x / cols);
          if (v < gate) continue;
          const lv = Math.min(
            9,
            1 + Math.floor(((v - gate) / (1.45 - gate)) * 9),
          );
          /* слои raw→resolved: ramp слева, braille справа, дизеринг на шве */
          const u = x / cols;
          const resolved =
            u + noise(x * 1.7 + 31.4, y * 0.9) * 0.18 > 0.52;
          const g = (resolved ? BR_I : RAMP_I)[lv];
          if (g < 0) continue;
          let tint = inDark ? GG_OF(lv) : TINT_OF[lv];
          let alpha = inDark ? 0.75 : 0.6 + 0.4 * u;
          if (k > 0.01) {
            const dx = x * CW - mx,
              dy = py - my,
              d2 = dx * dx + dy * dy;
            if (d2 < 16000 * k) tint = Math.min(inDark ? 8 : 5, tint + 1);
          }
          ctx.globalAlpha = alpha;
          ctx.drawImage(
            sheet,
            g * CW * dpr,
            tint * CH * dpr,
            CW * dpr,
            CH * dpr,
            x * CW,
            py,
            CW,
            CH,
          );
        }
      }
      /* головы деплой-пульсов и их следы */
      ctx.globalAlpha = 1;
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        const c = laneCol[i];
        if (c < 1 || c >= cols - 1) continue;
        const row = Math.round(p.y);
        if (row < 1 || row >= rows - 1) continue;
        const inDark =
          row * CH > darkTop + 12 && row * CH < darkBot - 12;
        ctx.globalAlpha = 0.95;
        ctx.drawImage(
          sheet,
          HEAD_I * CW * dpr,
          (inDark ? 8 : 5) * CH * dpr,
          CW * dpr,
          CH * dpr,
          c * CW,
          row * CH,
          CW,
          CH,
        );
        for (let j = 1; j <= 9; j++) {
          const rr = row - j;
          if (rr < 1) break;
          ctx.globalAlpha = (1 - j / 10) * 0.8;
          ctx.drawImage(
            sheet,
            TRAIL_I * CW * dpr,
            (inDark ? 7 : 4) * CH * dpr,
            CW * dpr,
            CH * dpr,
            c * CW,
            rr * CH,
            CW,
            CH,
          );
        }
      }
      ctx.globalAlpha = 1;
    }

    function frame(ms: number) {
      raf = 0;
      if (!running) return;
      const now = ms / 1000;
      const dt = Math.min(0.1, now - (last || now));
      if (dt >= 1 / 32 || !last) {
        last = now;
        clock += dt;
        pointer.k += (pointer.tk - pointer.k) * 0.12;
        pointer.x += (pointer.tx - pointer.x) * 0.18;
        pointer.y += (pointer.ty - pointer.y) * 0.18;
        step(dt);
        rebuildCalm();
        draw(clock);
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce.matches || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    /* один композиционный кадр (reduced motion) */
    function still() {
      stop();
      clock = 37;
      calmBuiltAt = -1e9;
      rebuildCalm();
      step(0.016);
      draw(clock);
    }

    const onVis = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.tk = 1;
      if (pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.tk = 0;
    };

    let rz = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rz);
      rz = requestAnimationFrame(() => {
        layout();
        if (reduce.matches || !running) still();
      });
    });
    ro.observe(document.documentElement);

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    const onReduce = () => (reduce.matches ? still() : start());
    reduce.addEventListener("change", onReduce);

    /* глифы рисуем только после загрузки JetBrains Mono */
    const fonts = document.fonts
      ? Promise.race([
          document.fonts
            .load(`400 13.333px ${MONO}`, "·⣿┆")
            .then(() => document.fonts.ready),
          new Promise((r) => setTimeout(r, 1500)),
        ])
      : Promise.resolve();
    let dead = false;
    fonts.then(() => {
      if (dead) return;
      layout();
      document.documentElement.classList.add("has-field");
      if (reduce.matches) still();
      else {
        draw(clock);
        start();
      }
    });

    return () => {
      dead = true;
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", onReduce);
      document.documentElement.classList.remove("has-field");
    };
  }, []);

  return (
    <div className="field-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="field-canvas" />
      <div className="aurora">
        <i className="aurora__a" />
        <i className="aurora__b" />
        <i className="aurora__c" />
      </div>
    </div>
  );
}
