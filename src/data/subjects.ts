import type { Subject, Level } from "@/types";
import { Atom, Sigma, FlaskConical, Code2, CircuitBoard } from "lucide-react";

interface SubjectMeta {
  value: Subject;
  label: string;
  icon: typeof Atom;
}

// EDITAR AQUÍ para agregar/quitar materias del filtro principal
export const SUBJECTS: SubjectMeta[] = [
  { value: "fisica", label: "Física", icon: Atom },
  { value: "matematica", label: "Matemática", icon: Sigma },
  { value: "quimica", label: "Química", icon: FlaskConical },
  { value: "programacion", label: "Programación", icon: Code2 },
  { value: "electronica", label: "Electrónica", icon: CircuitBoard },
];

interface LevelMeta {
  value: Level;
  label: string;
}

// EDITAR AQUÍ para agregar/quitar niveles del filtro
export const LEVELS: LevelMeta[] = [
  { value: "secundaria", label: "Secundaria" },
  { value: "diversificado", label: "Diversificado" },
  { value: "universidad", label: "Universidad" },
];
