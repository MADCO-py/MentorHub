import { motion } from "framer-motion";
import { Clock, Coins, BookOpen, Heart, MessageCircle, Atom, Sigma, FlaskConical, Code2, CircuitBoard, Cpu } from "lucide-react";
import { MENTOR_APPLICATIONS_WHATSAPP } from "@/data/tutors";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BENEFITS = [
  { icon: Clock,    text: "Horarios flexibles — tú decides cuándo enseñas" },
  { icon: Coins,    text: "Genera ingresos extra mientras estudias" },
  { icon: BookOpen, text: "Refuerza tu conocimiento enseñando a otros" },
  { icon: Heart,    text: "Ayuda a otros estudiantes a superar sus materias" },
];

const AREAS = [
  { icon: Sigma,        label: "Matemática" },
  { icon: Atom,         label: "Física" },
  { icon: FlaskConical, label: "Química" },
  { icon: Code2,        label: "Programación" },
  { icon: CircuitBoard, label: "Electrónica" },
  { icon: Cpu,          label: "Ingeniería" },
];

export function BecomeMentor() {
  const link = `https://wa.me/${MENTOR_APPLICATIONS_WHATSAPP}?text=${encodeURIComponent("Hola, me interesa ser mentor en MentorHub.\n¿Me podrían dar más información?")}`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="tag-mono text-primary mb-5 block">// Para estudiantes universitarios</span>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl max-w-2xl">
          ¿Quieres enseñar y{" "}
          <span className="text-primary">generar ingresos?</span>
        </h1>
        <p className="mt-5 max-w-xl text-muted leading-relaxed">
          Si eres estudiante universitario y te apasiona ayudar a otros, nos encantaría conocerte.
        </p>
        <div className="mt-6 h-[2px] w-12 bg-primary" />
      </motion.div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-4 w-[2px] bg-primary" />
            <h2 className="font-display text-xl font-bold">Buscamos mentores en</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {AREAS.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="group flex items-center gap-3 border border-border bg-surface p-4 hover:border-primary hover:bg-surface-light transition-all cursor-default"
              >
                <a.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-white">{a.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-4 w-[2px] bg-primary" />
            <h2 className="font-display text-xl font-bold">Beneficios</h2>
          </div>
          <ul className="space-y-3">
            {BENEFITS.map((b, i) => (
              <motion.li
                key={b.text}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="flex items-start gap-4 border border-border bg-surface p-4 hover:border-primary/40 hover:bg-surface-light transition-all"
              >
                <b.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted">{b.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-14 border border-primary/30 bg-primary/5 p-8"
      >
        <div className="h-[2px] w-8 bg-primary mb-5" />
        <h2 className="font-display text-2xl font-bold text-white mb-2">¿Listo para empezar?</h2>
        <p className="text-muted text-sm mb-6 max-w-md">El proceso es simple, flexible y tú decides tus horarios.</p>
        <a href={link} target="_blank" rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }))}
        >
          <MessageCircle className="h-5 w-5" />
          Aplicar como mentor
        </a>
      </motion.div>
    </main>
  );
}
