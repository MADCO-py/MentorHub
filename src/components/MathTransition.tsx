import { useEffect, useRef, useState } from "react";

interface MathTransitionProps {
  onComplete: () => void;
  tutorName: string;
}

// Operaciones que aparecen volando — con sentido matemático real
const OPERATIONS = [
  "∫₀^∞ e^(-x²) dx = √π/2",
  "E = mc²",
  "∇²φ = ρ/ε₀",
  "F = ma",
  "PV = nRT",
  "sin²θ + cos²θ = 1",
  "e^(iπ) + 1 = 0",
  "Σ(k=1,n) k = n(n+1)/2",
  "lím(h→0) [f(x+h)-f(x)]/h",
  "∮ B·dl = μ₀I",
  "λ = h/mv",
  "∂²u/∂t² = c²∇²u",
  "det(A) = Σ(-1)^σ Π a_iσ(i)",
  "P(A|B) = P(B|A)·P(A)/P(B)",
  "ΔS ≥ 0",
  "∇ × E = -∂B/∂t",
  "f'(x) = lím(Δx→0) Δy/Δx",
  "Σ 1/n² = π²/6",
  "i² = j² = k² = ijk = -1",
  "∫∫ F·dS = ∭ ∇·F dV",
];

export function MathTransition({ onComplete, tutorName }: MathTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    let animId: number;
    const TOTAL_FRAMES = 140;

    // Partículas de operaciones
    type Particle = {
      text: string; x: number; y: number;
      vx: number; vy: number;
      opacity: number; size: number; color: string;
    };

    const particles: Particle[] = [];
    const colors = ["#18C964", "#ffffff", "rgba(255,255,255,0.5)", "#22d3ee", "rgba(251,146,60,0.8)"];

    for (let i = 0; i < 28; i++) {
      particles.push({
        text:    OPERATIONS[i % OPERATIONS.length],
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 1.2,
        vy:      (Math.random() - 0.5) * 0.8 - 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        size:    Math.random() * 8 + 11,
        color:   colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;

      const progress = frame / TOTAL_FRAMES;

      // Fondo negro con fade
      ctx.fillStyle = `rgba(0,0,0,${frame < 10 ? frame/10 * 0.97 : 0.97})`;
      ctx.fillRect(0, 0, W, H);

      // Grid matemático de fondo
      ctx.strokeStyle = "rgba(24,201,100,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // Partículas de ecuaciones
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -300) p.x = W + 100;
        if (p.x > W + 100) p.x = -300;
        if (p.y < -50) p.y = H + 50;

        const fade = progress > 0.75 ? (1 - progress) / 0.25 : 1;
        ctx.globalAlpha = p.opacity * fade;
        ctx.font = `${p.size}px 'IBM Plex Mono'`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.globalAlpha = 1;

      // ── Texto central ──
      const centerY = H / 2;

      // "Calculando..." pulsante
      if (progress < 0.65) {
        const pulse = 0.6 + 0.4 * Math.sin(frame * 0.18);
        ctx.globalAlpha = pulse * (progress < 0.1 ? progress / 0.1 : 1);
        ctx.font = "bold 13px 'IBM Plex Mono'";
        ctx.fillStyle = "#18C964";
        ctx.textAlign = "center";
        ctx.letterSpacing = "0.3em";
        ctx.fillText("CALCULANDO...", W/2, centerY - 48);
        ctx.letterSpacing = "0";
        ctx.globalAlpha = 1;
      }

      // Nombre del tutor aparece grande
      if (progress > 0.3) {
        const nameProgress = Math.min(1, (progress - 0.3) / 0.3);
        const eased = 1 - Math.pow(1 - nameProgress, 3);
        ctx.globalAlpha = eased;
        ctx.font = `bold ${Math.floor(36 + eased * 8)}px 'Playfair Display', Georgia, serif`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.shadowColor = "#18C964";
        ctx.shadowBlur  = 20 * eased;
        ctx.fillText(tutorName, W/2, centerY + 8);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Ecuación decorativa debajo del nombre
      if (progress > 0.45) {
        const eqProgress = Math.min(1, (progress - 0.45) / 0.25);
        ctx.globalAlpha = eqProgress * 0.7;
        ctx.font = "14px 'IBM Plex Mono'";
        ctx.fillStyle = "#18C964";
        ctx.textAlign = "center";
        ctx.fillText("mentor ∈ {mejores estudiantes de UVG}", W/2, centerY + 44);
        ctx.globalAlpha = 1;
      }

      // Barra de progreso
      const barW = Math.min(W * 0.5, 340);
      const barX = (W - barW) / 2;
      const barY = centerY + 78;
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#1A1A1A";
      ctx.fillRect(barX, barY, barW, 2);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#18C964";
      ctx.shadowColor = "#18C964";
      ctx.shadowBlur  = 8;
      ctx.fillRect(barX, barY, barW * Math.min(progress / 0.85, 1), 2);
      ctx.shadowBlur = 0;

      // Partículas de puntos en la barra
      if (frame % 4 === 0 && progress < 0.85) {
        ctx.fillStyle = "#18C964";
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(barX + barW * Math.min(progress / 0.85, 1), barY + 1, 3, 0, Math.PI*2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.textAlign = "left";

      frame++;
      if (frame < TOTAL_FRAMES) {
        animId = requestAnimationFrame(draw);
      } else {
        setPhase("done");
      }
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [tutorName]);

  useEffect(() => {
    if (phase === "done") {
      // Pequeño delay antes de navegar
      const t = setTimeout(onComplete, 80);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999]"
      style={{ display: "block" }}
    />
  );
}
