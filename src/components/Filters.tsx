import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { SUBJECTS, LEVELS } from "@/data/subjects";
import type { Subject, Level } from "@/types";
import { cn } from "@/lib/utils";

interface FiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  subject: Subject | null;
  onSubjectChange: (v: Subject | null) => void;
  level: Level | null;
  onLevelChange: (v: Level | null) => void;
}

export function Filters({ search, onSearchChange, subject, onSubjectChange, level, onLevelChange }: FiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Fila principal: búsqueda + filtros */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Input búsqueda — estilo terminal */}
        <div className="relative flex items-center border border-border bg-black">
          <span className="pl-3 font-mono text-[11px] text-primary select-none">$</span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="buscar tema..."
            className="w-48 bg-transparent py-2 pl-2 pr-3 font-mono text-[11px] text-foreground placeholder:text-muted/40 focus:outline-none focus:w-64 transition-all duration-300"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="pr-2 font-mono text-[11px] text-muted hover:text-white"
            >✕</button>
          )}
        </div>

        {/* Separador */}
        <span className="hidden h-4 w-px bg-border sm:block" />

        {/* Materia */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted/60 mr-1">
            Materia:
          </span>
          <TerminalChip active={subject === null} onClick={() => onSubjectChange(null)}>
            Todas
          </TerminalChip>
          {SUBJECTS.map((s) => (
            <TerminalChip
              key={s.value}
              active={subject === s.value}
              icon={<s.icon className="h-3 w-3" />}
              onClick={() => onSubjectChange(subject === s.value ? null : s.value)}
            >
              {s.label}
            </TerminalChip>
          ))}
        </div>

        {/* Separador */}
        <span className="hidden h-4 w-px bg-border sm:block" />

        {/* Nivel */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted/60 mr-1">
            Nivel:
          </span>
          <TerminalChip active={level === null} onClick={() => onLevelChange(null)}>
            Todos
          </TerminalChip>
          {LEVELS.map((l) => (
            <TerminalChip
              key={l.value}
              active={level === l.value}
              onClick={() => onLevelChange(level === l.value ? null : l.value)}
            >
              {l.label}
            </TerminalChip>
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalChip({ active, icon, onClick, children }: {
  active: boolean;
  icon?: ReactNode;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Tipografía monospace estilo terminal
        "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-150",
        active
          ? "border-primary bg-primary/10 text-primary shadow-[0_0_8px_rgba(24,201,100,0.3)]"
          : "border-border bg-transparent text-muted hover:border-muted hover:text-white"
      )}
    >
      {icon}
      {children}
    </button>
  );
}
