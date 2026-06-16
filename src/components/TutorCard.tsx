import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, Code2, FlaskConical, Sigma, CircuitBoard,
  BookOpen, Coins, Video, Star,
} from "lucide-react";
import type { Tutor, Subject } from "@/types";
import { MathTransition } from "@/components/MathTransition";

const CAREER_ICON: Record<Subject, typeof Atom> = {
  fisica:       Atom,
  matematica:   Sigma,
  quimica:      FlaskConical,
  programacion: Code2,
  electronica:  CircuitBoard,
};
const SUBJECT_COLOR: Record<Subject, string> = {
  fisica:       "#22d3ee",
  matematica:   "#18C964",
  quimica:      "#a78bfa",
  programacion: "#18C964",
  electronica:  "#fb7185",
};
const SUBJECT_GLOW: Record<Subject, string> = {
  fisica:       "0 0 60px rgba(34,211,238,0.22), 0 0 120px rgba(34,211,238,0.08)",
  matematica:   "0 0 60px rgba(24,201,100,0.22), 0 0 120px rgba(24,201,100,0.08)",
  quimica:      "0 0 60px rgba(167,139,250,0.22), 0 0 120px rgba(167,139,250,0.08)",
  programacion: "0 0 60px rgba(24,201,100,0.22), 0 0 120px rgba(24,201,100,0.08)",
  electronica:  "0 0 60px rgba(251,113,133,0.22), 0 0 120px rgba(251,113,133,0.08)",
};

interface TutorCardProps { tutor: Tutor }

export function TutorCard({ tutor }: TutorCardProps) {
  const [hovered,    setHovered]    = useState(false);
  const [showMath,   setShowMath]   = useState(false);
  const navigate = useNavigate();

  const sub   = tutor.subjects[0];
  const Icon  = CAREER_ICON[sub] ?? BookOpen;
  const color = SUBJECT_COLOR[sub] ?? "#18C964";
  const glow  = SUBJECT_GLOW[sub]  ?? SUBJECT_GLOW.programacion;

  const handleClick = useCallback(() => {
    setShowMath(true);
  }, []);

  const handleTransitionDone = useCallback(() => {
    navigate(`/mentor/${tutor.slug}`);
  }, [navigate, tutor.slug]);

  return (
    <>
      {/* Transición matemática */}
      {showMath && (
        <MathTransition
          tutorName={tutor.name}
          onComplete={handleTransitionDone}
        />
      )}

      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: "800px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Ver perfil de ${tutor.name}`}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <motion.div
          animate={{
            boxShadow: hovered ? glow : "0 0 0 transparent",
            scale:     hovered ? 1.03 : 1,
            y:         hovered ? -6   : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden bg-surface"
          style={{
            borderRadius: "120px",
            width: "200px",
            height: "480px",
            border: `1px solid ${hovered ? color + "70" : "#2A2A2A"}`,
            transition: "border-color 0.4s",
          }}
        >
          {/* Patrón hexagonal SVG */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ opacity: hovered ? 0.08 : 0.03, transition: "opacity 0.6s" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id={`hex-${tutor.id}`} x="0" y="0" width="28" height="32" patternUnits="userSpaceOnUse">
                <polygon points="14,2 26,8 26,22 14,28 2,22 2,8" fill="none" stroke={color} strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#hex-${tutor.id})`} />
          </svg>

          {/* Ícono de carrera decorativo */}
          <motion.div
            animate={{ opacity: hovered ? 0.09 : 0.03, scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <Icon style={{ color }} className="h-56 w-56" strokeWidth={0.35} />
          </motion.div>

          {/* Brillo tipo cápsula */}
          <div
            className="pointer-events-none absolute left-5 right-5 top-4 h-1/3"
            style={{
              borderRadius: "80px 80px 50% 50%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.055) 0%, transparent 100%)",
            }}
          />

          {/* ── ZONA SUPERIOR ── */}
          <AnimatePresence initial={false} mode="popLayout">
            {!hovered ? (
              <motion.div
                key="photo-top"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="absolute top-0 left-0 right-0 flex flex-col items-center pt-10 px-5"
              >
                <div
                  className="h-[118px] w-[118px] overflow-hidden rounded-full"
                  style={{ border: `2px solid ${color}50`, boxShadow: `0 0 18px ${color}20` }}
                >
                  <img src={tutor.photo} alt={tutor.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div
                  className="mt-3 flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{ border: `1px solid ${color}40`, color, backgroundColor: `${color}10`, borderRadius: "4px" }}
                >
                  <Icon className="h-3 w-3" />{sub}
                </div>
                <div className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-muted">
                  <Video className="h-2.5 w-2.5" /> Clase virtual
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="info-top"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.28 }}
                className="absolute top-0 left-0 right-0 flex flex-col items-center pt-10 px-5 text-center"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color }}>{tutor.university}</p>
                <h3 className="mt-1 font-display text-[17px] font-bold text-white leading-tight">{tutor.name}</h3>
                <p className="mt-0.5 font-mono text-[9px] text-muted uppercase tracking-wider leading-tight">{tutor.career}</p>

                
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-baseline gap-1 font-display font-bold" style={{ color }}>
                    <span className="text-[32px] leading-none">Q{tutor.priceFrom}</span>
                    <span className="text-xs font-normal text-muted">/hora</span>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted mt-0.5">clase virtual</p>
                  <div className="mt-1.5 flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-current" style={{ color }} />)}
                  </div>
                </div>

                <div className="mt-3 h-px w-10" style={{ backgroundColor: color }} />

                <div className="mt-2.5 flex flex-col gap-1.5 text-[10px] font-mono text-muted">
                  <span className="flex items-center justify-center gap-1.5">
                    <BookOpen className="h-3 w-3" style={{ color }} />{tutor.topics.length} materias
                  </span>
                  <span className="flex items-center justify-center gap-1.5">
                    <Video className="h-3 w-3" style={{ color }} />{tutor.availabilityLabel}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Separador central */}
          <div
            className="absolute left-6 right-6 pointer-events-none"
            style={{ top: "50%", height: "1px", backgroundColor: hovered ? `${color}50` : "#2A2A2A", transition: "background-color 0.4s" }}
          />

          {/* ── ZONA INFERIOR ── */}
          <AnimatePresence initial={false} mode="popLayout">
            {!hovered ? (
              <motion.div
                key="info-bottom"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.28 }}
                className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 pt-5 px-5 text-center"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color }}>{tutor.university}</p>
                <h3 className="mt-1 font-display text-[17px] font-bold text-white leading-tight">{tutor.name}</h3>
                <p className="mt-0.5 font-mono text-[9px] text-muted uppercase tracking-wider leading-tight">{tutor.career}</p>

                <div className="mt-3 h-px w-10" style={{ backgroundColor: color }} />

                {/* Precio estilo matemático */}
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-baseline gap-1" style={{ color }}>
                    <span className="font-mono text-[10px] text-muted">f(Q) =</span>
                    <span className="font-display font-bold text-[28px] leading-none">{tutor.priceFrom}</span>
                    <span className="font-mono text-[9px] text-muted">× hora</span>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted">clase virtual</p>
                </div>

                <div className="mt-3 flex flex-col gap-1.5 text-[10px] font-mono text-muted">
                  <span className="flex items-center justify-center gap-1.5">
                    <BookOpen className="h-3 w-3" style={{ color }} />{tutor.topics.length} materias
                  </span>
                  <span className="flex items-center justify-center gap-1.5">
                    <Coins className="h-3 w-3" style={{ color }} />{tutor.availabilityLabel}
                  </span>
                </div>

                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="mt-4 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: `${color}90` }}
                >
                  <span>Ver perfil</span><span>→</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="photo-bottom"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 pt-5 px-5"
              >
                <div
                  className="h-[118px] w-[118px] overflow-hidden rounded-full"
                  style={{ border: `2px solid ${color}80`, boxShadow: `0 0 28px ${color}35` }}
                >
                  <img src={tutor.photo} alt={tutor.name} className="h-full w-full object-cover" loading="lazy" />
                </div>

                <div
                  className="mt-3 flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest font-semibold"
                  style={{ backgroundColor: color, color: "#000", borderRadius: "4px" }}
                >
                  <Video className="h-3 w-3" /> Clase virtual
                </div>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-muted">
                  toca para ver más →
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
