import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TUTORS } from "@/data/tutors";
import { TutorCard } from "@/components/TutorCard";
import { Filters } from "@/components/Filters";
import { MathHero } from "@/components/MathHero";
import { ParabolicShot } from "@/components/ParabolicShot";
import type { Subject, Level } from "@/types";

export function Home() {
  const [search, setSearch]   = useState("");
  const [subject, setSubject] = useState<Subject | null>(null);
  const [level, setLevel]     = useState<Level | null>(null);

  const filtered = useMemo(() => {
    return TUTORS.filter((tutor) => {
      const matchesSubject = subject ? tutor.subjects.includes(subject) : true;
      const matchesLevel   = level   ? tutor.levels.includes(level) : true;
      const q = search.toLowerCase();
      const matchesSearch =
        q === "" ||
        tutor.name.toLowerCase().includes(q) ||
        tutor.career.toLowerCase().includes(q) ||
        tutor.subjects.some((s) => s.includes(q)) ||
        tutor.topics.some(
          (c) => c.course.toLowerCase().includes(q) ||
                 c.topics.some((t) => t.toLowerCase().includes(q))
        );
      return matchesSubject && matchesLevel && matchesSearch;
    });
  }, [search, subject, level]);

  return (
    <main>
      {/* ── Banner matemático animado ──────────────────────────── */}
      <MathHero />

      {/* ── Hero texto + tiro parabólico ───────────────────────── */}
      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* Layout: texto izquierda | parabólico derecha */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">

            {/* Texto hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 max-w-xl"
            >
              <span className="tag-mono text-primary mb-4 block">
                // Guatemala · Tutorías peer-to-peer · 100% Virtual
              </span>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[52px]">
                Aprende con{" "}
                <span className="relative inline-block text-primary">
                  estudiantes destacados
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary origin-left block"
                  />
                </span>
              </h1>
              <p className="mt-5 text-base text-muted leading-relaxed">
                Conecta con mentores universitarios que ya recorrieron el camino.
                Física, Matemática, Química, Programación y más — todo virtual.
              </p>

              {/* Ecuación de MentorHub */}
              <div className="mt-5 inline-block border border-primary/25 bg-primary/5 px-4 py-2">
                <p className="font-mono text-sm text-primary">
                  f(Q) = <span className="text-white">precio honesto</span> + <span className="text-white">calidad</span>
                </p>
              </div>

              {/* Stats — tipografía tipo Einstein / pizarrón */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-8"
              >
                {[
                  { value: `${TUTORS.length}`, label: "Mentores activos", sup: "" },
                  { value: "UVG",              label: "Universidad",      sup: "" },
                  { value: "100",              label: "Virtual",          sup: "%" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    {/* Tipografía manuscrita / estilo Einstein */}
                    <div className="flex items-start leading-none">
                      <span
                        className="font-display italic font-bold text-white"
                        style={{
                          fontSize: "2.6rem",
                          fontStyle: "italic",
                          letterSpacing: "-0.02em",
                          textShadow: "1px 1px 0 rgba(24,201,100,0.3)",
                        }}
                      >
                        {s.value}
                      </span>
                      {s.sup && (
                        <span
                          className="font-display italic font-bold text-primary mt-1 ml-0.5"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {s.sup}
                        </span>
                      )}
                    </div>
                    <p
                      className="font-mono uppercase tracking-[0.18em] text-muted mt-0.5"
                      style={{ fontSize: "0.62rem" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Tiro parabólico animado */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-[420px] shrink-0"
            >
              <ParabolicShot />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filtros ──────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <Filters
            search={search}
            onSearchChange={setSearch}
            subject={subject}
            onSubjectChange={setSubject}
            level={level}
            onLevelChange={setLevel}
          />
        </div>
      </section>

      {/* ── Grid de cápsulas ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
            <p className="font-display text-xl text-white">Sin resultados</p>
            <p className="mt-2 tag-mono text-muted">∅ — prueba otro término o quita un filtro.</p>
          </motion.div>
        ) : (
          <motion.div layout className="flex flex-wrap justify-center gap-8">
            {filtered.map((tutor, i) => (
              <motion.div
                key={tutor.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{ width: "200px" }}
              >
                <TutorCard tutor={tutor} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
