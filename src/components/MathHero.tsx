import { useEffect, useRef } from "react";

const MATH_JOKES = [
  "f(Q) = Precio a cobrar",
  "∫ conocimiento dt = Éxito",
  "lím(x→∞) esfuerzo = Aprendizaje",
  "∂Nota/∂Tutoría > 0",
  "P(aprobar | tutoría) → 1",
  "Σ dudas → 0",
  "QED: Tutorías funcionan ∎",
  "∀ estudiante ∃ mentor perfecto",
  "dy/dx(curva aprendizaje) ↑",
];

export function MathHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

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

      const t = frame * 0.014;
      const angle = t % (Math.PI * 2);

      // ── Círculo unitario ─────────────────────────────────────
      const cx = W * 0.18;
      const cy = H * 0.52;
      const R  = Math.min(W * 0.12, H * 0.38, 88);

      // Posición del punto en el círculo
      const px = cx + R * Math.cos(angle);
      const py = cy - R * Math.sin(angle);

      // Ejes
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - R*1.5, cy); ctx.lineTo(cx + R*1.5, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R*1.5); ctx.lineTo(cx, cy + R*1.5); ctx.stroke();

      // Círculo
      ctx.strokeStyle = "rgba(24,201,100,0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Donde comienza la onda
      const waveStartX = cx + R * 1.6;
      const waveW      = W - waveStartX - 16;
      const waveY      = cy;
      const amp        = R * 0.7;

      // Valor actual en tiempo real
      const senNow = Math.sin(angle);
      const cosNow = Math.cos(angle);

      // Punto Y en el inicio de la onda (seno en ese momento)
      const senLiveY = waveY - amp * senNow;
      // Punto Y en el inicio de la onda coseno
      const cosLiveY = waveY - amp * cosNow;

      // ── Radio (vector) ───────────────────────────────────────
      ctx.strokeStyle = "#18C964";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();

      // ── Proyección SENO (vertical) — verde ──────────────────
      // Línea vertical desde el punto hasta el eje X del círculo
      ctx.strokeStyle = "rgba(24,201,100,0.8)";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Línea de conexión: desde el punto del círculo hasta el inicio de la onda seno
      ctx.strokeStyle = "rgba(24,201,100,0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(waveStartX, senLiveY);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Proyección COSENO (horizontal) — naranja ─────────────
      // Línea horizontal desde el eje Y del círculo hasta el punto en X
      ctx.strokeStyle = "rgba(251,146,60,0.8)";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);          // desde el centro
      ctx.lineTo(px, cy);          // hasta la proyección horizontal del punto
      ctx.stroke();
      ctx.setLineDash([]);

      // Palito vertical naranja: desde (px, cy) hasta (px, py) NO — 
      // La proyección coseno es la horizontal. Necesitamos también la línea
      // desde el punto hasta el eje vertical para conectar con la onda coseno:
      // La onda coseno empieza en waveStartX con valor cosNow
      // Conectamos la proyección horizontal (px, cy) con (waveStartX, cosLiveY)
      ctx.strokeStyle = "rgba(251,146,60,0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(px, cy);           // extremo de la proyección coseno en el círculo
      ctx.lineTo(waveStartX, cosLiveY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Punto en el círculo
      ctx.fillStyle = "#18C964";
      ctx.shadowColor = "#18C964";
      ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;

      // Arco ángulo
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.28, 0, angle, false);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = `${Math.max(10, R*0.19)}px 'IBM Plex Mono'`;
      ctx.fillText("θ", cx + R*0.35*Math.cos(angle*0.5), cy - R*0.35*Math.sin(angle*0.5) + 4);

      // ── Eje X de la onda ─────────────────────────────────────
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(waveStartX, waveY); ctx.lineTo(waveStartX + waveW, waveY); ctx.stroke();

      // ── Curva SENO — verde brillante ─────────────────────────
      ctx.strokeStyle = "#18C964";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#18C964";
      ctx.shadowBlur  = 9;
      ctx.beginPath();
      for (let i = 0; i <= waveW; i++) {
        const xr = i / waveW;
        const yv = waveY - amp * Math.sin(angle - xr * Math.PI * 3.6);
        if (i === 0) ctx.moveTo(waveStartX + i, yv);
        else         ctx.lineTo(waveStartX + i, yv);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Curva COSENO — naranja ────────────────────────────────
      ctx.strokeStyle = "rgba(251,146,60,0.9)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(251,146,60,0.7)";
      ctx.shadowBlur  = 7;
      ctx.beginPath();
      for (let i = 0; i <= waveW; i++) {
        const xr = i / waveW;
        const yv = waveY - amp * Math.cos(angle - xr * Math.PI * 3.6);
        if (i === 0) ctx.moveTo(waveStartX + i, yv);
        else         ctx.lineTo(waveStartX + i, yv);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Punto vivo seno (verde)
      ctx.fillStyle = "#18C964";
      ctx.shadowColor = "#18C964";
      ctx.shadowBlur  = 18;
      ctx.beginPath(); ctx.arc(waveStartX, senLiveY, 5, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;

      // Punto vivo coseno (naranja)
      ctx.fillStyle = "rgba(251,146,60,1)";
      ctx.shadowColor = "rgba(251,146,60,0.9)";
      ctx.shadowBlur  = 16;
      ctx.beginPath(); ctx.arc(waveStartX, cosLiveY, 5, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;

      // Labels
      const fs = Math.max(10, R*0.17);
      ctx.font = `bold ${fs}px 'IBM Plex Mono'`;
      ctx.fillStyle = "#18C964";
      ctx.fillText("sen(θ)", waveStartX + waveW * 0.6, waveY - amp * 0.85);
      ctx.fillStyle = "rgba(251,146,60,0.95)";
      ctx.fillText("cos(θ)", waveStartX + waveW * 0.6, waveY + amp * 0.92);

      // ── Chiste rotante ───────────────────────────────────────
      const ji  = Math.floor(frame / 210) % MATH_JOKES.length;
      const jp  = (frame % 210) / 210;
      const jop = jp < 0.1 ? jp/0.1 : jp > 0.85 ? (1-jp)/0.15 : 1;
      ctx.font = `${Math.max(11, R*0.17)}px 'IBM Plex Mono'`;
      ctx.fillStyle = `rgba(255,255,255,${jop * 0.45})`;
      ctx.textAlign = "center";
      ctx.fillText(MATH_JOKES[ji], W/2, H - 10);
      ctx.textAlign = "left";

      frame++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full border-b border-border bg-black overflow-hidden" style={{ height: "240px" }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ display: "block" }} />
    </div>
  );
}
