import { useEffect, useRef } from "react";

export function ParabolicShot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const CYCLE = 260;

    const v0  = 25;
    const deg = 55;
    const g   = 9.8;
    const rad = (deg * Math.PI) / 180;
    const vx  = v0 * Math.cos(rad);
    const vy0 = v0 * Math.sin(rad);
    const T   = (2 * vy0) / g;
    const Xmax = vx * T;
    const Ymax = (vy0 * vy0) / (2 * g);

    function arrow(
      x1: number, y1: number, x2: number, y2: number,
      color: string, lw: number, label?: string
    ) {
      if (!ctx) return;
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.sqrt(dx*dx + dy*dy);
      if (len < 3) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const ang = Math.atan2(dy, dx);
      const hs = 7;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - hs*Math.cos(ang-0.35), y2 - hs*Math.sin(ang-0.35));
      ctx.lineTo(x2 - hs*Math.cos(ang+0.35), y2 - hs*Math.sin(ang+0.35));
      ctx.closePath(); ctx.fill();
      if (label) {
        ctx.fillStyle = color;
        ctx.font = "italic bold 9px 'IBM Plex Mono'";
        ctx.fillText(label, x2 + 3, y2 - 3);
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const padL = W * 0.12, padR = W * 0.06;
      const padT = H * 0.1,  padB = H * 0.18;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;

      const scaleX = plotW / Xmax;
      const scaleY = plotH / (Ymax * 1.2);
      const toX = (x: number) => padL + x * scaleX;
      const toY = (y: number) => padT + plotH - y * scaleY;

      const originX = toX(0);
      const originY = toY(0);

      // Cuadrícula
      ctx.strokeStyle = "rgba(24,201,100,0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 5; i++) {
        const gx = padL + (plotW/5)*i;
        ctx.beginPath(); ctx.moveTo(gx, padT); ctx.lineTo(gx, originY); ctx.stroke();
      }
      for (let i = 1; i <= 4; i++) {
        const gy = padT + (plotH/4)*i;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(padL+plotW, gy); ctx.stroke();
      }

      // Ejes principales con flechas
      arrow(padL - 10, originY, padL + plotW + 12, originY, "rgba(255,255,255,0.4)", 1.5, "x");
      arrow(originX, originY + 10, originX, padT - 8, "rgba(255,255,255,0.4)", 1.5, "y");

      // Origen
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "9px 'IBM Plex Mono'";
      ctx.fillText("O", originX - 14, originY + 13);

      // Ticks eje X
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.font = "8px 'IBM Plex Mono'";
      ctx.textAlign = "center";
      [0.25, 0.5, 0.75, 1].forEach(f => {
        const xv = f * Xmax;
        const sx = toX(xv);
        ctx.beginPath(); ctx.moveTo(sx, originY - 3); ctx.lineTo(sx, originY + 3);
        ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillText(`${Math.round(xv)}m`, sx, originY + 13);
      });
      // Ticks eje Y
      ctx.textAlign = "right";
      [Ymax * 0.5, Ymax].forEach(yv => {
        const sy = toY(yv);
        ctx.beginPath(); ctx.moveTo(originX - 3, sy); ctx.lineTo(originX + 3, sy);
        ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillText(`${Math.round(yv)}m`, originX - 5, sy + 3);
      });
      ctx.textAlign = "left";

      // Línea punteada de altura máxima
      const hMaxX = toX(Xmax / 2);
      const hMaxY = toY(Ymax);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(originX, hMaxY); ctx.lineTo(hMaxX, hMaxY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hMaxX, hMaxY); ctx.lineTo(hMaxX, originY); ctx.stroke();
      ctx.setLineDash([]);

      // Label ymáx con flecha — estilo pizarrón
      arrow(hMaxX + 18, hMaxY - 18, hMaxX + 3, hMaxY, "rgba(255,255,255,0.35)", 0.8);
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.font = "italic 9px 'IBM Plex Mono'";
      ctx.fillText(`y_máx=${Math.round(Ymax)}m`, hMaxX + 22, hMaxY - 20);

      // Label alcance
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.font = "8px 'IBM Plex Mono'";
      ctx.textAlign = "center";
      ctx.fillText("ALCANCE", toX(Xmax/2), originY + 26);
      ctx.setLineDash([3,3]);
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(originX, originY + 22);
      ctx.lineTo(toX(Xmax), originY + 22);
      ctx.stroke();
      ctx.setLineDash([]);
      // Flecha doble horizontal de alcance
      arrow(toX(Xmax * 0.5) - 30, originY + 22, originX + 2, originY + 22, "rgba(255,255,255,0.2)", 0.8);
      arrow(toX(Xmax * 0.5) + 30, originY + 22, toX(Xmax) - 2, originY + 22, "rgba(255,255,255,0.2)", 0.8);
      ctx.textAlign = "left";

      // Trayectoria punteada completa (fantasma)
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const xm = (i / 200) * Xmax;
        const tm = xm / vx;
        const ym = vy0*tm - 0.5*g*tm*tm;
        if (ym < -0.1) break;
        if (i === 0) ctx.moveTo(toX(xm), toY(Math.max(ym, 0)));
        else         ctx.lineTo(toX(xm), toY(Math.max(ym, 0)));
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Progreso
      const progress = (frame % CYCLE) / CYCLE;
      const curT  = progress * T;
      const curXm = vx * curT;
      const curYm = vy0*curT - 0.5*g*curT*curT;
      const curSX = toX(curXm);
      const curSY = toY(Math.max(curYm, 0));

      // Trayectoria recorrida (verde)
      ctx.strokeStyle = "#18C964";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#18C964";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const xm = (i / 200) * Xmax;
        if (xm > curXm) break;
        const tm = xm / vx;
        const ym = vy0*tm - 0.5*g*tm*tm;
        if (ym < -0.1) break;
        if (i === 0) ctx.moveTo(toX(xm), toY(Math.max(ym, 0)));
        else         ctx.lineTo(toX(xm), toY(Math.max(ym, 0)));
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (curYm >= -0.1) {
        const vxNow = vx;
        const vyNow = vy0 - g * curT;
        const vScale = 4;

        // Vector vₓ (horizontal, naranja)
        arrow(curSX, curSY, curSX + vxNow*vScale, curSY, "rgba(251,146,60,0.9)", 1.5, "v̄ₓ");

        // Vector vᵧ (vertical, azul claro)
        if (Math.abs(vyNow) > 0.5) {
          arrow(curSX, curSY, curSX, curSY - vyNow*vScale, "rgba(100,180,255,0.85)", 1.5,
            vyNow > 0 ? "v̄ᵧ" : "v̄ᵧ");
        }

        // Vector velocidad total (blanco)
        const vMag = Math.sqrt(vxNow**2 + vyNow**2);
        if (progress < 0.95) {
          arrow(curSX, curSY, curSX + vxNow*vScale, curSY - vyNow*vScale,
            "rgba(255,255,255,0.8)", 1.8, "v̄");
        }

        // Proyectil
        ctx.fillStyle = "#18C964";
        ctx.shadowColor = "#18C964";
        ctx.shadowBlur = 20;
        ctx.beginPath(); ctx.arc(curSX, curSY, 6, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;

        // Datos junto al proyectil
        const flip = curSX > W * 0.7;
        const dX = flip ? curSX - 95 : curSX + 12;
        ctx.font = "bold 8.5px 'IBM Plex Mono'";
        ctx.fillStyle = "rgba(24,201,100,0.9)";
        ctx.fillText(`y = ${Math.round(Math.max(curYm,0))} m`, dX, curSY - 4);
        ctx.fillStyle = "rgba(251,146,60,0.85)";
        ctx.fillText(`|v| = ${Math.round(vMag)} m/s`, dX, curSY + 10);
        ctx.fillStyle = "rgba(100,180,255,0.8)";
        ctx.fillText(`t = ${curT.toFixed(1)} s`, dX, curSY + 23);

        // Ángulo inicial (solo al principio)
        if (progress < 0.12) {
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.font = "italic 9px 'IBM Plex Mono'";
          ctx.fillText(`α₀ = ${deg}°`, originX + 22, originY - 18);
          // Triángulo de componentes en el origen
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3,3]);
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.lineTo(originX + vxNow*vScale, originY);
          ctx.lineTo(originX + vxNow*vScale, originY - vy0*vScale);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Fórmulas estilo pizarrón (arriba a la derecha)
      ctx.fillStyle = "rgba(24,201,100,0.3)";
      ctx.font = "italic 8px 'IBM Plex Mono'";
      ctx.textAlign = "right";
      ctx.fillText("x(t) = v₀cos(α₀)·t", W - padR, padT + 12);
      ctx.fillText("y(t) = v₀sin(α₀)·t − ½gt²", W - padR, padT + 26);
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillText(`v₀=${v0}m/s  α₀=${deg}°  g=${g}m/s²`, W - padR, padT - 4);
      ctx.textAlign = "left";

      // g hacia abajo (gravedad)
      if (progress > 0.15 && progress < 0.85) {
        const gx = W * 0.6, gy = H * 0.55;
        arrow(gx, gy, gx, gy + 28, "rgba(255,255,255,0.35)", 1.2, "g⃗ = −gĵ");
      }

      frame++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ display: "block", height: "220px" }}
    />
  );
}
