import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Award, CalendarClock,
  Coins, ChevronLeft, MessageCircle,
  Atom, Code2, FlaskConical, Sigma, CircuitBoard,
} from "lucide-react";
import { getTutorBySlug } from "@/data/tutors";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Subject } from "@/types";

const CAREER_ICON: Record<Subject, typeof Atom> = {
  fisica:       Atom,
  matematica:   Sigma,
  quimica:      FlaskConical,
  programacion: Code2,
  electronica:  CircuitBoard,
};
const CAREER_COLOR: Record<Subject, string> = {
  fisica:       "text-cyan-400",
  matematica:   "text-amber-400",
  quimica:      "text-purple-400",
  programacion: "text-green-400",
  electronica:  "text-rose-400",
};

function buildWaLink(whatsapp: string, name: string, course: string) {
  const text = encodeURIComponent(
    `Hola ${name.split(" ")[0]}.\n\nMe interesa una tutoría de ${course}.\n¿Tienes disponibilidad?`
  );
  return `https://wa.me/${whatsapp}?text=${text}`;
}

export function TutorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const tutor = getTutorBySlug(slug ?? "");

  if (!tutor) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <p className="text-muted font-mono text-sm">Mentor no encontrado.</p>
        <Link to="/" className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
          Volver al inicio
        </Link>
      </main>
    );
  }

  const mainSubject = tutor.subjects[0];
  const CareerIcon  = CAREER_ICON[mainSubject] ?? BookOpen;
  const iconColor   = CAREER_COLOR[mainSubject] ?? "text-primary";
  const waLink      = buildWaLink(tutor.whatsapp, tutor.name, tutor.topics[0]?.course ?? "tutoría");

  return (
    <main className="pb-16">
      {/* ── BANNER estilo X/Twitter ──────────────────────────────── */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-light sm:h-56">
        {tutor.banner ? (
          <img
            src={tutor.banner}
            alt="Banner de perfil"
            className="h-full w-full object-cover"
          />
        ) : (
          /* Banner generativo: ícono de carrera + gradiente */
          <div className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden">
            {/* Gradiente verde sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
                backgroundSize: "40px 40px"
              }}
            />
            {/* Ícono enorme centrado */}
            <CareerIcon
              className={cn("h-40 w-40 opacity-10", iconColor)}
              strokeWidth={0.5}
            />
            {/* Línea verde inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
          </div>
        )}
      </div>

      {/* ── HEADER del perfil (debajo del banner) ───────────────── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Foto — sobresale del banner */}
        <div className="relative -mt-14 mb-4 flex items-end justify-between">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-surface-light shadow-glow-white">
            <img
              src={tutor.photo}
              alt={`Foto de ${tutor.name}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* CTA móvil (visible arriba) */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "whatsapp", size: "sm" }), "sm:hidden")}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {/* Nombre + info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge variant="primary" className="mb-2">
                <Award className="h-3 w-3" />
                {tutor.badge}
              </Badge>
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {tutor.name}
              </h1>
              <p className={cn("mt-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest", iconColor)}>
                <CareerIcon className="h-3.5 w-3.5" />
                {tutor.career} · {tutor.university}
              </p>
            </div>

            {/* Precio matemático — recuadro ajustado */}
            <div className="border border-primary/30 bg-surface px-5 py-4 text-center" style={{ minWidth: "185px" }}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mb-2">precio / sesión</p>
              <div className="flex items-baseline justify-center gap-1.5 flex-nowrap">
                <span className="font-mono text-[11px] text-muted whitespace-nowrap">f(Q) =</span>
                <span className="font-display font-bold text-primary whitespace-nowrap" style={{ fontSize: "2rem", lineHeight: 1 }}>
                  {tutor.priceFrom}
                </span>
                <span className="font-mono text-[10px] text-muted whitespace-nowrap">× hora</span>
              </div>
              <div className="mt-2 h-px w-full bg-primary/20" />
              <p className="tag-mono text-muted mt-1.5">{tutor.availabilityLabel}</p>
            </div>
          </div>

          {/* Métricas en fila */}
          <div className="mt-4 flex flex-wrap gap-5 border-t border-border pt-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              {tutor.topics.length} materias
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock className="h-3.5 w-3.5 text-primary" />
              Mentor desde {tutor.since}
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              {tutor.university}
            </span>
            <span className="flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5 text-primary" />
              Desde Q{tutor.priceFrom}/h
            </span>
          </div>

          {/* Tags de materia */}
          <div className="mt-3 flex flex-wrap gap-2">
            {tutor.subjects.map((s) => (
              <span key={s} className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Breadcrumb */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-white transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Todos los mentores
        </Link>

        {/* ── CUERPO ───────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">

            {/* Bio */}
            <section className="border border-border bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-4 w-[2px] bg-primary" />
                <h2 className="font-display text-xl font-bold">Sobre mí</h2>
              </div>
              <p className="text-sm text-muted leading-relaxed">{tutor.bio}</p>
            </section>

            {/* Materias y temas */}
            <section className="border border-border bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-4 w-[2px] bg-primary" />
                <h2 className="font-display text-xl font-bold">Materias y temas</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {tutor.topics.map((c) => (
                  <div key={c.course} className="border border-border bg-surface-light p-4">
                    <h3 className="font-display font-bold text-sm text-white mb-3">{c.course}</h3>
                    <ul className="space-y-2">
                      {c.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 font-mono text-[11px] text-muted">
                          <span className="h-px w-4 bg-primary shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Disponibilidad */}
            <section className="border border-border bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-4 w-[2px] bg-primary" />
                <h2 className="font-display text-xl font-bold">Disponibilidad</h2>
              </div>
              <AvailabilityCalendar schedule={tutor.schedule} />
            </section>
          </div>

          {/* CTA sticky (desktop) */}
          <div className="hidden sm:block">
            <div className="sticky top-20 border border-border bg-surface p-6">
              <div className="h-[2px] w-8 bg-primary mb-5" />
              <p className="tag-mono text-muted mb-2">Reservar tutoría</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-mono text-xs text-muted">f(Q) =</span>
                <span className="font-display font-bold text-primary" style={{ fontSize: "2.2rem", lineHeight: 1 }}>{tutor.priceFrom}</span>
                <span className="font-mono text-[10px] text-muted">× hora</span>
              </div>
              <p className="tag-mono text-muted mb-6">{tutor.availabilityLabel}</p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full")}
              >
                <MessageCircle className="h-5 w-5" />
                Reservar por WhatsApp
              </a>

              <p className="mt-3 text-center tag-mono text-muted">
                Mensaje prellenado · Sin registro
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
